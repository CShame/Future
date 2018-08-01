/**
 * Created by Administrator on 2017/2/21 0021.
 */
angular.module('starter.controllers')
  .directive('monthOption', [ '$filter', function ( $filter) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        mapTime: '&',
      },
      templateUrl: 'directives/monthOption/page.html',
      link: function (scope) {

        var now = new Date();
        scope.thisYear = now.getYear() + 1900;
        scope.thisMonth = now.getMonth()+1;


        scope.canAdd = false;

        scope.$watch('state.reset', function (nVal) {
          if (nVal) {
            scope.timeType = scope.yearOrMonth;
            now = new Date();
            scope.nowData = $filter('date')(now, 'yyyy/MM');
          }
        });

        scope.setTime = function (side) {
          if(side == -1){
            if(scope.thisMonth >1){
              scope.thisMonth--;
            }else{
              scope.thisYear--;
              scope.thisMonth = 12;
            }
          }else{
            if(scope.thisMonth < 12){
              scope.thisMonth++;
            }else{
              scope.thisYear++;
              scope.thisMonth = 1;
            }
          }
          scope.mapTime({thisYear: scope.thisYear, thisMonth: scope.thisMonth});
        };
      }
    }
  }]);
