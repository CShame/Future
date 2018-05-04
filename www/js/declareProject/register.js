/**
 * Created by ws on 2017/3/30.
 */
angular.module('starter.controllers')
  .controller('registerCtrl', function($scope,$ionicModal,myNote,sendVerification,$state,CacheFactory,declareServ) {

    $scope.isRegister = false;

    //todo: 获取openId
    var openId = 'CShame4';

    declareServ.isRegister(openId).then(function (data) {
      console.log(data);
      if(!!data.Flag){
        CacheFactory.save('UserID',data.UserID);
        CacheFactory.save('phone',data.Phone);
       $state.go('myProject');
      }else{
        $scope.isRegister = true;
      }
    });

    $scope.phone = {
      telNumber : null
    };


    $scope.resetPhone = function () {
      console.log($scope.phone.telNumber);
      $scope.phone.telNumber = "";
    };


    //打开模型;
    $scope.openModal = function (url){
      if(IsTel($scope.phone.telNumber)) {
        $ionicModal.fromTemplateUrl(
          url,
          {
            scope: $scope,
            animation: 'fade-in'
          }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }else{
        myNote.myNotice('请输入合法的电话号码',2000);
        $scope.resetPhone();
      }
    };

    //关闭模型
    $scope.cancel = function () {
      $scope.modal.hide();
      $scope.modal.remove();
    };

    //确认发送验证码
    $scope.ok = function () {
      //关闭模型
      $scope.cancel();
      //发送验证码
      if(IsTel($scope.phone.telNumber)) {
        if (openId != '') {
          $state.go('verification', { 'phone': $scope.phone.telNumber, 'openId': openId });
        } else {
          myNote.myNotice('请检查您的网络');
        }
      }else{
        myNote.myNotice('请输入合法的电话号码',2000);
      }
    };

    //正则表达式验证手机号码
    function IsTel(Tel){
      var re = new RegExp(/^1[0-9]{10}$/);
      var retu = re.test(Tel);
      if(retu){
        return true;
      }else{
        return false;
      }
    }

  });
