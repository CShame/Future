// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordovaBluetoothLE','whcyit-immerse'])

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

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

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
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


    .state('register', {
      url: '/declareProject/register',
      templateUrl: 'templates/declareProject/register.html',
      controller: 'registerCtrl'
    })

  .state('verification', {
    url: '/declareProject/verification',
    params: {
      'phone' : null,
      'openId' : null
    },
    templateUrl: 'templates/declareProject/verification.html',
    controller: 'verificationCtrl'
  })

    .state('myProject', {
      url: '/declareProject/myProject',
      cache:false,
      templateUrl: 'templates/declareProject/myProject.html',
      controller: 'myProjectCtrl'
    })

    .state('setPassword', {
      url: '/declareProject/setPassword',
      templateUrl: 'templates/declareProject/setPassword.html',
      controller: 'setPasswordCtrl'
  })

    .state('addProject', {
      url: '/declareProject/addProject',
      templateUrl: 'templates/declareProject/addProject.html',
      controller: 'addProjectCtrl'
    })

    .state('systemList', {
      url: '/declareProject/systemList',
      cache:false,
      params :{
        'ProjectCode' : null
      },
      templateUrl: 'templates/declareProject/list.html',
      controller: 'systemListCtrl'
    })


    .state('deviceList', {
      url: '/declareProject/deviceList',
      cache:false,
      params:{
        'RoomID' : null,
        'ProjectCode' :null,
        'RoomName' : null
      },
      templateUrl: 'templates/declareProject/list.html',
      controller: 'deviceListCtrl'
    })

    .state('addRoom', {
      url: '/declareProject/addRoom',
      params:{
        'RoomName' : null,
        'SystemCode' : null,
        'projectCode' : null,
        'SystemName' : null
      },
      templateUrl: 'templates/declareProject/add.html',
      controller: 'addRoomCtrl'
    })

    .state('addDevice', {
      url: '/declareProject/addDevice',
      params :{
        'projectCode' : null,
        'DeviceType' : null,
        'TypeName' : null,
        'RoomID' : null
      },
      templateUrl: 'templates/declareProject/add.html',
      controller: 'addDeviceCtrl'
    })

    .state('tab.projectData', {
      url: '/declareProject/projectData',
      // templateUrl: 'templates/ProjectData/index.html',
      // controller: 'projectDataCtrl'
      views: {
        'tab-dash': {
          templateUrl: 'templates/ProjectData/index.html',
          controller: 'projectDataCtrl'
        }
      }
    })

    .state('tab.architecture', {
      url: '/declareProject/architecture',
      // templateUrl: 'templates/ProjectData/architecture.html',
      // controller: 'architectureCtrl'
      views: {
        'tab-dash': {
          templateUrl: 'templates/ProjectData/architecture.html',
          controller: 'architectureCtrl'
        }
      }
    })

    .state('tab.wuguan', {
      url: '/declareProject/wuguan',
      // templateUrl: 'templates/ProjectData/architecture.html',
      // controller: 'architectureCtrl'
      views: {
        'tab-dash': {
          templateUrl: 'templates/ProjectData/wuguan.html',
          controller: 'wuguanCtrl'
        }
      }
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
