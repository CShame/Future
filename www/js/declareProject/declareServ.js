/**
 * Created by ws on 2017/4/1.
 */
angular.module('starter.services')
  .service('declareServ',function (HttpFactory,$q,baseUrl) {

    //是否已经注册
    function isRegister(OpenId) {
      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.IsRegistered',
        method:'post',
        data:{
          OpenId:OpenId
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });
      return def.promise;
    }

    //发验证码
    function sendValidate( Phone) {

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.ValidatePhone',
        method:'post',
        data:{
          Phone: Phone
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //未注册注册
    function register(OpenId,Phone,code) {
      var def = $q.defer();

      HttpFactory.send({
        url: baseUrl + 'WeChatProjectApplyBLL.Registered',
        method : 'post',
        data : {
          OpenId : OpenId,
          Phone : Phone,
          ValidCode : code
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });
      return def.promise;
    }

    //获取项目
    function getProjects(UserID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetProjects',
        method: 'post',
        data : {
          UserID:UserID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //设置密码
    function updatePassword(UserID,Password) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.UpdatePassword',
        method: 'post',
        data : {
          UserID:UserID,
          Password : Password
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });

      return def.promise;
    }

    //获取项目类型--平台
    function getPlatforms() {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetPlatforms',
        method: 'post',
        data : {}
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //新增或修改项目信息
    function addOrUpdateProject(project,UserID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.AddOrUpdateProject',
        method: 'post',
        data : {
          project :  angular.toJson(project),
          UserID : UserID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //获取项目系统和房间信息
    function getSystemRoomInfos(projectCode) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetSystemRoomInfos',
        method: 'post',
        data : {
          projectCode : projectCode
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }


    //获取房间信息
    function getRooms(projectCode,SystemCode) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetRooms',
        method: 'post',
        data : {
          projectCode : projectCode,
          SystemCode : SystemCode
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //保存房间信息
    function addOrUpdateRooms(projectCode,rooms,sysCode) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.AddOrUpdateRooms',
        method: 'post',
        data : {
          projectCode : projectCode,
          rooms : angular.toJson(rooms),
          SystemCode:sysCode
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });

      return def.promise;
    }

    //获取设备类型及其设备信息
    function getDeviceTypeDeviceInfos(projectCode,RoomID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetDeviceTypeDeviceInfos',
        method: 'post',
        data : {
          projectCode : projectCode,
          RoomID : RoomID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //获取设备类型下设备信息
    function getDevices(projectCode,DeviceType,roomID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetDevices',
        method: 'post',
        data : {
          projectCode : projectCode,
          DeviceType : DeviceType,
          RoomID : roomID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }


    //保存设备信息
    function addOrUpdateDevices(projectCode,devices,roomID,deviceType) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.AddOrUpdateDevices',
        method: 'post',
        data : {
          projectCode : projectCode,
          devices : angular.toJson(devices),
          RoomID : roomID,
          DeviceType : deviceType
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });

      return def.promise;
    }

    return{
      isRegister : isRegister,
      register : register,
      getProjects : getProjects,
      updatePassword : updatePassword,
      getPlatforms : getPlatforms,
      addOrUpdateProject : addOrUpdateProject,
      getSystemRoomInfos : getSystemRoomInfos,
      getRooms : getRooms,
      addOrUpdateRooms : addOrUpdateRooms,
      getDeviceTypeDeviceInfos :getDeviceTypeDeviceInfos,
      getDevices : getDevices,
      addOrUpdateDevices : addOrUpdateDevices,
      sendValidate : sendValidate
    }

  });
