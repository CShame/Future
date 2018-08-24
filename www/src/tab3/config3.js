/**
 * Created by ws on 2018/8/22.
 */
angular.module('starter.config3', [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });
  }])
;
