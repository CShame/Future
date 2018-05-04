/**
 * Created by ws on 2017/3/30.
 */
angular.module('starter.controllers')

  .controller('myProjectCtrl', function($scope,$state,CacheFactory,declareServ,$ionicHistory) {

    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    $scope.isSetPassword = CacheFactory.get('IsSetPwd');

    var UserID = CacheFactory.get('UserID');
    declareServ.getProjects(UserID).then(function (data) {
      console.log(data);
      $scope.dataList = data;
    });


    var height = document.getElementById('addDiv').clientWidth +2+ 'px';
    $scope.grid_height = {height:height};


    $scope.addProject = function () {
      console.log('add project');
      $state.go('addProject');
    };

    $scope.setProject = function (data) {
      console.log('set project');
      $state.go('systemList',{'ProjectCode' : data.ProjectCode});
    };

    $scope.setPassword = function () {
      console.log('set password');
      $state.go('setPassword');
    };

    $scope.operateProject = function(){

    }


  })

  .controller('setPasswordCtrl',function ($scope,CacheFactory,$state,myNote,$ionicHistory,declareServ) {

    var userID = CacheFactory.get('UserID');


    $scope.user ={
      phone: CacheFactory.get('phone'),
      password : '',
      checkPassword :''
    };

    $scope.finishPasswordSet = function () {
      if(!$scope.user.password){
        myNote.myNotice('密码不能为空');
      }else if($scope.user.password != $scope.user.checkPassword){
        myNote.myNotice('密码输入不一致，请重新输入');
        $scope.user.password = '';
        $scope.user.checkPassword = '';
      }else{
        declareServ.updatePassword(userID,$scope.user.password).then(function (data) {
          if(!!data) {
            CacheFactory.save('IsSetPwd', true);
            $ionicHistory.goBack(-1);
          }else{
            myNote.myNotice('密码设置失败，请重新设置');
          }
        });
      }
    };

  })



  .controller('addProjectCtrl',function ($scope,CacheFactory,$state,myNote,$ionicHistory,declareServ) {


    declareServ.getPlatforms().then(function (data) {
      console.log(data);
      $scope.dataList = data;

      $scope.project = {
        ProjectName : '',
        Address :'南山区嘉达研发大楼',
        PlatformCode : $scope.dataList[0].PlatformCode
      };
    });


    $scope.finishAdd = function () {
      //数据库成功过添加后返回到我的项目界面
      declareServ.addOrUpdateProject($scope.project,CacheFactory.get('UserID')).then(function (data) {
        console.log(data);
        if(!!data.Flag) {
          $ionicHistory.goBack(-1);
        }
      });
    }

  })



  .controller('systemListCtrl',function ($scope,CacheFactory,$state,myNote,$ionicHistory,$stateParams,declareServ){

    var PCode = $stateParams.ProjectCode;


    declareServ.getSystemRoomInfos(PCode).then(function (data) {
      console.log(data);
      $scope.dataList = data;

      var height = document.getElementById('page').clientWidth/4 + 'px';
      $scope.grid_style = {height:height};

      for(var k = 0;k< $scope.dataList.length;k++) {
        if ($scope.dataList[k].ListInfos.length > 0) {
          var len = $scope.dataList[k].ListInfos.length % 4;
          if (len == 0) {
            len = 4;
          }
          var index = $scope.dataList[k].ListInfos.length - 1;
          for (var i = 0; i < len; i++) {
            $scope.dataList[k].ListInfos[index].IsSpecialContent = true;
            index--;
          }
        }
      }

    });



    $scope.addRoom = function (data) {

      console.log('go添加房间界面');
      $state.go('addRoom',{'RoomName' : data.RoomName,'SystemCode' :data.SystemCode,'projectCode' : PCode,'SystemName':data.SystemName});

    };

    $scope.addDevice = function (room) {
      console.log('go设备类型列表界面');
      $state.go('deviceList',{'RoomID':room.RoomID,'ProjectCode':PCode,'RoomName':room.RoomName});
    };

  })


  .controller('deviceListCtrl',function ($scope,CacheFactory,$state,myNote,declareServ,$stateParams){

    var PCode = $stateParams.ProjectCode;
    var roomID = $stateParams.RoomID;
    var roomName = $stateParams.RoomName;

    declareServ.getDeviceTypeDeviceInfos(PCode,roomID).then(function (data) {
      console.log(data);
      $scope.dataList = data;

      var height = document.getElementById('page').clientWidth/4 + 'px';
      $scope.grid_style = {height:height};

      for(var k = 0;k< $scope.dataList.length;k++) {
        if ($scope.dataList[k].ListInfos.length > 0) {
          var len = $scope.dataList[k].ListInfos.length % 4;
          if (len == 0) {
            len = 4;
          }
          var index = $scope.dataList[k].ListInfos.length - 1;
          for (var i = 0; i < len; i++) {
            $scope.dataList[k].ListInfos[index].IsSpecialContent = true;
            index--;
          }
        }
      }
    });


    //增加设备
    $scope.addRoom = function (data) {
      console.log(data);
      $state.go('addDevice',{'projectCode': PCode,'DeviceType':data.DeviceType,'TypeName':data.TypeName,'RoomID':roomID});
    };

    $scope.addDevice = function () {
      console.log('此处是尽头');
    }

  })


  .controller('addRoomCtrl',function ($scope,$ionicHistory,myNote,$stateParams,declareServ){

    var PCode =  $stateParams.projectCode;
    var sysCode = $stateParams.SystemCode;
    var symbolName = $stateParams.RoomName;
    var systemName = $stateParams.SystemName;

    declareServ.getRooms(PCode,sysCode).then(function (data) {
      console.log(data);
      $scope.dataList = data;
    });


    $scope.deleteItem =function (index) {
      $scope.dataList.splice(index,1);
    };

    $scope.addItem = function () {
      $scope.dataList = addItem($scope.dataList);
      console.log($scope.dataList);
    };

    $scope.finishAdd = function () {
      var valid = true;
      for(var i = 0;i<$scope.dataList.length;i++){
        if($scope.dataList[i].RoomName == '')
          valid = false;
      }
      if(valid) {
        declareServ.addOrUpdateRooms(PCode, $scope.dataList, sysCode).then(function (data) {
          console.log(data);
          if (!!data) {
            $ionicHistory.goBack(-1);
          } else {
            myNote.myNotice('添加房间失败', 2000);
          }
        });
      }else{
        myNote.myNotice('房间名不能为空');
      }
    };

    //增加行
    function addItem(arr) {
      var newItem = {
        RoomID : 0,
        RoomName : '1#' + (symbolName || '房'),
        SystemCode : sysCode
      };

      if(arr.length != 0) {
        var a = arr[arr.length - 1].RoomName.split('#');
        if (a.length == 2) {
          newItem.RoomName = parseInt(a[0]) + 1 + "#" + trim(a[1]);
          arr.push(newItem);
        }else if(a.length == 1){
          newItem.RoomName = 1 + "#" + trim(a[0]);
          arr.push(newItem);
        } else {
          myNote.myNotice('请输入正确的格式，房号#房间类型', 3000);
        }
      }else{
        arr.push(newItem);
      }

      return arr;
    }

    //删除左右两端的空格
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }

  })


  .controller('addDeviceCtrl',function ($scope,$state,myNote,declareServ,$stateParams,$ionicHistory){

    var PCode = $stateParams.projectCode;
    var deviceType = $stateParams.DeviceType;
    var typeName = $stateParams.TypeName;
    var roomID = $stateParams.RoomID;

    declareServ.getDevices(PCode,deviceType,roomID).then(function (data) {
      console.log(data);
      $scope.dataList = data;
    });

    $scope.deleteItem =function (index) {
      $scope.dataList.splice(index,1);
    };


    $scope.addItem = function () {
      $scope.dataList = addItem($scope.dataList);
      console.log($scope.dataList);
    };

    $scope.finishAdd = function () {
      declareServ.addOrUpdateDevices(PCode,$scope.dataList,roomID,deviceType).then(function (data) {
        console.log(data);
        if(!!data){
          $ionicHistory.goBack(-1);
        }else{
          myNote.myNotice('添加设备失败',2000);
        }
      });

    };

    function addItem(arr) {
      var newItem = {
        DeviceID  : 0,
        DeviceName  : '1#' + (typeName || '设备'),
        DeviceType  : deviceType,
        RoomID : roomID,
        IsDisplay : 'true',
        IsImportant : 'false',
        Sort : 0
      };

      if(arr.length != 0) {
        var a = arr[arr.length - 1].DeviceName.split('#');
        if (a.length == 2) {
          newItem.DeviceName = parseInt(a[0]) + 1 + "#" + trim(a[1]);
          arr.push(newItem);
        }else if(a.length == 1){
          newItem.DeviceName = 1 + "#" + trim(a[0]);
          arr.push(newItem);
        } else {
          myNote.myNotice('请输入正确的格式，设备号#设备类型', 3000);
        }
      }else{
        arr.push(newItem);
      }

      return arr;
    }

    //删除左右两端的空格
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }

  })

;
