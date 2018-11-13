/**
 * Created by ws on 2018/7/5.
 */
angular.module('starter.controllers')

  .directive('repeatFinish',function(){
    return {
      link: function(scope,element,attr){
        console.log(scope.$index)
        if(scope.$last == true){
          console.log('ng-repeat执行完毕')
          scope.$eval( attr.repeatFinish )
        }
      }
    }
  })


  .directive('drawPie',function(){
    return {
      restrict: 'A',
      scope:{
        lineWidth:'@',
        percent:'=',
        bgColor:'@',
        levelColor:'@'
      },
      link: function (scope, element,attr) {

        if(!scope.bgColor){
          scope.bgColor = "#E8F7FF";
        }
        if(!scope.levelColor){
          scope.levelColor = "#1fb5ff";
        }

        if(!attr.height){
          console.log("height属性不能为空");
          return;
        }
        if(!attr.width){
          console.log("width属性不能为空");
          return;
        }
        if(!scope.lineWidth){
          console.log("lineWidth属性不能为空");
          return;
        }

        console.log("11111",attr.width,attr.height,scope.percent);

        scope.$watch("percent",function (newV,oldV) {
          if(newV!=oldV && newV){
            drawCircle(scope.percent);
          }
        });

        function drawCircle(value) {
          var canvas = element[0];
          var endAngles = parseFloat(value) * 0.02 * Math.PI - Math.PI / 2;
          var eleHeight = 100;

          if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = scope.bgColor;
            ctx.lineWidth = scope.lineWidth;
            ctx.lineCap = 'round';
            var circle = {
              x: eleHeight * 0.5,                   //圆心的x轴坐标值
              y: eleHeight * 0.5,                   //圆心的y轴坐标值
              r: eleHeight * 0.5 - scope.lineWidth*0.5    //圆的半径
            };
            //画背景圆环
            ctx.arc(circle.x, circle.y, circle.r, -Math.PI / 2, 1.5*Math.PI, false);
            ctx.stroke();

            //画上层圆环
            ctx.beginPath();
            ctx.strokeStyle = scope.levelColor;
            ctx.arc(circle.x, circle.y, circle.r, -Math.PI / 2, endAngles, false);
            ctx.stroke();
          }
        }
      }
  }

  })

  .directive('drawLine2',function(){
    return {
      restrict: 'AE',
      template:'<div ng-style="drawLineStyle.bgStyle">' +
      '<div  ng-style="drawLineStyle.fullStyle"></div>' +
      '<div style="position: absolute;font-size: 9px;color:#fff;background:rgba(38,42,53,0.5);padding:3px;border-radius: 3px" ng-style="drawLineStyle.box">' +
      '<p>{{tooltipTitle}}</p><p></p></div>' +
      '</div>',
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
            console.log(event);
            scope.drawLineStyle.box = {
              "left": event.targetTouches[0].pageX + 'px',
              "display": "block"
            }
          });

          element[0].addEventListener("touchmove", function (event) {
            console.log(event);
            scope.drawLineStyle.box = {
              "left": event.targetTouches[0].pageX + 'px',
              "display": "block"
            }
          });

          element[0].addEventListener("touchend", function (event) {
            scope.drawLineStyle.box = {
              "display": "none"
            }
          });
        }

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
            "position":"relative"
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

  })


;
