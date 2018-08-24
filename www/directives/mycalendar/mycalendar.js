/**
 * Created by ws on 2018/8/23.
 */
angular.module('starter.directives')
  .directive('myCalendar',['CalenderService',function (CalenderService) {
    return {
      restrict: 'E',
      scope: {
        resultCallback:'&'

      },
      templateUrl: 'directives/mycalendar/page.html',
      link: function (scope) {

        scope.thisMonthDate = [];

        var nowDate = new Date();
        var thisYear = nowDate.getYear();
        var thisMonth = nowDate.getMonth()+1;
        var thisDate = nowDate.getDate();

        scope.thisMonthDate = CalenderService.initCalendar(thisYear, thisMonth, thisDate);
        console.log(scope.thisMonthDate);

        scope.resultCallback({MonthDate:scope.thisMonthDate});


        scope.timeCause = function (year, month) {
          scope.thisMonthDate = CalenderService.initCalendar(year-1900, month, thisDate);
          console.log(scope.thisMonthDate);
          scope.resultCallback({MonthDate:scope.thisMonthDate});
        };


        scope.selectDate = function (date) {
          date.askForLeave = !date.askForLeave;
          scope.resultCallback({MonthDate:scope.thisMonthDate});
        };

      }
    }
  }]);
