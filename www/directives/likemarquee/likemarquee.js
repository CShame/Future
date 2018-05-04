/**
 * Created by ws on 2017/12/22.
 */
angular.module('starter.controllers')
.directive('like-marquee', ['$timeout', '$ionicScrollDelegate', 'linkageSelectService', '$ionicModal',
  function ($timeout, $ionicScrollDelegate, linkageSelectService, $ionicModal) {

  return {
    restrict: 'E',
    templateUrl: 'directives/likemarquee/page.html',
    scope: {
      options: "=",

    },
    link: function (scope,element) {

    }
  }
}]);
