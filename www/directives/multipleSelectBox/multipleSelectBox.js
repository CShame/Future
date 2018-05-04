/**
 * Created by ws on 2017/12/8.
 */
angular.module('starter.controllers')
  .directive('multipleSelectBox',['$ionicModal','$ionicScrollDelegate',function ($ionicModal,$ionicScrollDelegate) {
    return {
      restrict: 'E',
      templateUrl: 'directives/multipleSelectBox/page.html',
      scope: {
        options: "="
      },
      link: function (scope) {

        scope.$watch('options.list',function (newV) {
          if(newV && scope.options.list.length>0) {
            if(!!scope.options.value){
              scope.seletedFont = '';
              for(var i=0;i<scope.options.list.length;i++){
                for(var j=0;j<scope.options.value.length;j++){
                  if(scope.options.list[i][scope.options.attrName] == scope.options.value[j][scope.options.attrName]){
                    scope.options.list[i].checked = true;
                  }
                  if(scope.seletedFont == ''){
                    scope.seletedFont += scope.options.value[j][scope.options.attrName];
                  }else{
                    scope.seletedFont += '、';
                    scope.seletedFont += scope.options.value[j][scope.options.attrName];
                  }
                }
              }
            }else{
              scope.options.value = [];
              scope.options.value.push(scope.options.list[0]);
              scope.options.list[0].checked = true;
              scope.seletedFont = scope.options.list[0][scope.options.attrName];
            }
          }
        });

        scope.clearInfo = function () {
          scope.options.selectKey = '';
        };

        //打开模型
        scope.openModal = function () {
          $ionicModal.fromTemplateUrl(
            'directives/multipleSelectBox/modal.html',
            {
              scope: scope,
              animation: 'fade-in'
            }).then(function (modal) {
            scope.modal = modal;
            scope.modal.show();
            // eleScrollTo();
          });
        };

        //选择item
        scope.seletedItem = function (data) {
          if(data.checked === undefined){
            data.checked = true;
          }else{
            data.checked = !data.checked;
          }
        };

        scope.btnCancel = function () {
          scope.modal.hide();
          scope.modal.remove();
        };

        scope.btnOK = function () {
          scope.seletedFont = '';
          scope.options.value = [];
          if(scope.options.attrName) {
            scope.options.list.forEach(function (each) {
              if(each.checked){
                scope.options.value.push(each);
                if(scope.seletedFont == ''){
                  scope.seletedFont += each[scope.options.attrName];
                }else{
                  scope.seletedFont += '、';
                  scope.seletedFont += each[scope.options.attrName];
                }
              }
            });
          }

          scope.btnCancel();
        };

      }
    }
  }]);
