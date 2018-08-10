/**
 * Created by Administrator on 2018/8/8.
 */
/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('geoLocationCtrl', function ($scope,$interval) {

    $interval(function () {
      $scope.getPosition
    },5000);
    $scope.position = {};
    $scope.getPosition = function () {
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

  });
