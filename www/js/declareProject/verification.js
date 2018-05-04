/**
 * Created by ws on 2017/3/30.
 */
angular.module('starter.controllers')

  .controller('verificationCtrl', function($scope,$ionicModal,myNote,sendVerification,$stateParams,$state,declareServ,CacheFactory) {

    $scope.getCode = true;

    $scope.user = {
      telNumber :$stateParams.phone,
      code : null
    };

    var openId = $stateParams.openId;

    //进页面就发验证码
    // declareServ.sendValidate($scope.user.telNumber).then(function (data) {
    //   console.log(data);
    // });

    //开始计时60s
    startClock(10);

    //重置验证码
    $scope.resetCode = function () {
      console.log($scope.user.code);
      $scope.user.code = "";
    };

    //打开模型
    $scope.openModal = function (url){
      $ionicModal.fromTemplateUrl(
        url,
        {
          scope: $scope,
          animation: 'fade-in'
        }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    //关闭模型
    $scope.cancel = function () {
      $scope.modal.remove();
    };

    /*======================定时器======================*/
    var count = 0;
    var interval = [];
     interval[count] = setInterval(function () {
      $scope.$apply(updateClock);
      console.log($scope.clock);
    }, 1000);

    function updateClock() {
      $scope.clock --;
      if( $scope.clock <= 0){
        clearInterval(interval[count]);
        $scope.getCode = false;
      }
    }

    function startClock(time) {
      $scope.clock =time;
      updateClock();
    }

    /*===============================================*/



    //提交
    $scope.finishVerified = function () {
      declareServ.register(openId,$scope.user.telNumber,$scope.user.code).then(function (data) {
        console.log(data);
        if(data.Flag == true){
          CacheFactory.save('UserID',data.UserID);
          $state.go('myProject');
        }else if(data.Msg && data.Msg <= '0'){
          myNote.myNotice('验证码错误',2000);
          clearInterval(interval[count]);
          $scope.getCode = false;
          $scope.resetCode();
        }else{
          myNote.myNotice('注册出错，请检查你的网络',2000);
          clearInterval(interval[count]);
          $scope.getCode = false;
        }
      });
    };


    //重新发送验证码
    $scope.reSendCode = function () {
      count++;
      interval[count] = setInterval(function () {
        $scope.$apply(updateClock);
        console.log($scope.clock);
      }, 1000);
      startClock(10);
      $scope.getCode = true;
      // declareServ.sendValidate($scope.user.telNumber).then(function (data) {
      //   if(!!data) {
      //     //开始计时60s
      //     var interval = setInterval(function () {
      //       $scope.$apply(updateClock);
      //       console.log($scope.clock);
      //     }, 1000);
      //     startClock(60);
      //     $scope.getCode = true;
      //   }else{
      //     myNote.myNotice('验证码发送失败，请重新发送');
      //   }
      // });
    };


    //离开本界面的时候停止计时器
    $scope.$on('$destroy', function () {
      console.log('离开了');
      if(angular.isDefined(interval)) {
        clearInterval(interval);
      }
    });
  });
