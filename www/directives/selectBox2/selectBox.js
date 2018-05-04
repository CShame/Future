/**
 * Created by ws on 2017/2/17.
 */
angular.module('starter.controllers')
  .directive('selectBox2',['$ionicModal','$ionicScrollDelegate',function ($ionicModal,$ionicScrollDelegate) {
    return {
      restrict : 'E',
      templateUrl : 'directives/selectBox2/selectBox2.html',
      scope: {
        options: "="
        // attrName : "="
      },
      link : function (scope) {

        scope.$watch('options',function (newV) {
          if(newV) {
            if(!!scope.options.value){
              scope.options.index = getIndex(scope.options.list,scope.options.value);
            }
            if(!scope.options.index){
              scope.options.index = 0;
            }
            if (scope.options.attrName) {
              scope.seletedFont = scope.options.list[scope.options.index][scope.options.attrName];
            } else {
              scope.seletedFont = scope.options.list[scope.options.index];
            }
            scope.selectId = scope.options.index;
          }
        });

        scope.seletedItem = function (index) {
          scope.selectId = index;
          scope.options.index = index;
          scope.options.value =  scope.options.list[index];
          if(scope.options.attrName) {
            scope.seletedFont = scope.options.list[index][scope.options.attrName];
          }else{
            scope.seletedFont = scope.options.list[index];
          }
          scope.closeModel();
        };


        //打开模型
         scope.openModal = function () {
          $ionicModal.fromTemplateUrl(
            'directives/selectBox2/model.html',
            {
            scope: scope,
            animation: 'fade-in'
          }).then(function (modal) {
            scope.modal = modal;
            scope.modal.show();
            eleScrollTo();
          });
        }


        function eleScrollTo() {
          if(scope.options.index > 7) {
            var top = (scope.options.index - 3) * 40;
            $ionicScrollDelegate.$getByHandle('scorllHandler').scrollTo(0, top, true);
          }
        }

        //关闭模型
        scope.closeModel = function () {
          scope.modal.remove();
        }


        function getIndex(arr,obj) {
          if(obj) {
            for (var i = 0; i < arr.length; i++) {
              if(!!scope.options.attrName) {
                if (arr[i][scope.options.attrName] == obj[scope.options.attrName]) {
                  return i;
                }
              }else{
                if (arr[i] == obj) {
                  return i;
                }
              }
            }
          }
          return 0;
        };

      }
    }
  }])
;
