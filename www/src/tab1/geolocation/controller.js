/**
 * Created by Administrator on 2018/8/8.
 */
/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('geoLocationCtrl', function ($scope,$interval) {

    $scope.position = {
      latitude:'...',
      longitude:'...'
    };

    //获取经纬度
    $scope.getLatAndLon = function(callback) {
      var point = {longitude:null,latitude:null};
      if (ionic.Platform.isAndroid() && window.cordova) {
        baidumap_location.getCurrentPosition(function (data) {
          console.log("getLatAndLon android success,定位成功",data);
          point.longitude  = data.longitude;
          point.latitude  = data.latitude;
          callback(point);
        }, function (err) {
          // 没有权限进入error code -1
          console.log("getLatAndLon error,手机定位功能未开启(Android)");
        });
      }else{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log("(IOS)Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
            point.longitude  = position.coords.longitude;
            point.latitude  = position.coords.latitude;
            callback(point);
          })
        }
      }
    };


    $scope.getPosition = function () {
      $scope.position = {
        latitude:'loading',
        longitude:'loading'
      };
      $scope.getLatAndLon(function (data) {
        $scope.position = data;
      })
    };

  });
