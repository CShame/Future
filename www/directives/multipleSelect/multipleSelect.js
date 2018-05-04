/**
 * Created by ws on 2018/4/4.
 */
angular.module('starter.controllers')
  .directive('multipleSelect',['$ionicModal','$ionicScrollDelegate',function ($ionicModal,$ionicScrollDelegate) {
    return {
      restrict: 'A',
      // templateUrl: 'directives/multipleSelect/page.html',
      scope: {
        options: "=",
        msCallback:'&'
      },
      link: function (scope,element) {

        //打开模型
        element.on('click', function (e) {
          $ionicModal.fromTemplateUrl(
            'directives/multipleSelect/modal.html',
            {
              scope: scope,
              animation: 'fade-in'
            }).then(function (modal) {
            scope.modal = modal;
            scope.modal.show();
          });
        });

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

        scope.btnOk = function () {
          scope.options.value = [];
          if(scope.options.attrName) {
            scope.options.list.forEach(function (each) {
              if(each.checked){
                scope.options.value.push(each);
              }
            });
          }
          scope.msCallback();
          scope.btnCancel();
        };

      }
    }
  }]);
