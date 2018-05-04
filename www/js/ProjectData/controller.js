/**
 * Created by ws on 2017/8/23.
 */
angular.module('starter.controllers')

  .controller('projectDataCtrl', function($scope,$state,CacheFactory,$ionicHistory) {
    $scope.goNext = function (id) {
      switch (id) {
        case 1:
          $state.go('tab.architecture');
              break;
        case 2:
          $state.go('tab.wuguan');
          break;
      }
    }
  })


  .controller('architectureCtrl', function($scope,$state,$timeout,projDataServ) {

    //楼龄参数值'BulidAge'
    //建筑类型参数值'BulidType'


    $scope.isShowBuilderList = false;

    $scope.architecture = {
      ProjectCode : 7, //项目id
      Address: '',         //位置
      Acreage: null,       //建筑面积
      BulidAge:null,       //楼龄
      BulidCount:null,     //楼栋数
      CompanyName:'',       //开发商名称
      BulidType:'',         //建筑类型
      HouseCount:null       //户数
    };

    $scope.LayoutImage = null;

    projDataServ.getProjectBulidInfo($scope.architecture.ProjectCode).then(function (data) {
      console.log(data.data);
      $scope.architecture.Address = data.data.Address;
      $scope.architecture.Acreage = data.data.Acreage;
      $scope.architecture.BulidAge = data.data.BulidAge;
      $scope.architecture.BulidCount = data.data.BulidCount;
      $scope.architecture.CompanyName = data.data.CompanyName;
      $scope.architecture.BulidType = data.data.BulidType;
      $scope.architecture.HouseCount = data.data.HouseCount;
    });


    $scope.BuliderList = [];

    //请求所有开发商数据并存在服务中以便后面的模糊查询
    projDataServ.getAllBulider().then(function (data) {
      $scope.BuliderList = data.data;
      console.log($scope.BuliderList );
    });


    $scope.buildingAge = {
      list: [],
      title: "请选择楼龄"
    };
    //获取楼龄列表
    projDataServ.getDimensionByCode('BulidAge').then(function (data) {
      console.log(data.data);
      $scope.buildingAge.list = data.data;
      $scope.buildingAge.value = $scope.architecture.BulidAge;
    });



    $scope.buildType = {
      list: [],
      title: "请选择建筑类型"
    };
    //获取建筑类型列表
    projDataServ.getDimensionByCode('BulidType').then(function (data) {
      console.log(data.data);
      $scope.buildType.list = data.data;
      $scope.buildType.value = $scope.architecture.BulidType;

    });


    $scope.getBuilderList = function () {
      $scope.isShowBuilderList = true;
    };

    $scope.getBuilder = function (data) {
      console.log(data);
      $scope.architecture.CompanyName = data.CompanyName;
      $scope.isShowBuilderList = false;
    };

    $scope.closeBuilderList = function () {
      $scope.isShowBuilderList = false;
    };



    $scope.submitArchitectureData = function () {
      $scope.architecture.BulidAge = $scope.buildingAge.value;
      $scope.architecture.BulidType = $scope.buildType.value;

      console.log($scope.architecture);
      console.log($scope.LayoutImage);

      projDataServ.saveProjectBulidInfo($scope.architecture,$scope.LayoutImage).then(function (data) {
        console.log(data);
      })

    };



    $scope.chooseFile = function() {
       $timeout(function () {
         document.getElementById('uploadImg').click();
       });
    };


    /*---------------------------------------------------------------*/
    $scope.reader = new FileReader();   //创建一个FileReader接口

    //提交图片的函数
    $scope.img_upload = function(files) {
      $scope.thumb = {};      //用于存放图片的base64
      $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
      $scope.reader.onload = function(ev) {
        $scope.$apply(function(){
          $scope.thumb.imgSrc = ev.target.result;
        });
      };

      //todo:上传图片到服务端
      $scope.LayoutImage = files[0];
      // var data = new FormData();      //以下为像后台提交图片数据
      // data.append('image', files[0]);
      // data.append('guid',$scope.guid);
      // $http({
      //   method: 'post',
      //   url: '/comm/test-upload.php?action=success',
      //   data:data,
      //   headers: {'Content-Type': undefined},
      //   transformRequest: angular.identity
      // }).success(function(data) {
      //   if (data.result_code == 'SUCCESS') {
      //     $scope.form.image[data.guid] = data.result_value;
      //     $scope.thumb[data.guid].status = 'SUCCESS';
      //     console.log($scope.form)
      //   }
      //   if(data.result_code == 'FAIL'){
      //     console.log(data)
      //   }
      // })
    };




  })


  .controller('wuguanCtrl',function ($scope,projDataServ) {

    $scope.isShowCompanyList = false;

    $scope.CompanyList = [];

    $scope.wuguan = {
      ProjectCode:7,
      CompanyName : '',
      PowerFee:'',
      PropertyFee:'',
      WaterFee:''
    };

    projDataServ.getPropertyManaInfo($scope.wuguan.ProjectCode).then(function (data) {
      console.log(data.data);
      $scope.wuguan.ProjectCode = data.data.ProjectCode;
      $scope.wuguan.CompanyName = data.data.CompanyName;
      $scope.wuguan.PowerFee = data.data.PowerFee;
      $scope.wuguan.PropertyFee = data.data.PropertyFee;
      $scope.wuguan.WaterFee = data.data.WaterFee;
    });


    projDataServ.getPropertyMana().then(function (data) {
      console.log(data.data);
      $scope.CompanyList = data.data;
    });

    $scope.getWuguanCompanyList = function () {
      $scope.isShowCompanyList = true;
    };

    $scope.getCompany = function (data) {
      console.log(data);
      $scope.wuguan.CompanyName = data.CompanyName;
    };

    $scope.closeCompanyList = function () {
      $scope.isShowCompanyList = false;
    };

    $scope.submitData = function () {
      console.log($scope.wuguan);
      projDataServ.savePropertyManaInfo($scope.wuguan).then(function (data) {
        console.log(data);
      })
    }
  })
;

