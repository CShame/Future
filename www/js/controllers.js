angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $state, $ionicScrollDelegate, $timeout) {

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

    function run() {
      new Marquee({
        ID: "m1",
        Direction: "top",
        Step: 1,
        Width: 300,
        Height: 20,
        Timer: 100,
        DelayTime: 2000,
        WaitTime: 10000,
        ScrollStep: 20
      });
    }

    $timeout(function () {
      run();
    }, 2000);

    $timeout(function () {
      // run();
      $scope.dataList = [10000];
    }, 1000);


    $scope.recordTitle = '按住录音';


    function getRecord(src,step) {
      var mediaRec = new Media(src,
        // success callback
        function () {
          console.log("recordAudio():Audio Success",'---'+step);
        },
        // error callback
        function (err) {
          console.log("recordAudio():Audio Error: " + err.code,'---'+step);
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
          if(mediaRec){
            mediaRec.stopRecord();
            mediaRec.release();
          }
        },0)
      };

    //停止录音并取消录音
    $scope.cancelRecord = function ($event) {
      console.log('触发向上滑',$event);

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
      if(mediaRec){
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
      title:'请选择原因',
      list:[{value:1,Remark:'道行不够'},{value:2,Remark:'材料不齐'},{value:3,Remark:'缺材料'},{value:4,Remark:'其它'}],
      attrName:'Remark'
    };
    $scope.btnOk = function () {
      console.log('点击成OK',$scope.options3);
    }
  })

  .controller('ChatsCtrl', function ($scope,$interval, $timeout,chart) {

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
      step:1,
      timer:18
    };
    $scope.isChange = false;

    $scope.changeCallback = function () {
      $scope.isChange = false;
      console.log("变化完成后",$scope.isChange);
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
    },5000);


    chart.showPie("airportPie");


  $timeout(function () {
    $scope.percentList = [{p:80,title:'保养',title1:'已完成',title2:'未完成',data1:'80',data2:'100',unit:'个'},
      {p:80,title:'保养',title1:'已完成',title2:'未完成',data1:'70',data2:'100',unit:'个'},
      {p:70,title:'保养',title1:'已完成',title2:'未完成',data1:'80',data2:'80',unit:'个'},
      {p:60,title:'保养',title1:'已完成',title2:'未完成',data1:'20',data2:'90',unit:'个'},
      {p:50,title:'保养',title1:'已完成',title2:'未完成',data1:'10',data2:'100',unit:'个'},
      {p:40,title:'保养',title1:'已完成',title2:'未完成',data1:'20',data2:'20',unit:'个'},
      {p:30,title:'保养',title1:'已完成',title2:'未完成',data1:'30',data2:'30',unit:'个'},
      {p:20,title:'保养',title1:'已完成',title2:'未完成',data1:'40',data2:'50',unit:'个'}
    ];
    $scope.percent = 50;
  },1000);


    $scope.barList = [
      {name:'切换',data:'10',per:83.3},
      {name:'掉电',data:'6',per:50},
      {name:'外场开路',data:'4',per:33.3},
      {name:'过流',data:'2',per:16.7},
    ]

    $scope.maxY = 12;



  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope, $rootScope, $ionicModal, $http, myNote, $state, $interval) {


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
  })
;
