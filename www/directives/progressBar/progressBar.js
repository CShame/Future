/**
 * Created by ws on 2017/3/14.
 */
angular.module('starter.controllers')
  .directive('progressBar',[function () {
    return {
      restrict : 'E',
      templateUrl : 'directives/progressBar/progressBar.html',
      scope : {
        progress :'='
      },
      link : function (scope) {
        console.log(2131213);
        // scope.progressPercent = {width:scope.progress.data};
      }
    }
  }])
;
