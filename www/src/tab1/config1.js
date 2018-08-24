/**
 * Created by ws on 2018/8/22.
 */
angular.module('starter.config1', [])
  .config(["$stateProvider", function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.geoLocation', {
        url: '/geoLocation',
        views: {
          'tab-dash': {
            templateUrl: 'src/tab1/geolocation/page.html',
            controller: 'geoLocationCtrl'
          }
        }
      })

      .state('tab.baseSelect', {
        url: '/baseSelect',
        views: {
          'tab-dash': {
            templateUrl: 'src/tab1/baseSelect/page.html',
            controller: 'baseSelectCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/tab/dash');
  }])
;
