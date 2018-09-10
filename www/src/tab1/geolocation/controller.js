/**
 * Created by Administrator on 2018/8/8.
 */
/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('geoLocationCtrl', function ($scope,$interval) {

    $scope.position = {};

    $scope.getPosition111 = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          $scope.position = position.coords;
          console.log($scope.position);
        }, function showError(error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              $scope.errrorHtml = "User denied the request for Geolocation."
              break;
            case error.POSITION_UNAVAILABLE:
              $scope.errrorHtml = "Location information is unavailable."
              break;
            case error.TIMEOUT:
              $scope.errrorHtml = "The request to get user location timed out."
              break;
            case error.UNKNOWN_ERROR:
              $scope.errrorHtml = "An unknown error occurred."
              break;
          }
        });
      }

    } ;


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
    }


    $scope.getPosition = function () {
      $scope.getLatAndLon(function (data) {
        $scope.position = data;
      })
    }

  });
