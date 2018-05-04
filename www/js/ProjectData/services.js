/**
 * Created by ws on 2017/8/24.
 */
angular.module('starter.services')
  .factory('projDataServ',function (HttpFactory,$q,baseUrl) {

    //获取项目初始化信息
    function getProjectBulidInfo(pcode){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetProjectBulidInfo',
        method:'post',
        data:{
          ProjectCode:pcode
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取开发商下拉列表
    function getAllBulider(){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetDeveloper',
        method:'post'
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取建筑类型下拉列表
    function getDimensionByCode(Code){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetDimensionByCode',
        method:'post',
        data:{
          Code:Code
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取物管公司下拉列表
    function getPropertyMana(){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetPropertyMana',
        method:'post'
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //保存项目建筑信息
    function saveProjectBulidInfo(model,LayoutImage){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.SaveProjectBulidInfo',
        method:'post',
        data:{
          model:angular.toJson(model),
          LayoutImage:angular.toJson(LayoutImage)
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取物管信息
    function getPropertyManaInfo(ProjectCode){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetPropertyManaInfo',
        method:'post',
        data:{
          ProjectCode:ProjectCode
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //保存物管信息
    function savePropertyManaInfo(model){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.SavePropertyManaInfo',
        method:'post',
        data:{
          model:angular.toJson(model)
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }



    return {
      getAllBulider:getAllBulider,
      getProjectBulidInfo:getProjectBulidInfo,
      getDimensionByCode:getDimensionByCode,
      getPropertyMana:getPropertyMana,
      saveProjectBulidInfo:saveProjectBulidInfo,
      getPropertyManaInfo:getPropertyManaInfo,
      savePropertyManaInfo:savePropertyManaInfo
    }


  });
