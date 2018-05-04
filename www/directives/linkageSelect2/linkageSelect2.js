/**
 * Created by ws on 2018/3/27.
 */
angular.module('starter.controllers')
  .service('linkageSelect2Service', [function () {
    var _this = this;
    //页面中选择器数量 default : 0
    _this.globalId = 0;
    return _this;
  }])

  .directive('linkageSelect2', ['$timeout', '$ionicScrollDelegate', 'linkageSelect2Service', '$ionicModal',
    function ($timeout, $ionicScrollDelegate, linkageSelect2Service, $ionicModal) {

    return {
      restrict: 'E',
      templateUrl: 'directives/linkageSelect2/page.html',
      scope: {
        options: "=",
        callback: "&"
      },
      link: function (scope) {

        scope.globalId = ++linkageSelect2Service.globalId;
        // scope.showData = '全部 全部';

        scope.levelOneList = [];
        scope.levelTwoList = [];

        scope.levelOneTimer = null; //一级滑动定时器
        scope.levelTwoTimer = null; //二级滑动定时器

        var posi;          //实时滚动位置
        var lastTimePosi;  //上一次位置

        scope.$watch('options.list', function (newV) {
          if (newV && scope.options.list.length > 0) {
            scope.levelOneList = scope.options.list;
            init();
          }
        });

        /*-------------------------------------------------------*/
        //打开模型
        scope.openModal = function () {
          if (scope.modal) {
            scope.modal.show();
          } else {
            $ionicModal.fromTemplateUrl(
              'directives/linkageSelect2/modal.html',
              {
                scope: scope,
                animation: 'fade-in'
              }).then(function (modal) {
              scope.modal = modal;
              scope.modal.show();
            });
          }
        };

        scope.cancelModal = function () {
          scope.modal.hide();
        };

        //确定
        scope.submitValue = function () {
          scope.showData = scope.levelOneValue.NodeText + ' ' + scope.levelTwoValue.NodeText;
          scope.options.selectedValues = [];
          scope.options.selectedValues.push(scope.levelOneValue);
          scope.options.selectedValues.push(scope.levelTwoValue);
          scope.modal.hide();
        };
        /*-------------------------------------------------------*/


        function init() {
          initLevelOne();
          initLevelTwo();
          scope.showData = scope.levelOneValue.NodeText + ' ' + scope.levelTwoValue.NodeText;
        }


        //初始化一级
        function initLevelOne() {
          insertBlankData(scope.levelOneList);
          scope.levelOneValue = scope.levelOneList[2];
          scope.levelOneValue.selected = true;
          scope.levelOneIndex = 2;
        }

        //初始化二级
        function initLevelTwo() {
          if (scope.levelOneValue.Children) {
            scope.levelTwoList = scope.levelOneValue.Children;
            insertBlankData(scope.levelTwoList);
            scope.levelTwoValue = scope.levelOneValue.Children[2];
          } else {
            scope.levelTwoList = [];
            insertBlankData(scope.levelTwoList);
            scope.levelTwoValue = scope.levelTwoList[2];
          }
          scope.levelTwoValue.selected = true;
          scope.levelTwoIndex = 2;
        }


        //滚动触发事件
        scope.scrollingEvent = function (type) {
          var opEntity = getOperateEntity(type);
          var index;
          if (scope[opEntity.scrollTimer]) {
            $timeout.cancel(scope[opEntity.scrollTimer]);
          }
          if (posi) { lastTimePosi = posi; }

          posi = $ionicScrollDelegate.$getByHandle(opEntity.scrollHandler).getScrollPosition();

          if(lastTimePosi) {
            if (posi.top > lastTimePosi.top) {
              index = Math.abs(Math.ceil(posi.top / 30));
            } else if (posi.top <= lastTimePosi.top) {
              index = parseInt(posi.top / 30);
            }
          }
          if (posi.top == index * 30) {
            updateSelect(index + 2, type);
          } else {
            scope[opEntity.scrollTimer] = $timeout(function () {
              posi.top = index * 30;
              updateSelect(index + 2, type);
              scrollToPosi($ionicScrollDelegate.$getByHandle(opEntity.scrollHandler), posi);
            }, 200);
          }
        };


        //点击Event
        scope.selectEvent = function (type, index) {
          var opEntity = getOperateEntity(type);
          var nowPosi = {};
          if(index < 2 || index >= scope[opEntity.data].length -2){
            return;
          }
          nowPosi.top = (index -2) * 30;
          nowPosi.left = 0;
          updateSelect(index, type);
          scrollToPosi($ionicScrollDelegate.$getByHandle(opEntity.scrollHandler), nowPosi);
        };

        //获取滚动条详细数据
        function getOperateEntity(type) {
          var entity = new Object();

          switch (type) {
            case 'levelOne':
              entity.scrollTimer = 'levelOneTimer';
              entity.type = type;
              entity.scrollHandler = 'levelOneScroll_' + scope.globalId;
              entity.data = 'levelOneList';
              break;
            case 'levelTwo':
              entity.scrollTimer = 'levelTwoTimer';
              entity.type = type;
              entity.scrollHandler = 'levelTwoScroll_' + scope.globalId;
              entity.data = 'levelTwoList';
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
                scope.levelOneValue.selected = false;
                scope.levelOneList[index].selected = true;
                scope.levelOneIndex = index;
                scope.levelOneValue = scope.levelOneList[index];
              });
              break;
            case "levelTwo":
              //强制
              $timeout(function () {
                scope.levelTwoValue.selected = false;
                scope.levelTwoList[index].selected = true;
                scope.levelTwoIndex = index;
                scope.levelTwoValue = scope.levelTwoList[index];
              });
              break;
          }
        }

        scope.$watch('levelOneIndex', function (newV, oldV) {
          if (newV != oldV) {
              scope.levelTwoList = scope.levelOneList[newV].Children;
            initLevelTwo();
            scope.levelTwoValue.selected = false;
            scope.levelTwoIndex = 2;
            scope.levelTwoValue = scope.levelTwoList[2];
            scope.levelTwoValue.selected = true;
            scrollToPosi($ionicScrollDelegate.$getByHandle('levelTwoScroll_' + scope.globalId), {top:0,left:0});
          }
        });

        //在数据列表前后插入俩个空数据
        function insertBlankData(arr) {
          if (arr[0] == '' && arr[1] == '') {
            return;
          } else {
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

      }
    }

  }]);
