angular.module('starter.services', [], ["$httpProvider", function ($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var param = function (obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

/*测试环境*/
  .constant('RequestUrl', 'http://192.168.3.179:999/')
  .constant('baseUrl', 'http://192.168.3.179:999/App.ashx?Name=EFOS.Master.Business.')

/*发布环境*/
  // .constant('RequestUrl', 'http://master.eegrid.com/')
  // .constant('baseUrl', 'http://master.eegrid.com/App.ashx?Name=EFOS.Master.Business.')

  .factory('AirInputData',function () {
  var inputData = function(){

  }

  return {inputData:inputData};
})

  .factory('HttpFactory', function ($http, $ionicPopup, $ionicLoading) {
    var send = function (config) {
      !!config.scope && (config.scope.loading = true);
      !!config.mask && $ionicLoading.show({
        template: typeof config.mask == "boolean" ? '请稍等...' : config.mask
      });
      config.headers = {'Content-Type': 'application/x-www-form-urlencoded'};

      config.method == 'post' && (config.data = config.data || {});
      ionic.extend(config, {
        timeout: 15000
      });
      var http = $http(config);
      http.catch(function (error) {
        if (error.status == 0) {

        }
        else if (status == 403) {
          error.data = {
            template: '资源不可用'
          }
        } else {
          error.data = {
            template: '服务器太累了'
          }
        }
        $ionicPopup.alert({
          title: '错误',
          template: error.data.template,
          buttons: [
            {
              text: '确定',
              type: 'button-balanced'
            }
          ]
        });
      });
      http.finally(function () {
        !!config.scope && (config.scope.loading = false);
        !!config.mask && $ionicLoading.hide();
      });
      return http;
    };
    return {
      send: send
    }
  })

  .factory('myNote', ["$ionicLoading", "$timeout", function ($ionicLoading, $timeout) {
    return {
      myNotice: function (msg, timeout, prev, post) {
        $ionicLoading.show({template: msg});
        $timeout(function () {
          prev && prev();
          $ionicLoading.hide();
          post && post();
        }, timeout || 1500);
        return false;
      },
      cancel: function () {
        $ionicLoading.hide();
      }
    }
  }])

  .factory('CacheFactory', ['$window', function ($window) {
    var save = function (key, value) {
      $window.localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value);
    };
    var get = function (key) {
      return $window.localStorage.getItem(key) || null;
    };
    var removeAll = function () {
      $window.localStorage.removeItem('phone');
      $window.localStorage.clear();
    };

    var deleteItem = function (key) {
      $window.localStorage.removeItem(key);
    };

    return {
      save: save,
      get: get,
      deleteItem: deleteItem,
      removeAll: removeAll
    };
  }])

  .factory('sendVerification',function ($q,$http) {

    //发送验证码
    function sendCode(phone)  {
      var def = $q.defer();
      if(IsTel(phone)){

        var CurTime = new Date().getTime();
        var Nonce = 'ws123';
        var sha = hex_sha1('6986838d56fd'+Nonce+CurTime);

        $http({
          url : 'https://api.netease.im/sms/sendcode.action',
          method:'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            'AppKey' : '9060757f46b0dad794f7ae5be5f52214',
            'CurTime': CurTime,
            'CheckSum': sha,
            'Nonce': Nonce
          },
          params:{
            mobile: phone,
            templateid: 3056170,
            codeLen: 4
          }
        }).success(function (data) {
          def.resolve(data);
        }).error(function (err) {
          console.log(err);
          def.resolve('error');
        });
      }else{
        def.resolve('notTel');
      }
      return def.promise;
    }


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

    return{
      sendCode:sendCode
    }
})
;