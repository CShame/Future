// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordovaBluetoothLE','whcyit-immerse'])

.run(["$ionicPlatform", function($ionicPlatform) {
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
}])

.config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

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

}]);

angular.module('starter.controllers', [])

  .controller('DashCtrl', ["$scope", "$state", "$ionicScrollDelegate", "$timeout", function ($scope, $state, $ionicScrollDelegate, $timeout) {

    $scope.functionPoint = [
      {name:'基本下拉框',page:''},
      {name:'下拉框加搜索',page:''},
      {name:'二级联动选择框',page:''},
      {name:'三级联动选择框',page:''},
      {name:'多选下拉框加填写备注',page:''},
      {name:'h5获取经纬度',page:'geoLocation'}

    ];

    $scope.goPage = function (pageUrl) {
      $state.go('tab.'+pageUrl);
    };



    $scope.goNext = function () {
      $state.go('tab.projectData');
    };

    //region 三级联动代码
    $scope.levelOneList = [
      {
        "ProjectCode": null,
        "NodeCode": "001",
        "NodeText": "东北地区",
        "Children": [
          {
            "ProjectCode": null,
            "NodeCode": "001001",
            "NodeText": "沈阳市",
            "Children": [
              {
                "ProjectCode": null,
                "NodeCode": "001001006",
                "NodeText": "浑南区",
                "Children": [{"ProjectCode": 395, "NodeCode": "001001006-395", "NodeText": "沈阳金地长青湾", "Children": []}]
              }
            ]
          },
          {
            "ProjectCode": null,
            "NodeCode": "001002",
            "NodeText": "大连市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "001002004",
              "NodeText": "甘井子区",
              "Children": [{"ProjectCode": 394, "NodeCode": "001002004-394", "NodeText": "大连金地艺境", "Children": []}]
            }]
          }]
      }, {
        "ProjectCode": null,
        "NodeCode": "002",
        "NodeText": "华北地区",
        "Children": [{
          "ProjectCode": null,
          "NodeCode": "002001",
          "NodeText": "北京市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "002001003",
            "NodeText": "朝阳区",
            "Children": [{"ProjectCode": 393, "NodeCode": "002001003-393", "NodeText": "北京金地国际花园", "Children": []}]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "002002",
          "NodeText": "天津市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "002002003",
            "NodeText": "河东区",
            "Children": [{"ProjectCode": 385, "NodeCode": "002002003-385", "NodeText": "天津金地紫乐府", "Children": []}]
          }]
        }]
      }, {
        "ProjectCode": null,
        "NodeCode": "003",
        "NodeText": "华中地区",
        "Children": [{
          "ProjectCode": null,
          "NodeCode": "003001",
          "NodeText": "武汉市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "003001007",
            "NodeText": "洪山区",
            "Children": [{"ProjectCode": 388, "NodeCode": "003001007-388", "NodeText": "武汉金地圣爱米伦", "Children": []}]
          }]
        }]
      }, {
        "ProjectCode": null,
        "NodeCode": "004",
        "NodeText": "华东地区",
        "Children": [{
          "ProjectCode": null,
          "NodeCode": "004001",
          "NodeText": "上海市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004001014",
            "NodeText": "青浦区",
            "Children": [{"ProjectCode": 390, "NodeCode": "004001014-390", "NodeText": "上海金地天御", "Children": []}]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004002",
          "NodeText": "杭州市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004002007",
            "NodeText": "萧山区",
            "Children": [{"ProjectCode": 389, "NodeCode": "004002007-389", "NodeText": "杭州金地天逸", "Children": []}]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004003",
          "NodeText": "南京市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004003003",
            "NodeText": "建邺区",
            "Children": [{"ProjectCode": 391, "NodeCode": "004003003-391", "NodeText": "南京金地名京", "Children": []}]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004004",
          "NodeText": "烟台市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004004004",
            "NodeText": "莱山区",
            "Children": [{"ProjectCode": 51122, "NodeCode": "004004004-51122", "NodeText": "烟台金地澜悦", "Children": []}]
          }]
        }]
      }, {
        "ProjectCode": null,
        "NodeCode": "005",
        "NodeText": "华南地区",
        "Children": [{
          "ProjectCode": null,
          "NodeCode": "005001",
          "NodeText": "深圳市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "005001001",
            "NodeText": "南山区",
            "Children": [{
              "ProjectCode": 7,
              "NodeCode": "005001001-7",
              "NodeText": "亿达别苑",
              "Children": []
            }, {"ProjectCode": 396, "NodeCode": "005001001-396", "NodeText": "深圳金地国际公寓", "Children": []}]
          }, {
            "ProjectCode": null,
            "NodeCode": "005001002",
            "NodeText": "福田区",
            "Children": [{
              "ProjectCode": 9,
              "NodeCode": "005001002-9",
              "NodeText": "深圳金海湾花园",
              "Children": []
            }, {"ProjectCode": 12, "NodeCode": "005001002-12", "NodeText": "深圳金地翠堤湾", "Children": []}]
          }, {
            "ProjectCode": null,
            "NodeCode": "005001007",
            "NodeText": "龙华区",
            "Children": [{"ProjectCode": 386, "NodeCode": "005001007-386", "NodeText": "深圳金地天悦湾", "Children": []}]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "005003",
          "NodeText": "佛山市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "005003003",
            "NodeText": "顺德区",
            "Children": [{"ProjectCode": 387, "NodeCode": "005003003-387", "NodeText": "佛山金地天玺", "Children": []}]
          }]
        }]
      }, {
        "ProjectCode": null,
        "NodeCode": "007",
        "NodeText": "西北地区",
        "Children": [{
          "ProjectCode": null,
          "NodeCode": "007001",
          "NodeText": "西安市",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "007001006",
            "NodeText": "雁塔区",
            "Children": [{"ProjectCode": 392, "NodeCode": "007001006-392", "NodeText": "西安湖城大境天第", "Children": []}]
          }]
        }]
      }];

    $scope.levelTwoList = [];
    $scope.levelThreeList = [];


    $scope.levelOneTimer = null; //一级滑动定时器
    $scope.levelTwoTimer = null; //二级滑动定时器
    $scope.levelThreeTimer = null; //三级滑动定时器


    init();
    function init() {
      initLevelOne();
      initLevelTwo();
      initLevelThree();
    }


    //初始化一级
    function initLevelOne() {
      insertBlankData($scope.levelOneList);
      $scope.levelOneValue = $scope.levelOneList[2];
      $scope.levelOneValue.selected = true;
      $scope.levelOneIndex = 2;

      console.log($scope.levelOneList);
    }

    //初始化二级
    function initLevelTwo() {
      insertBlankData($scope.levelTwoList);
      console.log($scope.levelTwoList);
      if ($scope.levelOneValue.Children) {
        $scope.levelTwoValue = $scope.levelOneValue.Children[2];
      } else {
        $scope.levelTwoValue = $scope.levelTwoList[2];
      }
      $scope.levelTwoValue.selected = true;
      $scope.levelTwoIndex = 2;
    }

    //初始化三级
    function initLevelThree() {
      insertBlankData($scope.levelThreeList);
      if ($scope.levelTwoValue.Children) {
        $scope.levelThreeValue = $scope.levelTwoValue.Children[2];
      } else {
        $scope.levelThreeValue = $scope.levelThreeList[2];
      }
      $scope.levelThreeValue.selected = true;
      $scope.levelThreeIndex = 2;
    }

    //滚动触发事件
    $scope.scrollingEvent = function (type) {
      var opEntity = getOperateEntity(type);

      if ($scope[opEntity.scrollTimer]) {
        $timeout.cancel($scope[opEntity.scrollTimer]);
      }

      var posi = $ionicScrollDelegate.$getByHandle(opEntity.scrollHandler).getScrollPosition();
      var index = Math.abs(Math.round(posi.top / 30));
      console.log(posi, index);
      if (posi.top == index * 30) {
        updateSelect(index + 2, type);
      } else {
        $scope[opEntity.scrollTimer] = $timeout(function () {
          posi.top = index * 30;
          updateSelect(index + 2, type);
          scrollToPosi($ionicScrollDelegate.$getByHandle(opEntity.scrollHandler), posi);
        }, 200);
      }

    };

    //获取滚动条详细数据
    function getOperateEntity(type) {
      var entity = new Object();

      switch (type) {
        case 'levelOne':
          entity.scrollTimer = 'levelOneTimer';
          entity.type = type;
          entity.scrollHandler = 'levelOneScroll';
          entity.data = $scope.levelOneList;

          break;
        case 'levelTwo':
          entity.scrollTimer = 'levelTwoTimer';
          entity.type = type;
          entity.scrollHandler = 'levelTwoScroll';
          entity.data = $scope.levelTwoList;
          break;
        case 'levelThree':
          entity.scrollTimer = 'levelThreeTimer';
          entity.type = type;
          entity.scrollHandler = 'levelThreeScroll';
          entity.data = $scope.levelThreeList;
          break;
      }

      return entity;
    }


    //更新选中的内容
    function updateSelect(index, type) {
      switch (type) {
        case "levelOne":
          //强制
          $timeout(function () {
            $scope.levelOneValue.selected = false;
            $scope.levelOneList[index].selected = true;
            $scope.levelOneIndex = index;
            $scope.levelOneValue = $scope.levelOneList[index];
          });
          break;
        case "levelTwo":
          //强制
          $timeout(function () {
            $scope.levelTwoValue.selected = false;
            $scope.levelTwoList[index].selected = true;
            $scope.levelTwoIndex = index;
            $scope.levelTwoValue = $scope.levelTwoList[index];
            // console.log($scope.levelTwoIndex,$scope.levelTwoValue);

          });
          break;
        case "levelThree":
          //强制
          $timeout(function () {
            $scope.levelThreeValue.selected = false;
            $scope.levelThreeList[index].selected = true;
            $scope.levelThreeIndex = index;
            $scope.levelThreeValue = $scope.levelThreeList[index];
            // console.log($scope.levelThreeValue);
          });
          break;

      }
    }


    $scope.$watch('levelOneIndex', function (newV, oldV) {
      if (newV != oldV) {
        if (newV != 2) {  //不是选择全部的时候
          $scope.levelTwoList = $scope.levelOneList[newV].Children;
        } else {
          $scope.levelTwoList = [];
        }
        initLevelTwo();
        $scope.levelTwoValue.selected = false;
        $scope.levelTwoIndex = 2;
        $scope.levelTwoValue = $scope.levelTwoList[2];
        $scope.levelTwoValue.selected = true;
      }
    });

    $scope.$watch('levelTwoIndex', function (newV, oldV) {
      if (newV != oldV) {
        if (newV != 2) { //不是选择全部的时候
          $scope.levelThreeList = $scope.levelTwoList[newV].Children;
        } else {
          $scope.levelThreeList = [];
        }
        initLevelThree();
        $scope.levelThreeValue.selected = false;
        $scope.levelThreeIndex = 2;
        $scope.levelThreeValue = $scope.levelThreeList[2];
        $scope.levelThreeValue.selected = true;

      }
    });

    //在数据列表前后插入俩个空数据
    function insertBlankData(arr) {
      if (arr[0] == '' && arr[1] == '' && arr[2].NodeText == '全部') {
        return;
      } else {
        arr.unshift({NodeText: '全部'});
        arr.unshift('');
        arr.unshift('');
        arr.push('');
        arr.push('');
      }
    }

    //滑动到指定位置
    function scrollToPosi(scorllHandler, posi) {
      scorllHandler && scorllHandler.scrollTo(posi.left, posi.top, true);
    }

    //endregion


    $scope.options = {
      list: [
        {
          "ProjectCode": null,
          "NodeCode": "001",
          "NodeText": "东北地区",
          "Children": [
            {
              "ProjectCode": null,
              "NodeCode": "001001",
              "NodeText": "沈阳市",
              "Children": [
                {
                  "ProjectCode": null,
                  "NodeCode": "001001006",
                  "NodeText": "浑南区",
                  "Children": [{
                    "ProjectCode": 395,
                    "NodeCode": "001001006-395",
                    "NodeText": "沈阳金地长青湾",
                    "Children": []
                  }]
                }
              ]
            },
            {
              "ProjectCode": null,
              "NodeCode": "001002",
              "NodeText": "大连市",
              "Children": [{
                "ProjectCode": null,
                "NodeCode": "001002004",
                "NodeText": "甘井子区",
                "Children": [{"ProjectCode": 394, "NodeCode": "001002004-394", "NodeText": "大连金地艺境", "Children": []}]
              }]
            }]
        }, {
          "ProjectCode": null,
          "NodeCode": "002",
          "NodeText": "华北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "002001",
            "NodeText": "北京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002001003",
              "NodeText": "朝阳区",
              "Children": [{"ProjectCode": 393, "NodeCode": "002001003-393", "NodeText": "北京金地国际花园", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "002002",
            "NodeText": "天津市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002002003",
              "NodeText": "河东区",
              "Children": [{"ProjectCode": 385, "NodeCode": "002002003-385", "NodeText": "天津金地紫乐府", "Children": []}]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "003",
          "NodeText": "华中地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "003001",
            "NodeText": "武汉市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "003001007",
              "NodeText": "洪山区",
              "Children": [{"ProjectCode": 388, "NodeCode": "003001007-388", "NodeText": "武汉金地圣爱米伦", "Children": []}]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004",
          "NodeText": "华东地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004001",
            "NodeText": "上海市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004001014",
              "NodeText": "青浦区",
              "Children": [{"ProjectCode": 390, "NodeCode": "004001014-390", "NodeText": "上海金地天御", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004002",
            "NodeText": "杭州市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004002007",
              "NodeText": "萧山区",
              "Children": [{"ProjectCode": 389, "NodeCode": "004002007-389", "NodeText": "杭州金地天逸", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004003",
            "NodeText": "南京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004003003",
              "NodeText": "建邺区",
              "Children": [{"ProjectCode": 391, "NodeCode": "004003003-391", "NodeText": "南京金地名京", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004004",
            "NodeText": "烟台市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004004004",
              "NodeText": "莱山区",
              "Children": [{
                "ProjectCode": 51122,
                "NodeCode": "004004004-51122",
                "NodeText": "烟台金地澜悦",
                "Children": []
              }]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "005",
          "NodeText": "华南地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "005001",
            "NodeText": "深圳市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005001001",
              "NodeText": "南山区",
              "Children": [{
                "ProjectCode": 7,
                "NodeCode": "005001001-7",
                "NodeText": "亿达别苑",
                "Children": []
              }, {"ProjectCode": 396, "NodeCode": "005001001-396", "NodeText": "深圳金地国际公寓", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001002",
              "NodeText": "福田区",
              "Children": [{
                "ProjectCode": 9,
                "NodeCode": "005001002-9",
                "NodeText": "深圳金海湾花园",
                "Children": []
              }, {"ProjectCode": 12, "NodeCode": "005001002-12", "NodeText": "深圳金地翠堤湾", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001007",
              "NodeText": "龙华区",
              "Children": [{"ProjectCode": 386, "NodeCode": "005001007-386", "NodeText": "深圳金地天悦湾", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "005003",
            "NodeText": "佛山市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005003003",
              "NodeText": "顺德区",
              "Children": [{"ProjectCode": 387, "NodeCode": "005003003-387", "NodeText": "佛山金地天玺", "Children": []}]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "007",
          "NodeText": "西北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "007001",
            "NodeText": "西安市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "007001006",
              "NodeText": "雁塔区",
              "Children": [{"ProjectCode": 392, "NodeCode": "007001006-392", "NodeText": "西安湖城大境天第", "Children": []}]
            }]
          }]
        }],
      title: '项目范围选择',
      levelOneAttr: 'NodeText',
      levelTwoAttr: 'NodeText',
      levelThreeAttr: 'NodeText',
    };

    $scope.options22 = {
      list: [
        {
          "ProjectCode": null,
          "NodeCode": "001",
          "NodeText": "东北地区",
          "Children": [
            {
              "ProjectCode": null,
              "NodeCode": "001001",
              "NodeText": "沈阳市",
              "Children": []
            },
            {
              "ProjectCode": null,
              "NodeCode": "001002",
              "NodeText": "大连市",
              "Children": [{
                "ProjectCode": null,
                "NodeCode": "001002004",
                "NodeText": "甘井子区",
                "Children": []
              }]
            }]
        }, {
          "ProjectCode": null,
          "NodeCode": "002",
          "NodeText": "华北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "002001",
            "NodeText": "北京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002001003",
              "NodeText": "朝阳区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "002002",
            "NodeText": "天津市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002002003",
              "NodeText": "河东区",
              "Children": []
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "003",
          "NodeText": "华中地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "003001",
            "NodeText": "武汉市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "003001007",
              "NodeText": "洪山区",
              "Children": []
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004",
          "NodeText": "华东地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004001",
            "NodeText": "上海市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004001014",
              "NodeText": "青浦区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004002",
            "NodeText": "杭州市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004002007",
              "NodeText": "萧山区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004003",
            "NodeText": "南京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004003003",
              "NodeText": "建邺区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004004",
            "NodeText": "烟台市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004004004",
              "NodeText": "莱山区",
              "Children": [{
                "ProjectCode": 51122,
                "NodeCode": "004004004-51122",
                "NodeText": "烟台金地澜悦",
                "Children": []
              }]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "005",
          "NodeText": "华南地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "005001",
            "NodeText": "深圳市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005001001",
              "NodeText": "南山区",
              "Children": [{
                "ProjectCode": 7,
                "NodeCode": "005001001-7",
                "NodeText": "亿达别苑",
                "Children": []
              }, {"ProjectCode": 396, "NodeCode": "005001001-396", "NodeText": "深圳金地国际公寓", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001002",
              "NodeText": "福田区",
              "Children": [{
                "ProjectCode": 9,
                "NodeCode": "005001002-9",
                "NodeText": "深圳金海湾花园",
                "Children": []
              }, {"ProjectCode": 12, "NodeCode": "005001002-12", "NodeText": "深圳金地翠堤湾", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001007",
              "NodeText": "龙华区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "005003",
            "NodeText": "佛山市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005003003",
              "NodeText": "顺德区",
              "Children": []
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "007",
          "NodeText": "西北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "007001",
            "NodeText": "西安市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "007001006",
              "NodeText": "雁塔区",
              "Children": []
            }]
          }]
        }],
      title: '项目范围选择',
      levelOneAttr: 'NodeText',
      levelTwoAttr: 'NodeText'
    };

    $scope.options1 = {
      title: '选择项目',
      list: [{name: '哈哈哈哈'}, {name: '遂宁市'}, {name: '是实打实的'}, {name: '试试'}, {name: '试试1'}, {name: '试试2'}, {name: '少时诵诗书'}],
      attrName: 'name'
    };

    $scope.options2 = {
      title: '请选择',
      list: [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}, {name: 'test4'}, {name: 'test5'}, {name: 'test6'}, {name: 'test7'}],
      attrName: 'name'
    };


    $scope.recordTitle = '按住录音';


    function getRecord(src, step) {
      var mediaRec = new Media(src,
        // success callback
        function () {
          console.log("recordAudio():Audio Success", '---' + step);
        },
        // error callback
        function (err) {
          console.log("recordAudio():Audio Error: " + err.code, '---' + step);
        });
      return mediaRec;
    }


    var mediaRec = null;
    //开始录音
    $scope.startRecord = function () {
      console.log('触发on-hold');
      var src = 'test.mp3';
      if (mediaRec) {
        mediaRec.release();
      }
      console.log(src);
      mediaRec = new Media(src,
        // success callback
        function () {
          console.log("recordAudio():startRecord Success");
        },
        // error callback
        function (err) {
          console.log("recordAudio():startRecord Error: " + err.code);
        });
      // Record audio
      mediaRec.startRecord();
    };

    //停止录音并保存
    $scope.stopAndSaveRecord = function () {
      console.log('触发on-release');
      $timeout(function () {
        if (mediaRec) {
          mediaRec.stopRecord();
          mediaRec.release();
        }
      }, 0)
    };

    //停止录音并取消录音
    $scope.cancelRecord = function ($event) {
      console.log('触发向上滑', $event);

      // $scope.recordTitle = '按住录音';
      //
      // var src = "2.aac";
      // var mediaRec = getRecord(src,'cancelRecord');
      // mediaRec.stopRecord();
      // //todo:delete
    };

    //播放录音
    $scope.playRecord = function () {
      var src = "test.mp3";
      if (mediaRec) {
        mediaRec.release();
      }
      mediaRec = new Media(src,
        // success callback
        function () {
          console.log("recordAudio():play Success");
        },
        // error callback
        function (err) {
          console.log("recordAudio():play Error: " + err.code);
        });
      mediaRec.play();
    }


    $scope.options3 = {
      title: '请选择原因',
      list: [{value: 1, Remark: '道行不够'}, {value: 2, Remark: '材料不齐'}, {value: 3, Remark: '缺材料'}, {
        value: 4,
        Remark: '其它'
      }],
      attrName: 'Remark'
    };
    $scope.btnOk = function () {
      console.log('点击成OK', $scope.options3);
    }
  }])

  .controller('ChatsCtrl', ["$scope", "$interval", "$timeout", "chart", function ($scope, $interval, $timeout, chart) {

    $scope.dataList = [
      '通知1：拉拉阿拉啦啦啊啊啊啊啊啊',
      '通知2：拉拉阿拉啦啦啊啊啊啊啊啊',
      '通知3：拉拉阿拉啦啦啊啊啊啊啊啊',
      '通知4：拉拉阿拉啦啦啊啊啊啊啊啊',
      '通知5：拉拉阿拉啦啦啊啊啊啊啊啊',
      '通知6：拉拉阿拉啦啦啊啊啊啊啊啊'
    ];
    console.log('第一次刷新');


    $scope.options = {
      step: 1,
      timer: 18
    };
    $scope.isChange = false;

    $scope.changeCallback = function () {
      $scope.isChange = false;
      console.log("变化完成后", $scope.isChange);
    };


    $timeout(function () {
      $scope.dataList = [
        '通知1：拉拉阿拉啦啦啊啊啊啊啊啊',
        '通知2：拉拉阿拉啦啦啊啊啊啊啊啊',
        '通知3：拉拉阿拉啦啦啊啊啊啊啊啊',
      ];
      console.log('第二次刷新');
      $timeout(function () {
        $scope.isChange = true;
      })
    }, 5000);


    var a = document.getElementById("aa");

    $interval(function () {
      a.scrollTop += 44;
    }, 1000);


    chart.showPie("airportPie");


    $timeout(function () {
      $scope.percentList = [{p: 80, title: '保养', title1: '已完成', title2: '未完成', data1: '80', data2: '100', unit: '个'},
        {p: 80, title: '保养', title1: '已完成', title2: '未完成', data1: '70', data2: '100', unit: '个'},
        {p: 70, title: '保养', title1: '已完成', title2: '未完成', data1: '80', data2: '80', unit: '个'},
        {p: 60, title: '保养', title1: '已完成', title2: '未完成', data1: '20', data2: '90', unit: '个'},
        {p: 50, title: '保养', title1: '已完成', title2: '未完成', data1: '10', data2: '100', unit: '个'},
        {p: 40, title: '保养', title1: '已完成', title2: '未完成', data1: '20', data2: '20', unit: '个'},
        {p: 30, title: '保养', title1: '已完成', title2: '未完成', data1: '30', data2: '30', unit: '个'},
        {p: 20, title: '保养', title1: '已完成', title2: '未完成', data1: '40', data2: '50', unit: '个'}
      ];
      $scope.percent = 50;
    }, 1000);


    $scope.barList = [
      {name: '切换', data: '10', per: 83.3},
      {name: '掉电', data: '6', per: 50},
      {name: '外场开路', data: '4', per: 33.3},
      {name: '过流', data: '2', per: 16.7},
    ]

    $scope.maxY = 12;


  }])

  .controller('ChatDetailCtrl', ["$scope", "$stateParams", "Chats", function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  }])

  .controller('AccountCtrl', ["$scope", "$rootScope", "$ionicModal", "$http", "myNote", "$state", "$interval", "CalenderService", "lunarCalendar", "$filter", function ($scope, $rootScope, $ionicModal, $http, myNote, $state, $interval, CalenderService,lunarCalendar,$filter) {

    $scope.thisMonthDate = [];

    var nowDate = new Date();
    var thisYear = nowDate.getYear();
    var thisMonth = nowDate.getMonth()+1;
    var thisDate = nowDate.getDate();

    $scope.thisMonthDate = CalenderService.initCalendar(thisYear, thisMonth, thisDate);
    console.log($scope.thisMonthDate);
    console.log(lunarCalendar.solar2lunar(2018,8,1));


    $scope.timeCause = function (year, month) {
      $scope.thisMonthDate = CalenderService.initCalendar(year-1900, month, thisDate);
      console.log($scope.thisMonthDate);
    };

    function eventWindowLoaded() {
      canvasApp();
    }

    function canvasApp() {

      var theCanvas = document.getElementById('canvasOne');
      var ctx = theCanvas.getContext('2d');
      theCanvas.width = window.innerWidth;
      theCanvas.height = '100';

      $scope.lastPoint = {x: 150, y: theCanvas.height};  //默认最后一个点为底部中间位置
      var dsq;                                        //计时器变量

      var code = document.getElementById('code'),
        point,
        style,
        drag = null,
        dPoint;

      // define initial points
      function init() {
        point = {
          p1: {
            x: -30,
            y: theCanvas.height
          },
          p2: {
            x: window.innerWidth + 30,
            y: theCanvas.height
          },
          cp1: {
            x: window.innerWidth * 0.5,
            y: theCanvas.height
          }
        };

        // default styles
        style = {
          curve: {
            width: 1,
            color: 'transparent'
          },
          cpline: {
            width: 1,
            color: '#c00'
          }
        };

        var contentDiv = document.getElementById('content');

        //event handles
        contentDiv.addEventListener('touchstart', dragStart, false);
        contentDiv.addEventListener('touchmove', dragging, false);
        contentDiv.addEventListener('touchend', dragEnd, false);
        // theCanvas.addEventListener('mouseout', dragEnd, false);

        drawScreen();
      }

      var backTransparent = 0.44;
      var goTransparent = 0.03;
      var count = 0;

      // draw screen
      function drawScreen(state) {
        ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
        // curve
        ctx.lineWidth = style.curve.width;
        ctx.strokeStyle = style.curve.color;

        ctx.beginPath();
        ctx.moveTo(point.p1.x, point.p1.y);
        if (point.cp2) {
          ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
        } else {
          ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
        }
        ctx.moveTo(point.p2.x, point.p2.y);
        ctx.lineTo(point.p1.x, point.p1.y);
        ctx.stroke();
        if (state == 'back') {
          // console.log(backTransparent);
          backTransparent = backTransparent - 0.01 <= 0.03 ? 0.03 : backTransparent - 0.01;
          ctx.fillStyle = "rgba(0,0,0," + backTransparent + ")";
        } else {
          console.log(goTransparent);
          goTransparent = goTransparent + 0.005 >= 0.44 ? 0.44 : goTransparent + 0.005;
          ctx.fillStyle = "rgba(0,0,0," + goTransparent + ")";
        }
        ctx.fill();
      }

      // event parser
      function MousePos(event) {
        event = event ? event : window.event;
        // console.log(event);

        return {
          x: event.touches[0].pageX - theCanvas.offsetLeft,
          y: event.touches[0].pageY - theCanvas.offsetTop - 44
        }
      }

      // start dragging
      function dragStart(e) {
        // console.log(e);
        $scope.startPointY = e.touches[0].pageY;
        e = MousePos(e);
        drag = point.cp1;
        dPoint = e;
        theCanvas.style.cursor = 'move';
        if (dsq) {
          $interval.cancel(dsq);
          backTransparent = 0.44;
          goTransparent = 0.03;
        }
      }

      function dragging(e) {
        if (drag) {
          e = MousePos(e);
          point.cp1.x += e.x - dPoint.x;
          point.cp1.y += e.y - dPoint.y;
          if (point.cp1.x < 100) {
            point.cp1.x = 100;
          } else if (point.cp1.x > window.innerWidth - 100) {
            point.cp1.x = window.innerWidth - 100;
          }
          if (point.cp1.y < theCanvas.height - 120) {
            point.cp1.y = theCanvas.height - 120;
          }
          dPoint = e;
          drawScreen();
          $scope.lastPoint = point.cp1;
        }
      }

      function dragEnd(e) {
        drag = null;
        // console.log(dsq);
        dsq = $interval(function () {
          point.cp1.x = $scope.lastPoint.x;
          point.cp1.y = $scope.lastPoint.y;
          drawScreen('back');
          $scope.lastPoint.y += 3;
        }, 16);
        theCanvas.style.cursor = 'default';
        backTransparent = goTransparent;
      }

      $scope.$watch('lastPoint', function (newV) {
        if (newV && newV.y >= theCanvas.height) {
          $interval.cancel(dsq);
          $scope.lastPoint = {x: 150, y: theCanvas.height};
          drawScreen();
          backTransparent = 0.44;
          goTransparent = 0.03;
        }
      }, true);

      // drawScreen();
      init();

    }


  }])

  .factory('CalenderService', ["lunarCalendar", function (lunarCalendar) {
    var _monthday = [];//存放日历
    var _months = [];//年份下各月天数
    var monthnum;//当月天数
    var lastMonth; //上一月天数
    var nextMounth;//下一月天数
    return {
      //初始化某年每月多少天
      initMonths: function (_year) {
        for (var i = 1; i <= 12; i++) {
          var date = new Date(_year, i, 1);
          _months.push((new Date(date.getTime() - 1000 * 60 * 60 * 24)).getDate());
        }
      },
      //初始化当月，上月，下月天数
      initLastAndNextMonth: function (_year, _month) {
        monthnum = new Date(parseInt(_year), parseInt(_month), 0).getDate();
        if (parseInt(_month) == 1) {
          lastMonth = new Date(parseInt(_year) - 1, parseInt(12), 0).getDate();
        } else {
          lastMonth = new Date(parseInt(_year), parseInt(_month) - 1, 0).getDate();
        }
        if (parseInt(_month) == 12) {
          nextMounth = new Date(parseInt(_year) + 1, parseInt(1), 0).getDate();
        } else {
          nextMounth = new Date(parseInt(_year), parseInt(_month) + 1, 0).getDate();
        }
      },
      //初始化日历
      initCalendar: function (_year, _month, _day) {
        this.initData();
        this.initMonths(_year);
        this.initLastAndNextMonth(_year, _month);
        var cal = {
          year: _year,
          month: _month,
          day: 0
        };
        //本月第一天是周几
        var firstweek = this.getMonthFirstDayWeek(_year, _month, 1);
        firstweek = firstweek == 0 ? 7 : firstweek;
        //上月空余日期填补
        for (j = firstweek; j > 0; j--) {
          var temp1 = angular.copy(cal);
          temp1.month = _month - 1 == 0 ? 12 : _month - 1;
          temp1.year = _month - 1 == 0 ? _year - 1 : _year;
          temp1.day = lastMonth - j + 1;
          //加上农历
          temp1.lunar = lunarCalendar.solar2lunar(temp1.year+1900,temp1.month,temp1.day);

          _monthday.push(temp1);
        }
        //本月日期填补
        for (i = 1; i <= _months[_month - 1]; i++) {
          var weeknum = this.getMonthWeek(_year, _month, i);
          var temp2 = angular.copy(cal);
          temp2.day = i;
          //加上农历
          temp2.lunar = lunarCalendar.solar2lunar(_year+1900, _month,temp2.day);
          _monthday.push(temp2);
        }
        //本月最后一天是周几
        var lastweek = this.getMonthFirstDayWeek(_year, _month, monthnum);
        //下月空余日期填补
        if (lastweek != 6) {
          for (j = 1; j < 7 - lastweek; j++) {
            var temp3 = angular.copy(cal);
            temp3.month = _month + 1 == 13 ? 1 : _month + 1;
            temp3.year = _month + 1 == 13 ? _year + 1 : _year;
            temp3.day = j;
            //加上农历
            temp3.lunar = lunarCalendar.solar2lunar(temp3.year+1900,temp3.month,temp3.day);
            _monthday.push(temp3);
          }
        }
        return _monthday;
      },
      //判断某一天是周几
      getMonthFirstDayWeek: function (year, month, day) {
        var date = new Date(year+1900, month - 1, day);
        return date.getDay();
      },
      //判断某一天是当月的第几周
      getMonthWeek: function (year, month, day) {
        var date = new Date(year, parseInt(month) - 1, day);
        var w = date.getDay();
        w = w == 0 ? 7 : w;
        var d = date.getDate();
        return Math.ceil(
          (d + 6 - w) / 7
        );
      },
      //重置所有数据
      initData: function () {
        _monthday = [];
        _months = [];
        monthnum = 0;
        lastMonth = 0;
        nextMounth = 0;
      }
    }
  }])


  .factory('lunarCalendar', function () {

    /**
     * @1900-2100区间内的公历、农历互转
     * @charset UTF-8
     * @Author  Jea杨(JJonline@JJonline.Cn)
     * @Time    2014-7-21
     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
     * @Version 1.0.2
     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
     */
    var calendar  = {

      /**
       * 农历1900-2100的润大小信息表
       * @Array Of Property
       * @return Hex
       */
      lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520],//2100

      /**
       * 公历每个月份的天数普通表
       * @Array Of Property
       * @return Number
       */
      solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

      /**
       * 天干地支之天干速查表
       * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
       * @return Cn string
       */
      Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

      /**
       * 天干地支之地支速查表
       * @Array Of Property
       * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
       * @return Cn string
       */
      Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

      /**
       * 天干地支之地支速查表<=>生肖
       * @Array Of Property
       * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
       * @return Cn string
       */
      Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

      /**
       * 24节气速查表
       * @Array Of Property
       * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
       * @return Cn string
       */
      solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

      /**
       * 1900-2100各年的24节气日期速查表
       * @Array Of Property
       * @return 0x string For splice
       */
      sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

      /**
       * 数字转中文速查表
       * @Array Of Property
       * @trans ['日','一','二','三','四','五','六','七','八','九','十']
       * @return Cn string
       */
      nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

      /**
       * 日期转农历称呼速查表
       * @Array Of Property
       * @trans ['初','十','廿','卅']
       * @return Cn string
       */
      nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

      /**
       * 月份转农历称呼速查表
       * @Array Of Property
       * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
       * @return Cn string
       */
      nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

      /**
       * 返回农历y年一整年的总天数
       * @param lunar Year
       * @return Number
       * @eg:var count = calendar.lYearDays(1987) ;//count=387
       */
      lYearDays: function (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
          sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
        }
        return (sum + calendar.leapDays(y));
      },

      /**
       * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
       * @param lunar Year
       * @return Number (0-12)
       * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
       */
      leapMonth: function (y) { //闰字编码 \u95f0
        return (calendar.lunarInfo[y - 1900] & 0xf);
      },

      /**
       * 返回农历y年闰月的天数 若该年没有闰月则返回0
       * @param lunar Year
       * @return Number (0、29、30)
       * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
       */
      leapDays: function (y) {
        if (calendar.leapMonth(y)) {
          return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        }
        return (0);
      },

      /**
       * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
       * @param lunar Year
       * @return Number (-1、29、30)
       * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
       */
      monthDays: function (y, m) {
        if (m > 12 || m < 1) {
          return -1
        }//月份参数从1至12，参数错误返回-1
        return ( (calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29 );
      },

      /**
       * 返回公历(!)y年m月的天数
       * @param solar Year
       * @return Number (-1、28、29、30、31)
       * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
       */
      solarDays: function (y, m) {
        if (m > 12 || m < 1) {
          return -1
        } //若参数错误 返回-1
        var ms = m - 1;
        if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
          return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        } else {
          return (calendar.solarMonth[ms]);
        }
      },

      /**
       * 农历年份转换为干支纪年
       * @param  lYear 农历年的年份数
       * @return Cn string
       */
      toGanZhiYear: function (lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干
        if (zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支
        return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];

      },

      /**
       * 公历月、日判断所属星座
       * @param  cMonth [description]
       * @param  cDay [description]
       * @return Cn string
       */
      toAstro: function (cMonth, cDay) {
        var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";//座
      },

      /**
       * 传入offset偏移量返回干支
       * @param offset 相对甲子的偏移量
       * @return Cn string
       */
      toGanZhi: function (offset) {
        return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
      },

      /**
       * 传入公历(!)y年获得该年第n个节气的公历日期
       * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
       * @return day Number
       * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
       */
      getTerm: function (y, n) {
        if (y < 1900 || y > 2100) {
          return -1;
        }
        if (n < 1 || n > 24) {
          return -1;
        }
        var _table = calendar.sTermInfo[y - 1900];
        var _info = [
          parseInt('0x' + _table.substr(0, 5)).toString(),
          parseInt('0x' + _table.substr(5, 5)).toString(),
          parseInt('0x' + _table.substr(10, 5)).toString(),
          parseInt('0x' + _table.substr(15, 5)).toString(),
          parseInt('0x' + _table.substr(20, 5)).toString(),
          parseInt('0x' + _table.substr(25, 5)).toString()
        ];
        var _calday = [
          _info[0].substr(0, 1),
          _info[0].substr(1, 2),
          _info[0].substr(3, 1),
          _info[0].substr(4, 2),

          _info[1].substr(0, 1),
          _info[1].substr(1, 2),
          _info[1].substr(3, 1),
          _info[1].substr(4, 2),

          _info[2].substr(0, 1),
          _info[2].substr(1, 2),
          _info[2].substr(3, 1),
          _info[2].substr(4, 2),

          _info[3].substr(0, 1),
          _info[3].substr(1, 2),
          _info[3].substr(3, 1),
          _info[3].substr(4, 2),

          _info[4].substr(0, 1),
          _info[4].substr(1, 2),
          _info[4].substr(3, 1),
          _info[4].substr(4, 2),

          _info[5].substr(0, 1),
          _info[5].substr(1, 2),
          _info[5].substr(3, 1),
          _info[5].substr(4, 2),
        ];
        return parseInt(_calday[n - 1]);
      },

      /**
       * 传入农历数字月份返回汉语通俗表示法
       * @param lunar month
       * @return Cn string
       * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
       */
      toChinaMonth: function (m) { // 月 => \u6708
        if (m > 12 || m < 1) {
          return -1
        } //若参数错误 返回-1
        var s = calendar.nStr3[m - 1];
        s += "\u6708";//加上月字
        return s;
      },

      /**
       * 传入农历日期数字返回汉字表示法
       * @param lunar day
       * @return Cn string
       * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
       */
      toChinaDay: function (d) { //日 => \u65e5
        var s;
        switch (d) {
          case 10:
            s = '\u521d\u5341';
            break;
          case 20:
            s = '\u4e8c\u5341';
            break;
            break;
          case 30:
            s = '\u4e09\u5341';
            break;
            break;
          default :
            s = calendar.nStr2[Math.floor(d / 10)];
            s += calendar.nStr1[d % 10];
        }
        return (s);
      },

      /**
       * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
       * @param y year
       * @return Cn string
       * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
       */
      getAnimal: function (y) {
        return calendar.Animals[(y - 4) % 12]
      },

      /**
       * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
       * @param y  solar year
       * @param m  solar month
       * @param d  solar day
       * @return JSON object
       * @eg:console.log(calendar.solar2lunar(1987,11,01));
       */
      solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
        if (y < 1900 || y > 2100) {
          return -1;
        }//年份限定、上限
        if (y == 1900 && m == 1 && d < 31) {
          return -1;
        }//下限
        if (!y) { //未传参  获得当天
          var objDate = new Date();
        } else {
          var objDate = new Date(y, parseInt(m) - 1, d)
        }
        var i, leap = 0, temp = 0;
        //修正ymd参数
        var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
        var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2101 && offset > 0; i++) {
          temp = calendar.lYearDays(i);
          offset -= temp;
        }
        if (offset < 0) {
          offset += temp;
          i--;
        }

        //是否今天
        var isTodayObj = new Date(), isToday = false;
        if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
          isToday = true;
        }
        //星期几
        var nWeek = objDate.getDay(), cWeek = calendar.nStr1[nWeek];
        if (nWeek == 0) {
          nWeek = 7;
        }//数字表示周几顺应天朝周一开始的惯例
        //农历年
        var year = i;

        var leap = calendar.leapMonth(i); //闰哪个月
        var isLeap = false;

        //效验闰月
        for (i = 1; i < 13 && offset > 0; i++) {
          //闰月
          if (leap > 0 && i == (leap + 1) && isLeap == false) {
            --i;
            isLeap = true;
            temp = calendar.leapDays(year); //计算农历闰月天数
          }
          else {
            temp = calendar.monthDays(year, i);//计算农历普通月天数
          }
          //解除闰月
          if (isLeap == true && i == (leap + 1)) {
            isLeap = false;
          }
          offset -= temp;
        }

        if (offset == 0 && leap > 0 && i == leap + 1)
          if (isLeap) {
            isLeap = false;
          } else {
            isLeap = true;
            --i;
          }
        if (offset < 0) {
          offset += temp;
          --i;
        }
        //农历月
        var month = i;
        //农历日
        var day = offset + 1;

        //天干地支处理
        var sm = m - 1;
        var gzY = calendar.toGanZhiYear(year);

        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode = calendar.getTerm(year, (m * 2 - 1));//返回当月「节」为几日开始
        var secondNode = calendar.getTerm(year, (m * 2));//返回当月「节」为几日开始

        //依据12节气修正干支月
        var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
        if (d >= firstNode) {
          gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
        }

        //传入的日期的节气与否
        var isTerm = false;
        var Term = null;
        if (firstNode == d) {
          isTerm = true;
          Term = calendar.solarTerm[m * 2 - 2];
        }
        if (secondNode == d) {
          isTerm = true;
          Term = calendar.solarTerm[m * 2 - 1];
        }
        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        var gzD = calendar.toGanZhi(dayCyclical + d - 1);
        //该日期所属的星座
        var astro = calendar.toAstro(m, d);

        return {
          'lYear': year,
          'lMonth': month,
          'lDay': day,
          'Animal': calendar.getAnimal(year),
          'IMonthCn': (isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month),
          'IDayCn': calendar.toChinaDay(day),
          'cYear': y,
          'cMonth': m,
          'cDay': d,
          'gzYear': gzY,
          'gzMonth': gzM,
          'gzDay': gzD,
          'isToday': isToday,
          'isLeap': isLeap,
          'nWeek': nWeek,
          'ncWeek': "\u661f\u671f" + cWeek,
          'isTerm': isTerm,
          'Term': Term,
          'astro': astro
        };
      },

      /**
       * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
       * @param y  lunar year
       * @param m  lunar month
       * @param d  lunar day
       * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
       * @return JSON object
       * @eg:console.log(calendar.lunar2solar(1987,9,10));
       */
      lunar2solar: function (y, m, d, isLeapMonth) {   //参数区间1900.1.31~2100.12.1
        var isLeapMonth = !!isLeapMonth;
        var leapOffset = 0;
        var leapMonth = calendar.leapMonth(y);
        var leapDay = calendar.leapDays(y);
        if (isLeapMonth && (leapMonth != m)) {
          return -1;
        }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
        if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
          return -1;
        }//超出了最大极限值
        var day = calendar.monthDays(y, m);
        var _day = day;
        //bugFix 2016-9-25
        //if month is leap, _day use leapDays method
        if (isLeapMonth) {
          _day = calendar.leapDays(y, m);
        }
        if (y < 1900 || y > 2100 || d > _day) {
          return -1;
        }//参数合法性效验

        //计算农历的时间差
        var offset = 0;
        for (var i = 1900; i < y; i++) {
          offset += calendar.lYearDays(i);
        }
        var leap = 0, isAdd = false;
        for (var i = 1; i < m; i++) {
          leap = calendar.leapMonth(y);
          if (!isAdd) {//处理闰月
            if (leap <= i && leap > 0) {
              offset += calendar.leapDays(y);
              isAdd = true;
            }
          }
          offset += calendar.monthDays(y, i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if (isLeapMonth) {
          offset += day;
        }
        //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
        var calObj = new Date((offset + d - 31) * 86400000 + stmap);
        var cY = calObj.getUTCFullYear();
        var cM = calObj.getUTCMonth() + 1;
        var cD = calObj.getUTCDate();

        return calendar.solar2lunar(cY, cM, cD);
      }
    };

    return{
      solar2lunar:calendar.solar2lunar,
      lunar2solar:calendar.lunar2solar
    }



  })

;

angular.module('starter.services', [], ["$httpProvider", function ($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var param = function (obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

/*测试环境*/
  .constant('RequestUrl', 'http://192.168.3.179:999/')
  .constant('baseUrl', 'http://192.168.3.179:999/App.ashx?Name=EFOS.Master.Business.')

/*发布环境*/
  // .constant('RequestUrl', 'http://master.eegrid.com/')
  // .constant('baseUrl', 'http://master.eegrid.com/App.ashx?Name=EFOS.Master.Business.')

  .factory('AirInputData',function () {
  var inputData = function(){

  }

  return {inputData:inputData};
})

  .factory('HttpFactory', ["$http", "$ionicPopup", "$ionicLoading", function ($http, $ionicPopup, $ionicLoading) {
    var send = function (config) {
      !!config.scope && (config.scope.loading = true);
      !!config.mask && $ionicLoading.show({
        template: typeof config.mask == "boolean" ? '请稍等...' : config.mask
      });
      config.headers = {'Content-Type': 'application/x-www-form-urlencoded'};

      config.method == 'post' && (config.data = config.data || {});
      ionic.extend(config, {
        timeout: 15000
      });
      var http = $http(config);
      http.catch(function (error) {
        if (error.status == 0) {

        }
        else if (status == 403) {
          error.data = {
            template: '资源不可用'
          }
        } else {
          error.data = {
            template: '服务器太累了'
          }
        }
        $ionicPopup.alert({
          title: '错误',
          template: error.data.template,
          buttons: [
            {
              text: '确定',
              type: 'button-balanced'
            }
          ]
        });
      });
      http.finally(function () {
        !!config.scope && (config.scope.loading = false);
        !!config.mask && $ionicLoading.hide();
      });
      return http;
    };
    return {
      send: send
    }
  }])

  .factory('myNote', ["$ionicLoading", "$timeout", function ($ionicLoading, $timeout) {
    return {
      myNotice: function (msg, timeout, prev, post) {
        $ionicLoading.show({template: msg});
        $timeout(function () {
          prev && prev();
          $ionicLoading.hide();
          post && post();
        }, timeout || 1500);
        return false;
      },
      cancel: function () {
        $ionicLoading.hide();
      }
    }
  }])

  .factory('CacheFactory', ['$window', function ($window) {
    var save = function (key, value) {
      $window.localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value);
    };
    var get = function (key) {
      return $window.localStorage.getItem(key) || null;
    };
    var removeAll = function () {
      $window.localStorage.removeItem('phone');
      $window.localStorage.clear();
    };

    var deleteItem = function (key) {
      $window.localStorage.removeItem(key);
    };

    return {
      save: save,
      get: get,
      deleteItem: deleteItem,
      removeAll: removeAll
    };
  }])

  .factory('sendVerification',["$q", "$http", function ($q,$http) {

    //发送验证码
    function sendCode(phone)  {
      var def = $q.defer();
      if(IsTel(phone)){

        var CurTime = new Date().getTime();
        var Nonce = 'ws123';
        var sha = hex_sha1('6986838d56fd'+Nonce+CurTime);

        $http({
          url : 'https://api.netease.im/sms/sendcode.action',
          method:'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            'AppKey' : '9060757f46b0dad794f7ae5be5f52214',
            'CurTime': CurTime,
            'CheckSum': sha,
            'Nonce': Nonce
          },
          params:{
            mobile: phone,
            templateid: 3056170,
            codeLen: 4
          }
        }).success(function (data) {
          def.resolve(data);
        }).error(function (err) {
          console.log(err);
          def.resolve('error');
        });
      }else{
        def.resolve('notTel');
      }
      return def.promise;
    }


    //正则表达式验证手机号码
    function IsTel(Tel){
      var re = new RegExp(/^1[0-9]{10}$/);
      var retu = re.test(Tel);
      if(retu){
        return true;
      }else{
        return false;
      }
    }

    return{
      sendCode:sendCode
    }
}])



  .factory('chart', ['$rootScope', function ($rootScope) {

    function getInstance(id) {
      var node = document.getElementById(id);
      return node && (echarts.getInstanceByDom(node) || echarts.init(node));
    }

    // 环图
    return {
      showPie: function (id, data) {
        var element = getInstance(id);
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b} <br/>{c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              hoverOffset:5,
              type: 'pie',
              radius: ['60%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 24, name: '调光器', itemStyle: {normal: {color: "#FFCF54"}}},
                {value: 8, name: '消防', itemStyle: {normal: {color: "#FF7777"}}},
                {value: 74, name: '其它', itemStyle: {normal: {color: "#1fb5ff"}}},
              ]
            }
          ]
        };

        element.setOption(option, true);

      }

    }

  }])
