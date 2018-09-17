/**
 * Created by ws on 2018/3/7.
 */
angular.module('starter.directives')
  .directive('describeBox', ['$interval', '$ionicModal', '$timeout', 'pathUtil', 'CameraUtil', 'recordServ','myNote','fsUtil',
    function ($interval, $ionicModal, $timeout, pathUtil, CameraUtil, recordServ,myNote,fsUtil) {

    return {
      restrict: 'E',
      templateUrl: 'directives/describeBox/page.html',
      scope: {
        describeContent: '='
      },
      link: function (scope, element) {
        /**
         * ----------------------------------------------
         * describeContent : [obj]  指令双向绑定的描述信息
         *    + title    : [string] 文字信息
         *    + voiceList: [array]  语音数组
         *         + time: [string] 语音时长
         *         + recordName:[string] 语音资源路径
         *    + photoList: [array]  照片信息
         *         +url  :  [string] 图片路径
         * ----------------------------------------------
         * */
          // scope.describeContent = {
          //   title: '',
          //   voiceList: [],
          //   photoList:[]
          // };
        var mediaRec;
        var recordStartTime;
        var recordStopTime;
        var isStartedVoice = false;

        scope.saveRecord = true;
        scope.contentOpen = true;
        scope.recordTitle = '按住说话';

        scope.openOrClose = function () {
          scope.contentOpen = !scope.contentOpen;
        };

        scope.oStyle = {
          modalStyle: {}
        };

        var interval = null;
        var timeInterval = null;
        scope.autoTextArea = function (obj) {
          timeInterval = $interval(function () {
            // console.log(obj);
            obj.target.style.height = obj.target.scrollHeight + 'px';
            //todo:行减少的时候高度没有减少
          }, 200);
        };
        scope.clearAuto = function () {
          if (timeInterval) {
            $interval.cancel(timeInterval);
          }
        };

        var voiceInterval = null;

        /**
         * 播放本条语音的动画
         * */
        scope.playVoice = function (data) {
          if (voiceInterval) {
            $interval.cancel(voiceInterval);
          }
          //停止其它语音
          for (var j = 0; j < scope.describeContent.voiceList.length; j++) {
            scope.describeContent.voiceList[j].haoroomsStyle = {"background-position": "0px 0px"};
          }
          //播放本条语音
          var i = 0;
          voiceInterval = $interval(frameAnmi, 300);
          function frameAnmi() {
            if (i > 4) {
              i = 0;
            }
            data.haoroomsStyle = {"background-position": "-" + i * 20 + "px 0px"};
            i++;
          }

          playThisVoice(data.recordName);
          //语音播放完之后动画停止
          $timeout(function () {
            if (voiceInterval) {
              $interval.cancel(voiceInterval);
            }
            data.haoroomsStyle = {"background-position": "0px 0px"};
            mediaRec.stop();
            mediaRec.release();
            mediaRec = null;
          }, data.time * 1000);
        };
        /**
         * 播放音频文件
         * */
        function playThisVoice(src) {
          console.log('play path:',src);
          mediaRec = new Media(src,
            // success callback
            function () {
              console.log("recordAudio():play Success");
            },
            // error callback
            function (err) {
              console.log("recordAudio():play Error: " + err.code);
            });
          mediaRec.play();
        }

        /**
         * 打开录音界面
         * */
        $ionicModal.fromTemplateUrl(
          'directives/describeBox/recordModal.html',
          {
            scope: scope,
            animation: 'fade-in'
          }).then(function (modal) {
          scope.modal = modal;
        });
        scope.openRecord = function () {
          scope.saveRecord = true;
          scope.modal.show();
        };
        scope.closeRecordModal = function () {
          if (scope.modal) {
            scope.modal.hide();
            // scope.modal.remove();
          }
          scope.recordTitle = '按住说话';
        };

        /**
         * 打开相机
         * */
        scope.openCamera = function () {
          if (scope.describeContent.photoList && scope.describeContent.photoList.length >= 2) {
            myNote.myNotice('最多只能拍两张照片');
            return;
          }
          CameraUtil.takePhoto('temp').then(function (data) {
            var photo = {};
            photo.url = data;
            scope.describeContent.photoList.push(photo);
          });
        };

        /**
         * 开始录音
         * */
        scope.startRecord = function () {
          scope.noBroke = false;
          scope.recordTitle = '松开保存';
          try {
            var src = pathUtil.getBasePath(true) + new Date().getTime();
            if (cordova.platformId === 'android') {
              src += '.mp3';
            } else {
              src += '.m4a';
            }
            if (mediaRec) {
              mediaRec.release();
            }
            console.log(src);
            mediaRec = new Media(src,
              // success callback
              function () {
                console.log("recordAudio():startRecord Success");
              },
              // error callback
              function (err) {
                console.log("recordAudio():startRecord Error: " + err.code);
              });
            // Record audio
            mediaRec.startRecord();
            isStartedVoice = true;
            loadAnimation();
            scope.describeContent.voiceList.push({recordName: src});
            recordStartTime = new Date().getTime();
            return false;
          }catch (err){
            console.log(err);
          }
        };

        /**
         * saveRecord 为true时，停止录音并保存
         * */
        scope.stopAndSaveRecord = function () {
          if(!isStartedVoice){
            return;
          }
          isStartedVoice = false;

          if(mediaRec){
            mediaRec.stopRecord();
            mediaRec.release();
          }
          // stopAnimation();
          mediaRec = null;
          if (scope.saveRecord === true) {
            console.log('停止录音并保存');
            recordStopTime = new Date().getTime();
            afterSaveRecord();
          } else {
            console.log('停止录音并且不保存');
            var deleteVoice = scope.describeContent.voiceList.splice(scope.describeContent.voiceList.length - 1, 1);
            scope.saveRecord = true;
            //delete record source
            fsUtil.deleteFile(deleteVoice.recordName)
          }
          // scope.closeRecordModal();
          scope.noBroke = true;
        };


        /**
         * 没调用此方法表示弹出框等意外中断
         * */
        scope.recordBroke = function () {
          if(!scope.noBroke){
            $timeout(function () {
              if(mediaRec){
                mediaRec.stopRecord();
                mediaRec.release();
              }
            },1000);
            scope.describeContent.voiceList.splice(scope.describeContent.voiceList.length - 1, 1);
          }else{
            scope.closeRecordModal();
          }
          stopAnimation();
        };

        /**
         * 设置scope.saveRecord为false,不保存停止录音
         * */
        scope.cancelRecord = function () {
          if (scope.saveRecord === true) {
            scope.saveRecord = false;
          }
        };
        /**
         * 设置scope.saveRecord为true,恢复录音
         * */
        scope.returnRecord = function () {
          if (scope.saveRecord === false) {
            scope.saveRecord = true;
          }
        };

        /**
         * 删除本条语音
         * */
        scope.deleteRecord = function (data, index) {
          var deleteVoice = scope.describeContent.voiceList.splice(index, 1);
          //delete record source
          fsUtil.deleteFile(deleteVoice.recordName)
        };

        function afterSaveRecord() {
          var currentVoice = scope.describeContent.voiceList[scope.describeContent.voiceList.length - 1];
          currentVoice.time = parseInt((recordStopTime - recordStartTime) / 1000) + 1;
          currentVoice.eachVoiceWidth = {width: 55 + currentVoice.time * 5 + 'px'};
        }


        //加载动画
        function loadAnimation() {
          var j = 0;
          interval = $interval(frameAnmi, 300);
          function frameAnmi() {
            if (j > 5) {
              j = 0;
            }
            scope.oStyle.modalStyle = {"background-position": "-" + j * 64 + "px 0px"};
            j++;
          }
        }

        function stopAnimation() {
          $timeout(function () {
            if (interval) {
              $interval.cancel(interval);
            }
            scope.oStyle.modalStyle = {"background-position": "0px 0px"};
          })
        }

        scope.$watch('describeContent.title', function (newVal, oldVal) {
          if (newVal && newVal != oldVal) {
            if (newVal.length > 60) {
              myNote.myNotice('不能超过60个字');
              scope.describeContent.title = newVal.substr(0, 60);
            }
          }
        });

      }
    }
  }])

  .directive('recordBtn', ['$ionicGesture','$timeout',function ($ionicGesture,$timeout) {
    return {
      restrict: 'A',
      scope: {
        recordHold: '&',
        recordBroke:'&',
        recordRelease: '&'
      },
      link: function (scope, element) {

        $ionicGesture.on('hold', function () {
          console.log('$ionicGesture hold');
          scope.recordHold();
        }, element);

        $ionicGesture.on('touchend', function () {
          // 比release先触发,弹出意外窗口时，不会触发此事件
          console.log('$ionicGesture touchend');
          scope.recordRelease();
        }, element);

        $ionicGesture.on('release', function () {
          console.log("$ionicGesture release");
          scope.recordBroke();
        }, element);

      }
    }
  }])
;
