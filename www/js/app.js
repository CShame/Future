// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.config','starter.directives','ngCordova','ngCordovaBluetoothLE','whcyit-immerse'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(true);
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  //android默认tab样式在顶部，设置为底部
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  //设置navbar上标题的位置
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  //设置后退文本为空
  $ionicConfigProvider.backButton.text('');
  //根据平台设置返回icon
  $ionicConfigProvider.platform.ios.backButton.icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.icon('ion-ios-arrow-left');
  //是否启用将上一页面的标题作为本页面返回按钮标题
  $ionicConfigProvider.backButton.previousTitleText(false);
  //关闭android端过渡动画效果
  $ionicConfigProvider.platform.android.views.transition('none');

  $stateProvider

  // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })
  //
  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

angular.module('starter.controllers', []);
angular.module('starter.directives', []);
angular.module('starter.config', [ 'starter.config1','starter.config2','starter.config3']);