;

/*  * A Javascript implementation of the Secure Hash Algorithm, SHA-1, as defined  * in FIPS PUB 180-1  * Version 2.1-BETA Copyright Paul Johnston 2000 - 2002.  * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet  * Distributed under the BSD License  * See http://pajhome.org.uk/crypt/md5 for details.  */
/*  * Configurable variables. You may need to tweak these to be compatible with  * the server-side, but the defaults work in most cases.  */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase     */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance  */
var chrsz = 8;
/* bits per input character. 8 - ASCII; 16 - Unicode    */
/*  * These are the functions you'll usually want to call  * They take string arguments and return either hex or base-64 encoded strings  */
function hex_sha1(s) {
  return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
  return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
  return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
  return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
  return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
  return binb2str(core_hmac_sha1(key, data));
}
/*  * Perform a simple self-test to see if the VM is working  */
function sha1_vm_test() {
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
/*  * Calculate the SHA-1 of an array of big-endian words, and a bit length  */
function core_sha1(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;
  var w = Array(80);
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  var e = -1009589776;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;
    for (var j = 0; j < 80; j++) {
      if (j < 16)
        w[j] = x[i + j];
      else
        w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);
}
/*  * Perform the appropriate triplet combination function for the current  * iteration  */
function sha1_ft(t, b, c, d) {
  if (t < 20)
    return (b & c) | ((~b) & d);
  if (t < 40)
    return b ^ c ^ d;
  if (t < 60)
    return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}
/*  * Determine the appropriate additive constant for the current iteration  */
function sha1_kt(t) {
  return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}
/*  * Calculate the HMAC-SHA1 of a key and some data  */
function core_hmac_sha1(key, data) {
  var bkey = str2binb(key);
  if (bkey.length > 16)
    bkey = core_sha1(bkey, key.length * chrsz);
  var ipad = Array(16)
    , opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}
/*  * Add integers, wrapping at 2^32. This uses 16-bit operations internally  * to work around bugs in some JS interpreters.  */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
/*  * Bitwise rotate a 32-bit number to the left.  */
function rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}
/*  * Convert an 8-bit or 16-bit string to an array of big-endian words  * In 8-bit function, characters >255 have their hi-byte silently ignored.  */
function str2binb(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
  return bin;
}
/*  * Convert an array of big-endian words to a string  */
function binb2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & mask);
  return str;
}
/*  * Convert an array of big-endian words to a hex string.  */
function binb2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
  }
  return str;
}
/*  * Convert an array of big-endian words to a base-64 string  */
function binb2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32)
        str += b64pad;
      else
        str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
    }
  }
  return str;
}

