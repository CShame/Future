/**
 * Created by ws on 2018/8/22.
 */
angular.module('starter.config0', [])
  .config(["$stateProvider", function ($stateProvider,$urlRouterProvider) {
    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  }])
;
