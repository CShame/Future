/**
 * Created by ws on 2018/7/17.
 */
angular.module('starter.controllers')
  .directive('drawLine',[function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/drawLine/page.html',
      replace:true,
      scope:{
        lineWidth:'@',
        percent:'=',
        bgColor:'@',
        levelColor:'@',
        tooltipTitle:'=',
        tooltipTitle1:'=',
        tooltipTitle2:'=',
        tooltipData1:'=',
        tooltipData2:'=',
        tooltipUnit:'='
      },
      link: function (scope, element,attr) {

        console.log(scope.tooltipTitle);
        console.log(scope.tooltipData1);
        console.log(scope.tooltipData2);

        if(scope.tooltipTitle && scope.tooltipData1  &&scope.tooltipData2) {
          element[0].addEventListener("touchstart", function (event) {
            element[0].getElementsByClassName("tooltip")[0].style.display = "block";
            element[0].getElementsByClassName("tooltip")[0].style.left = event.targetTouches[0].pageX - getLeft(element[0]) + getScrollLeft(element[0]) + 'px';
            element[0].getElementsByClassName("tooltip")[0].style.top = event.targetTouches[0].pageY - getTop(element[0]) + getScrollTop(element[0]) + element[0].offsetTop -60+ 'px';
          });

          element[0].addEventListener("touchmove", function (event) {
            console.log(event);
            event.preventDefault();
            computePosition(event);
          });

          element[0].addEventListener("touchend", function (event) {
            element[0].getElementsByClassName("tooltip")[0].style.display = "none";
          });
        }

        //获取元素的纵坐标（相对于窗口）
        function getTop(e){
          var offset=e.offsetTop;
          if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
          return offset;
        }

        //获取元素的横坐标（相对于窗口）
        function getLeft(e){
          var offset=e.offsetLeft;
          if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
          return offset;
        }

        //获取滚动的高度
        function getScrollTop(e) {
          var offset = e.scrollTop;
          if(e.offsetParent!=null) offset+=getScrollTop(e.offsetParent);
          return offset;
        }

        //获取滚动的宽度
        function getScrollLeft(e) {
          var offset = e.scrollLeft;
          if(e.offsetParent!=null) offset+=getScrollLeft(e.offsetParent);
          return offset;
        }


        function computePosition(event) {
          var div = element[0];
          console.log(getTop(div));
          var x=event.targetTouches[0].clientX + getScrollLeft(element[0]);
          var y=event.targetTouches[0].clientY + getScrollTop(element[0]);
          var divx1 = getLeft(div);
          var divy1 = getTop(div) - 5;
          var divx2 = divx1 + div.offsetWidth;
          var divy2 = getTop(div) + div.offsetHeight + 5;
          console.log(y,divy1,divy2);
          if( x < divx1 || x > divx2 || y < divy1 || y > divy2){
            console.log('out');
            element[0].getElementsByClassName("tooltip")[0].style.display = "none";
          }else{
            console.log('in');
            element[0].getElementsByClassName("tooltip")[0].style.display = "block";
            element[0].getElementsByClassName("tooltip")[0].style.left = event.targetTouches[0].pageX - getLeft(element[0]) + getScrollLeft(element[0]) + 'px';
            element[0].getElementsByClassName("tooltip")[0].style.top = event.targetTouches[0].pageY - getTop(element[0]) + getScrollTop(element[0]) + element[0].offsetTop -60+ 'px';
          }
        };


        if(!scope.bgColor){
          scope.bgColor = "#E8F7FF";
        }
        if(!scope.levelColor){
          scope.levelColor = "linear-gradient(to right,#1692FC,#1fb5ff)";
        }

        scope.drawLineStyle = {};

        scope.$watch("percent",function (newV,oldV) {
          if(newV){
            drawLine();
          }
        });

        function drawLine() {
          scope.drawLineStyle.bgStyle = {
            "background":scope.bgColor,
            "width":"100%","height":scope.lineWidth+"px",
            "border-top-right-radius": scope.lineWidth+"px",
            "border-bottom-right-radius": scope.lineWidth+"px",
          };
          scope.drawLineStyle.fullStyle = {
            "background":scope.levelColor,
            "width":scope.percent+"%",
            "height":scope.lineWidth+"px",
            "border-top-right-radius": scope.lineWidth+"px",
            "border-bottom-right-radius": scope.lineWidth+"px"
          };

          scope.drawLineStyle.box = {
            "display":"none"
          }
        }
      }
    }

  }]);
