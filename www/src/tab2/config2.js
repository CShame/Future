/**
 * Created by ws on 2018/8/22.
 */
angular.module('starter.config2', [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
  }])
;
