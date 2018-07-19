/**
 * Created by ws on 2018/7/18.
 */
/**
 * Created by ws on 2018/7/17.
 */
angular.module('starter.controllers')
  .directive('drawBar',[function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/drawBar/page.html',
      replace: true,
      scope: {
        barList:'=',
        lineWidth:'@',
        bgColor:'@',
        fullColor:'@',
        keyWordPer:'@',
        keyWordData:'@',
        keyWordName:'@',
        maxY:"="
      },
      link: function (scope, element, attr) {

        if(scope.maxY){
          var min = scope.maxY/3;
          scope.yLine = [scope.maxY,min*2,min,0];
        }else{
          scope.yLine = [12,8,4,0];
        }

        if(!scope.bgColor){
          scope.bgColor = "#E8F7FF";
        }
        if(!scope.fullColor){
          scope.fullColor = "linear-gradient(to top, rgb(22, 146, 252), rgb(31, 181, 255));"
        }
        if(!scope.lineWidth){
          scope.lineWidth = 6;
        }

        scope.drawBarStyle = {};

        scope.drawBarStyle.bg = {
          "width":scope.lineWidth+"px",
          "border-top-left-radius":scope.lineWidth*0.5 + "px",
          "border-top-right-radius":scope.lineWidth*0.5+"px"
        };

        scope.$watch("barList",function (newV,oldV) {
          if(newV && newV.length > 0){
            scope.barList.forEach(function (each) {
              each.fullStyle = {
                "width":scope.lineWidth+"px",
                "height":(scope.keyWordPer ?each[scope.keyWordPer]:(each[scope.keyWordData]*100/scope.maxY).toFixed(1)) + "%",
                "border-top-left-radius":scope.lineWidth*0.5 + "px",
                "border-top-right-radius":scope.lineWidth*0.5 + "px"
              }
            })
          }
        });

        scope.showThisTooltip = function (index) {
          element[0].getElementsByClassName("tooltip")[index].style.display = "block";
        };

        scope.hideThisTooltip = function (index) {
          element[0].getElementsByClassName("tooltip")[index].style.display = "none";
        };

      }
    }

  }]);