/**
 * Created by ws on 2017/4/1.
 */
angular.module('starter.services')
  .service('declareServ',["HttpFactory", "$q", "baseUrl", function (HttpFactory,$q,baseUrl) {

    //是否已经注册
    function isRegister(OpenId) {
      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.IsRegistered',
        method:'post',
        data:{
          OpenId:OpenId
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });
      return def.promise;
    }

    //发验证码
    function sendValidate( Phone) {

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.ValidatePhone',
        method:'post',
        data:{
          Phone: Phone
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //未注册注册
    function register(OpenId,Phone,code) {
      var def = $q.defer();

      HttpFactory.send({
        url: baseUrl + 'WeChatProjectApplyBLL.Registered',
        method : 'post',
        data : {
          OpenId : OpenId,
          Phone : Phone,
          ValidCode : code
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });
      return def.promise;
    }

    //获取项目
    function getProjects(UserID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetProjects',
        method: 'post',
        data : {
          UserID:UserID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //设置密码
    function updatePassword(UserID,Password) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.UpdatePassword',
        method: 'post',
        data : {
          UserID:UserID,
          Password : Password
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });

      return def.promise;
    }

    //获取项目类型--平台
    function getPlatforms() {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetPlatforms',
        method: 'post',
        data : {}
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //新增或修改项目信息
    function addOrUpdateProject(project,UserID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.AddOrUpdateProject',
        method: 'post',
        data : {
          project :  angular.toJson(project),
          UserID : UserID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //获取项目系统和房间信息
    function getSystemRoomInfos(projectCode) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetSystemRoomInfos',
        method: 'post',
        data : {
          projectCode : projectCode
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }


    //获取房间信息
    function getRooms(projectCode,SystemCode) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetRooms',
        method: 'post',
        data : {
          projectCode : projectCode,
          SystemCode : SystemCode
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //保存房间信息
    function addOrUpdateRooms(projectCode,rooms,sysCode) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.AddOrUpdateRooms',
        method: 'post',
        data : {
          projectCode : projectCode,
          rooms : angular.toJson(rooms),
          SystemCode:sysCode
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });

      return def.promise;
    }

    //获取设备类型及其设备信息
    function getDeviceTypeDeviceInfos(projectCode,RoomID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetDeviceTypeDeviceInfos',
        method: 'post',
        data : {
          projectCode : projectCode,
          RoomID : RoomID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }

    //获取设备类型下设备信息
    function getDevices(projectCode,DeviceType,roomID) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.GetDevices',
        method: 'post',
        data : {
          projectCode : projectCode,
          DeviceType : DeviceType,
          RoomID : roomID
        }
      }).success(function (data) {
        def.resolve(data.data);
      }).error(function (data) {
        def.resolve(data.data);
      });

      return def.promise;
    }


    //保存设备信息
    function addOrUpdateDevices(projectCode,devices,roomID,deviceType) {

      var def = $q.defer();

      HttpFactory.send({
        url:  baseUrl + 'WeChatProjectApplyBLL.AddOrUpdateDevices',
        method: 'post',
        data : {
          projectCode : projectCode,
          devices : angular.toJson(devices),
          RoomID : roomID,
          DeviceType : deviceType
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });

      return def.promise;
    }

    return{
      isRegister : isRegister,
      register : register,
      getProjects : getProjects,
      updatePassword : updatePassword,
      getPlatforms : getPlatforms,
      addOrUpdateProject : addOrUpdateProject,
      getSystemRoomInfos : getSystemRoomInfos,
      getRooms : getRooms,
      addOrUpdateRooms : addOrUpdateRooms,
      getDeviceTypeDeviceInfos :getDeviceTypeDeviceInfos,
      getDevices : getDevices,
      addOrUpdateDevices : addOrUpdateDevices,
      sendValidate : sendValidate
    }

  }]);

/**
 * Created by ws on 2017/3/30.
 */
angular.module('starter.controllers')

  .controller('myProjectCtrl', ["$scope", "$state", "CacheFactory", "declareServ", "$ionicHistory", function($scope,$state,CacheFactory,declareServ,$ionicHistory) {

    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    $scope.isSetPassword = CacheFactory.get('IsSetPwd');

    var UserID = CacheFactory.get('UserID');
    declareServ.getProjects(UserID).then(function (data) {
      console.log(data);
      $scope.dataList = data;
    });


    var height = document.getElementById('addDiv').clientWidth +2+ 'px';
    $scope.grid_height = {height:height};


    $scope.addProject = function () {
      console.log('add project');
      $state.go('addProject');
    };

    $scope.setProject = function (data) {
      console.log('set project');
      $state.go('systemList',{'ProjectCode' : data.ProjectCode});
    };

    $scope.setPassword = function () {
      console.log('set password');
      $state.go('setPassword');
    };

    $scope.operateProject = function(){

    }


  }])

  .controller('setPasswordCtrl',["$scope", "CacheFactory", "$state", "myNote", "$ionicHistory", "declareServ", function ($scope,CacheFactory,$state,myNote,$ionicHistory,declareServ) {

    var userID = CacheFactory.get('UserID');


    $scope.user ={
      phone: CacheFactory.get('phone'),
      password : '',
      checkPassword :''
    };

    $scope.finishPasswordSet = function () {
      if(!$scope.user.password){
        myNote.myNotice('密码不能为空');
      }else if($scope.user.password != $scope.user.checkPassword){
        myNote.myNotice('密码输入不一致，请重新输入');
        $scope.user.password = '';
        $scope.user.checkPassword = '';
      }else{
        declareServ.updatePassword(userID,$scope.user.password).then(function (data) {
          if(!!data) {
            CacheFactory.save('IsSetPwd', true);
            $ionicHistory.goBack(-1);
          }else{
            myNote.myNotice('密码设置失败，请重新设置');
          }
        });
      }
    };

  }])



  .controller('addProjectCtrl',["$scope", "CacheFactory", "$state", "myNote", "$ionicHistory", "declareServ", function ($scope,CacheFactory,$state,myNote,$ionicHistory,declareServ) {


    declareServ.getPlatforms().then(function (data) {
      console.log(data);
      $scope.dataList = data;

      $scope.project = {
        ProjectName : '',
        Address :'南山区嘉达研发大楼',
        PlatformCode : $scope.dataList[0].PlatformCode
      };
    });


    $scope.finishAdd = function () {
      //数据库成功过添加后返回到我的项目界面
      declareServ.addOrUpdateProject($scope.project,CacheFactory.get('UserID')).then(function (data) {
        console.log(data);
        if(!!data.Flag) {
          $ionicHistory.goBack(-1);
        }
      });
    }

  }])



  .controller('systemListCtrl',["$scope", "CacheFactory", "$state", "myNote", "$ionicHistory", "$stateParams", "declareServ", function ($scope,CacheFactory,$state,myNote,$ionicHistory,$stateParams,declareServ){

    var PCode = $stateParams.ProjectCode;


    declareServ.getSystemRoomInfos(PCode).then(function (data) {
      console.log(data);
      $scope.dataList = data;

      var height = document.getElementById('page').clientWidth/4 + 'px';
      $scope.grid_style = {height:height};

      for(var k = 0;k< $scope.dataList.length;k++) {
        if ($scope.dataList[k].ListInfos.length > 0) {
          var len = $scope.dataList[k].ListInfos.length % 4;
          if (len == 0) {
            len = 4;
          }
          var index = $scope.dataList[k].ListInfos.length - 1;
          for (var i = 0; i < len; i++) {
            $scope.dataList[k].ListInfos[index].IsSpecialContent = true;
            index--;
          }
        }
      }

    });



    $scope.addRoom = function (data) {

      console.log('go添加房间界面');
      $state.go('addRoom',{'RoomName' : data.RoomName,'SystemCode' :data.SystemCode,'projectCode' : PCode,'SystemName':data.SystemName});

    };

    $scope.addDevice = function (room) {
      console.log('go设备类型列表界面');
      $state.go('deviceList',{'RoomID':room.RoomID,'ProjectCode':PCode,'RoomName':room.RoomName});
    };

  }])


  .controller('deviceListCtrl',["$scope", "CacheFactory", "$state", "myNote", "declareServ", "$stateParams", function ($scope,CacheFactory,$state,myNote,declareServ,$stateParams){

    var PCode = $stateParams.ProjectCode;
    var roomID = $stateParams.RoomID;
    var roomName = $stateParams.RoomName;

    declareServ.getDeviceTypeDeviceInfos(PCode,roomID).then(function (data) {
      console.log(data);
      $scope.dataList = data;

      var height = document.getElementById('page').clientWidth/4 + 'px';
      $scope.grid_style = {height:height};

      for(var k = 0;k< $scope.dataList.length;k++) {
        if ($scope.dataList[k].ListInfos.length > 0) {
          var len = $scope.dataList[k].ListInfos.length % 4;
          if (len == 0) {
            len = 4;
          }
          var index = $scope.dataList[k].ListInfos.length - 1;
          for (var i = 0; i < len; i++) {
            $scope.dataList[k].ListInfos[index].IsSpecialContent = true;
            index--;
          }
        }
      }
    });


    //增加设备
    $scope.addRoom = function (data) {
      console.log(data);
      $state.go('addDevice',{'projectCode': PCode,'DeviceType':data.DeviceType,'TypeName':data.TypeName,'RoomID':roomID});
    };

    $scope.addDevice = function () {
      console.log('此处是尽头');
    }

  }])


  .controller('addRoomCtrl',["$scope", "$ionicHistory", "myNote", "$stateParams", "declareServ", function ($scope,$ionicHistory,myNote,$stateParams,declareServ){

    var PCode =  $stateParams.projectCode;
    var sysCode = $stateParams.SystemCode;
    var symbolName = $stateParams.RoomName;
    var systemName = $stateParams.SystemName;

    declareServ.getRooms(PCode,sysCode).then(function (data) {
      console.log(data);
      $scope.dataList = data;
    });


    $scope.deleteItem =function (index) {
      $scope.dataList.splice(index,1);
    };

    $scope.addItem = function () {
      $scope.dataList = addItem($scope.dataList);
      console.log($scope.dataList);
    };

    $scope.finishAdd = function () {
      var valid = true;
      for(var i = 0;i<$scope.dataList.length;i++){
        if($scope.dataList[i].RoomName == '')
          valid = false;
      }
      if(valid) {
        declareServ.addOrUpdateRooms(PCode, $scope.dataList, sysCode).then(function (data) {
          console.log(data);
          if (!!data) {
            $ionicHistory.goBack(-1);
          } else {
            myNote.myNotice('添加房间失败', 2000);
          }
        });
      }else{
        myNote.myNotice('房间名不能为空');
      }
    };

    //增加行
    function addItem(arr) {
      var newItem = {
        RoomID : 0,
        RoomName : '1#' + (symbolName || '房'),
        SystemCode : sysCode
      };

      if(arr.length != 0) {
        var a = arr[arr.length - 1].RoomName.split('#');
        if (a.length == 2) {
          newItem.RoomName = parseInt(a[0]) + 1 + "#" + trim(a[1]);
          arr.push(newItem);
        }else if(a.length == 1){
          newItem.RoomName = 1 + "#" + trim(a[0]);
          arr.push(newItem);
        } else {
          myNote.myNotice('请输入正确的格式，房号#房间类型', 3000);
        }
      }else{
        arr.push(newItem);
      }

      return arr;
    }

    //删除左右两端的空格
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }

  }])


  .controller('addDeviceCtrl',["$scope", "$state", "myNote", "declareServ", "$stateParams", "$ionicHistory", function ($scope,$state,myNote,declareServ,$stateParams,$ionicHistory){

    var PCode = $stateParams.projectCode;
    var deviceType = $stateParams.DeviceType;
    var typeName = $stateParams.TypeName;
    var roomID = $stateParams.RoomID;

    declareServ.getDevices(PCode,deviceType,roomID).then(function (data) {
      console.log(data);
      $scope.dataList = data;
    });

    $scope.deleteItem =function (index) {
      $scope.dataList.splice(index,1);
    };


    $scope.addItem = function () {
      $scope.dataList = addItem($scope.dataList);
      console.log($scope.dataList);
    };

    $scope.finishAdd = function () {
      declareServ.addOrUpdateDevices(PCode,$scope.dataList,roomID,deviceType).then(function (data) {
        console.log(data);
        if(!!data){
          $ionicHistory.goBack(-1);
        }else{
          myNote.myNotice('添加设备失败',2000);
        }
      });

    };

    function addItem(arr) {
      var newItem = {
        DeviceID  : 0,
        DeviceName  : '1#' + (typeName || '设备'),
        DeviceType  : deviceType,
        RoomID : roomID,
        IsDisplay : 'true',
        IsImportant : 'false',
        Sort : 0
      };

      if(arr.length != 0) {
        var a = arr[arr.length - 1].DeviceName.split('#');
        if (a.length == 2) {
          newItem.DeviceName = parseInt(a[0]) + 1 + "#" + trim(a[1]);
          arr.push(newItem);
        }else if(a.length == 1){
          newItem.DeviceName = 1 + "#" + trim(a[0]);
          arr.push(newItem);
        } else {
          myNote.myNotice('请输入正确的格式，设备号#设备类型', 3000);
        }
      }else{
        arr.push(newItem);
      }

      return arr;
    }

    //删除左右两端的空格
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }

  }])

;

/**
 * Created by ws on 2017/3/30.
 */
angular.module('starter.controllers')
  .controller('registerCtrl', ["$scope", "$ionicModal", "myNote", "sendVerification", "$state", "CacheFactory", "declareServ", function($scope,$ionicModal,myNote,sendVerification,$state,CacheFactory,declareServ) {

    $scope.isRegister = false;

    //todo: 获取openId
    var openId = 'CShame4';

    declareServ.isRegister(openId).then(function (data) {
      console.log(data);
      if(!!data.Flag){
        CacheFactory.save('UserID',data.UserID);
        CacheFactory.save('phone',data.Phone);
       $state.go('myProject');
      }else{
        $scope.isRegister = true;
      }
    });

    $scope.phone = {
      telNumber : null
    };


    $scope.resetPhone = function () {
      console.log($scope.phone.telNumber);
      $scope.phone.telNumber = "";
    };


    //打开模型;
    $scope.openModal = function (url){
      if(IsTel($scope.phone.telNumber)) {
        $ionicModal.fromTemplateUrl(
          url,
          {
            scope: $scope,
            animation: 'fade-in'
          }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }else{
        myNote.myNotice('请输入合法的电话号码',2000);
        $scope.resetPhone();
      }
    };

    //关闭模型
    $scope.cancel = function () {
      $scope.modal.hide();
      $scope.modal.remove();
    };

    //确认发送验证码
    $scope.ok = function () {
      //关闭模型
      $scope.cancel();
      //发送验证码
      if(IsTel($scope.phone.telNumber)) {
        if (openId != '') {
          $state.go('verification', { 'phone': $scope.phone.telNumber, 'openId': openId });
        } else {
          myNote.myNotice('请检查您的网络');
        }
      }else{
        myNote.myNotice('请输入合法的电话号码',2000);
      }
    };

    //正则表达式验证手机号码
    function IsTel(Tel){
      var re = new RegExp(/^1[0-9]{10}$/);
      var retu = re.test(Tel);
      if(retu){
        return true;
      }else{
        return false;
      }
    }

  }]);

/**
 * Created by ws on 2017/3/30.
 */
angular.module('starter.controllers')

  .controller('verificationCtrl', ["$scope", "$ionicModal", "myNote", "sendVerification", "$stateParams", "$state", "declareServ", "CacheFactory", function($scope,$ionicModal,myNote,sendVerification,$stateParams,$state,declareServ,CacheFactory) {

    $scope.getCode = true;

    $scope.user = {
      telNumber :$stateParams.phone,
      code : null
    };

    var openId = $stateParams.openId;

    //进页面就发验证码
    // declareServ.sendValidate($scope.user.telNumber).then(function (data) {
    //   console.log(data);
    // });

    //开始计时60s
    startClock(10);

    //重置验证码
    $scope.resetCode = function () {
      console.log($scope.user.code);
      $scope.user.code = "";
    };

    //打开模型
    $scope.openModal = function (url){
      $ionicModal.fromTemplateUrl(
        url,
        {
          scope: $scope,
          animation: 'fade-in'
        }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    //关闭模型
    $scope.cancel = function () {
      $scope.modal.remove();
    };

    /*======================定时器======================*/
    var count = 0;
    var interval = [];
     interval[count] = setInterval(function () {
      $scope.$apply(updateClock);
      console.log($scope.clock);
    }, 1000);

    function updateClock() {
      $scope.clock --;
      if( $scope.clock <= 0){
        clearInterval(interval[count]);
        $scope.getCode = false;
      }
    }

    function startClock(time) {
      $scope.clock =time;
      updateClock();
    }

    /*===============================================*/



    //提交
    $scope.finishVerified = function () {
      declareServ.register(openId,$scope.user.telNumber,$scope.user.code).then(function (data) {
        console.log(data);
        if(data.Flag == true){
          CacheFactory.save('UserID',data.UserID);
          $state.go('myProject');
        }else if(data.Msg && data.Msg <= '0'){
          myNote.myNotice('验证码错误',2000);
          clearInterval(interval[count]);
          $scope.getCode = false;
          $scope.resetCode();
        }else{
          myNote.myNotice('注册出错，请检查你的网络',2000);
          clearInterval(interval[count]);
          $scope.getCode = false;
        }
      });
    };


    //重新发送验证码
    $scope.reSendCode = function () {
      count++;
      interval[count] = setInterval(function () {
        $scope.$apply(updateClock);
        console.log($scope.clock);
      }, 1000);
      startClock(10);
      $scope.getCode = true;
      // declareServ.sendValidate($scope.user.telNumber).then(function (data) {
      //   if(!!data) {
      //     //开始计时60s
      //     var interval = setInterval(function () {
      //       $scope.$apply(updateClock);
      //       console.log($scope.clock);
      //     }, 1000);
      //     startClock(60);
      //     $scope.getCode = true;
      //   }else{
      //     myNote.myNotice('验证码发送失败，请重新发送');
      //   }
      // });
    };


    //离开本界面的时候停止计时器
    $scope.$on('$destroy', function () {
      console.log('离开了');
      if(angular.isDefined(interval)) {
        clearInterval(interval);
      }
    });
  }]);

/**
 * Created by ws on 2017/8/23.
 */
angular.module('starter.controllers')

  .controller('projectDataCtrl', ["$scope", "$state", "CacheFactory", "$ionicHistory", function($scope,$state,CacheFactory,$ionicHistory) {
    $scope.goNext = function (id) {
      switch (id) {
        case 1:
          $state.go('tab.architecture');
              break;
        case 2:
          $state.go('tab.wuguan');
          break;
      }
    }
  }])


  .controller('architectureCtrl', ["$scope", "$state", "$timeout", "projDataServ", function($scope,$state,$timeout,projDataServ) {

    //楼龄参数值'BulidAge'
    //建筑类型参数值'BulidType'


    $scope.isShowBuilderList = false;

    $scope.architecture = {
      ProjectCode : 7, //项目id
      Address: '',         //位置
      Acreage: null,       //建筑面积
      BulidAge:null,       //楼龄
      BulidCount:null,     //楼栋数
      CompanyName:'',       //开发商名称
      BulidType:'',         //建筑类型
      HouseCount:null       //户数
    };

    $scope.LayoutImage = null;

    projDataServ.getProjectBulidInfo($scope.architecture.ProjectCode).then(function (data) {
      console.log(data.data);
      $scope.architecture.Address = data.data.Address;
      $scope.architecture.Acreage = data.data.Acreage;
      $scope.architecture.BulidAge = data.data.BulidAge;
      $scope.architecture.BulidCount = data.data.BulidCount;
      $scope.architecture.CompanyName = data.data.CompanyName;
      $scope.architecture.BulidType = data.data.BulidType;
      $scope.architecture.HouseCount = data.data.HouseCount;
    });


    $scope.BuliderList = [];

    //请求所有开发商数据并存在服务中以便后面的模糊查询
    projDataServ.getAllBulider().then(function (data) {
      $scope.BuliderList = data.data;
      console.log($scope.BuliderList );
    });


    $scope.buildingAge = {
      list: [],
      title: "请选择楼龄"
    };
    //获取楼龄列表
    projDataServ.getDimensionByCode('BulidAge').then(function (data) {
      console.log(data.data);
      $scope.buildingAge.list = data.data;
      $scope.buildingAge.value = $scope.architecture.BulidAge;
    });



    $scope.buildType = {
      list: [],
      title: "请选择建筑类型"
    };
    //获取建筑类型列表
    projDataServ.getDimensionByCode('BulidType').then(function (data) {
      console.log(data.data);
      $scope.buildType.list = data.data;
      $scope.buildType.value = $scope.architecture.BulidType;

    });


    $scope.getBuilderList = function () {
      $scope.isShowBuilderList = true;
    };

    $scope.getBuilder = function (data) {
      console.log(data);
      $scope.architecture.CompanyName = data.CompanyName;
      $scope.isShowBuilderList = false;
    };

    $scope.closeBuilderList = function () {
      $scope.isShowBuilderList = false;
    };



    $scope.submitArchitectureData = function () {
      $scope.architecture.BulidAge = $scope.buildingAge.value;
      $scope.architecture.BulidType = $scope.buildType.value;

      console.log($scope.architecture);
      console.log($scope.LayoutImage);

      projDataServ.saveProjectBulidInfo($scope.architecture,$scope.LayoutImage).then(function (data) {
        console.log(data);
      })

    };



    $scope.chooseFile = function() {
       $timeout(function () {
         document.getElementById('uploadImg').click();
       });
    };


    /*---------------------------------------------------------------*/
    $scope.reader = new FileReader();   //创建一个FileReader接口

    //提交图片的函数
    $scope.img_upload = function(files) {
      $scope.thumb = {};      //用于存放图片的base64
      $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
      $scope.reader.onload = function(ev) {
        $scope.$apply(function(){
          $scope.thumb.imgSrc = ev.target.result;
        });
      };

      //todo:上传图片到服务端
      $scope.LayoutImage = files[0];
      // var data = new FormData();      //以下为像后台提交图片数据
      // data.append('image', files[0]);
      // data.append('guid',$scope.guid);
      // $http({
      //   method: 'post',
      //   url: '/comm/test-upload.php?action=success',
      //   data:data,
      //   headers: {'Content-Type': undefined},
      //   transformRequest: angular.identity
      // }).success(function(data) {
      //   if (data.result_code == 'SUCCESS') {
      //     $scope.form.image[data.guid] = data.result_value;
      //     $scope.thumb[data.guid].status = 'SUCCESS';
      //     console.log($scope.form)
      //   }
      //   if(data.result_code == 'FAIL'){
      //     console.log(data)
      //   }
      // })
    };




  }])


  .controller('wuguanCtrl',["$scope", "projDataServ", function ($scope,projDataServ) {

    $scope.isShowCompanyList = false;

    $scope.CompanyList = [];

    $scope.wuguan = {
      ProjectCode:7,
      CompanyName : '',
      PowerFee:'',
      PropertyFee:'',
      WaterFee:''
    };

    projDataServ.getPropertyManaInfo($scope.wuguan.ProjectCode).then(function (data) {
      console.log(data.data);
      $scope.wuguan.ProjectCode = data.data.ProjectCode;
      $scope.wuguan.CompanyName = data.data.CompanyName;
      $scope.wuguan.PowerFee = data.data.PowerFee;
      $scope.wuguan.PropertyFee = data.data.PropertyFee;
      $scope.wuguan.WaterFee = data.data.WaterFee;
    });


    projDataServ.getPropertyMana().then(function (data) {
      console.log(data.data);
      $scope.CompanyList = data.data;
    });

    $scope.getWuguanCompanyList = function () {
      $scope.isShowCompanyList = true;
    };

    $scope.getCompany = function (data) {
      console.log(data);
      $scope.wuguan.CompanyName = data.CompanyName;
    };

    $scope.closeCompanyList = function () {
      $scope.isShowCompanyList = false;
    };

    $scope.submitData = function () {
      console.log($scope.wuguan);
      projDataServ.savePropertyManaInfo($scope.wuguan).then(function (data) {
        console.log(data);
      })
    }
  }])
;


/**
 * Created by ws on 2017/8/24.
 */
angular.module('starter.services')
  .factory('projDataServ',["HttpFactory", "$q", "baseUrl", function (HttpFactory,$q,baseUrl) {

    //获取项目初始化信息
    function getProjectBulidInfo(pcode){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetProjectBulidInfo',
        method:'post',
        data:{
          ProjectCode:pcode
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取开发商下拉列表
    function getAllBulider(){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetDeveloper',
        method:'post'
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取建筑类型下拉列表
    function getDimensionByCode(Code){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetDimensionByCode',
        method:'post',
        data:{
          Code:Code
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取物管公司下拉列表
    function getPropertyMana(){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetPropertyMana',
        method:'post'
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //保存项目建筑信息
    function saveProjectBulidInfo(model,LayoutImage){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.SaveProjectBulidInfo',
        method:'post',
        data:{
          model:angular.toJson(model),
          LayoutImage:angular.toJson(LayoutImage)
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //获取物管信息
    function getPropertyManaInfo(ProjectCode){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.GetPropertyManaInfo',
        method:'post',
        data:{
          ProjectCode:ProjectCode
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }

    //保存物管信息
    function savePropertyManaInfo(model){

      var def = $q.defer();
      HttpFactory.send({
        url:  baseUrl + 'ProjectInfoBLL.SavePropertyManaInfo',
        method:'post',
        data:{
          model:angular.toJson(model)
        }
      }).success(function (data) {
        def.resolve(data);
      }).error(function (data) {
        def.resolve(data);
      });
      return def.promise;
    }



    return {
      getAllBulider:getAllBulider,
      getProjectBulidInfo:getProjectBulidInfo,
      getDimensionByCode:getDimensionByCode,
      getPropertyMana:getPropertyMana,
      saveProjectBulidInfo:saveProjectBulidInfo,
      getPropertyManaInfo:getPropertyManaInfo,
      savePropertyManaInfo:savePropertyManaInfo
    }


  }]);

/**
 * Created by Administrator on 2018/8/8.
 */
/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('geoLocationCtrl', ["$scope", "$interval", function ($scope,$interval) {

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

  }]);

/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('baseSelectCtrl', ["$scope", function ($scope) {

    $scope.options2 = {
      title: '请选择',
      list: [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}, {name: 'test4'}, {name: 'test5'}, {name: 'test6'}, {name: 'test7'}],
      attrName: 'name'
    };


  }]);

//# sourceMappingURL=all.js.map
