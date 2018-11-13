/**
 * Created by ws on 2018/11/12.
 */
angular.module('starter.controllers')
  .directive('marqueeRow',['$timeout','$interval',function ($timeout,$interval) {
    return{
      restrict: 'E',
      templateUrl: 'directives/marquee/page.html',
      replace:true,
      scope:{
        marqueeData:'=',
        options:'=',
        changeCallback:'&'
      },
      link: function (scope, element,attr) {

        var ele = element[0] ;
        var obj = {};
        var maxScroll;
        obj.step = scope.options.step || 1;
        obj.timer = scope.options.timer || 50;
        scope.noScroll = true;

        //禁止手动滚动
        ele.ontouchstart = function(){ return false;};

        startScroll();

        function startScroll() {
          $timeout(function () {
            maxScroll = ele.scrollWidth/2;
            if(ele.scrollWidth<window.innerWidth){
              return;
            }
            scope.noScroll = false;
            $interval(function () {
              if(ele.scrollLeft<maxScroll){
                ele.scrollLeft += obj.step;
              }else{
                ele.scrollLeft = 0;
              }
            },obj.timer);
          });
        }


      }
    }
  }])
;
