/**
 * Created by ws on 2017/11/27.
 */
angular.module('starter.controllers')
  .service('cutoffLineService', [function () {
    var _this = this;
    //页面中选择器数量 default : 0
    _this.globalId = 0;
    return _this;
  }])

  .directive('cutoffLine', ['$timeout', 'cutoffLineService','$interval',function ($timeout, cutoffLineService,$interval) {

      return {
        restrict: 'AE',
        replace:false,
        templateUrl: 'directives/cutoffLine/page.html',
        scope: {

        },
        link: function (scope,element) {

          scope.globalId = ++cutoffLineService.globalId;

          // canvasApp();
          $timeout(function () {
            canvasApp();
          },1000);
          function canvasApp() {

            var theCanvas = document.getElementById('canvasOne_' + scope.globalId );
            console.log(theCanvas);
            var ctx = theCanvas.getContext('2d');
            theCanvas.width = window.innerWidth;
            theCanvas.height = '100';

            scope.lastPoint = {x:theCanvas.width*0.5,y:theCanvas.height};  //默认最后一个点为底部中间位置
            var dsq;                                        //计时器变量

            var point,style,dPoint;
            var drag = null;


            // define initial points
            function init() {
              point = {
                p1: {
                  x: -30,
                  y: theCanvas.height
                },
                p2: {
                  x: window.innerWidth + 30,
                  y: theCanvas.height
                },
                cp1:{
                  x: window.innerWidth * 0.5,
                  y: theCanvas.height
                }
              };

              // default styles
              style = {
                curve: {
                  width: 1,
                  color: 'transparent'
                },
                cpline: {
                  width: 1,
                  color: '#c00'
                }
              };

              // var contentDiv = document.getElementById('content');


              //event handles
              element[0].addEventListener('touchstart', dragStart, false);
              element[0].addEventListener('touchmove', dragging, false);
              element[0].addEventListener('touchend', dragEnd, false);
              // theCanvas.addEventListener('mouseout', dragEnd, false);

              drawScreen();
            }

            var backTransparent = 0.44;
            var goTransparent = 0.03;

            // draw screen
            function drawScreen(state) {
              ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
              // curve
              ctx.lineWidth = style.curve.width;
              ctx.strokeStyle = style.curve.color;

              ctx.beginPath();
              ctx.moveTo(point.p1.x, point.p1.y);
              if (point.cp2) {
                ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
              } else {
                ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
              }
              ctx.moveTo(point.p2.x, point.p2.y);
              ctx.lineTo(point.p1.x, point.p1.y);
              ctx.stroke();
              if(state == 'back'){
                // console.log(backTransparent);
                backTransparent = backTransparent - 0.01 <= 0.03 ? 0.03 : backTransparent - 0.01 ;
                ctx.fillStyle = "rgba(0,0,0,"+backTransparent+")";
              }else {
                console.log(goTransparent);
                goTransparent = goTransparent + 0.005 >= 0.44 ? 0.44 : goTransparent + 0.005 ;
                ctx.fillStyle = "rgba(0,0,0,"+goTransparent+")";
              }
              ctx.fill();
            }

            // event parser
            function MousePos(event) {
              event = event ? event : window.event;
              // console.log(event);

              return {
                x: event.touches[0].pageX - theCanvas.offsetLeft,
                y: event.touches[0].pageY - theCanvas.offsetTop - 44
              }
            }

            // start dragging
            function dragStart(e) {
              // console.log(e);
              scope.startPointY = e.touches[0].pageY;
              e = MousePos(e);
              drag = point.cp1;
              dPoint = e;
              theCanvas.style.cursor = 'move';
              if(dsq){
                $interval.cancel(dsq);
                backTransparent = 0.44;
                goTransparent = 0.03;
              }
            }

            function dragging(e) {
              if (drag) {
                e = MousePos(e);
                point.cp1.x += e.x - dPoint.x;
                point.cp1.y += e.y - dPoint.y;
                if(point.cp1.x < 100 ){
                  point.cp1.x = 100;
                }else if(point.cp1.x >  window.innerWidth -100){
                  point.cp1.x =   window.innerWidth -100;
                }
                if(point.cp1.y < theCanvas.height - 120){
                  point.cp1.y = theCanvas.height - 120;
                }
                dPoint = e;
                drawScreen();
                scope.lastPoint = point.cp1;
              }
            }

            function dragEnd(e) {
              drag = null;
              // console.log(dsq);
              dsq = $interval(function () {
                point.cp1.x = scope.lastPoint.x;
                point.cp1.y = scope.lastPoint.y;
                drawScreen('back');
                scope.lastPoint.y += 3;
              }, 16);
              theCanvas.style.cursor = 'default';
              backTransparent = goTransparent;
            }

            scope.$watch('lastPoint', function (newV) {
              if (newV && newV.y >= theCanvas.height) {
                $interval.cancel(dsq);
                scope.lastPoint = {x:150,y:theCanvas.height};
                drawScreen();
                backTransparent = 0.44;
                goTransparent = 0.03;
              }
            }, true);

            // drawScreen();

            init();

          }

        }
      }
    }])
;
