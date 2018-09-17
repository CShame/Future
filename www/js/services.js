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


/*测试环境*/
  .constant('RequestUrl', 'http://192.168.3.179:999/')
  .constant('baseUrl', 'http://192.168.3.179:999/App.ashx?Name=EFOS.Master.Business.')

/*发布环境*/
  // .constant('RequestUrl', 'http://master.eegrid.com/')
  // .constant('baseUrl', 'http://master.eegrid.com/App.ashx?Name=EFOS.Master.Business.')

  .factory('pathUtil', [function () {
    return {
      getBasePath: function (noFile) {
        var basePath;
        if (ionic.Platform.isIOS()) {
          if(noFile === true){
            basePath = cordova.file.documentsDirectory.replace("file://", "");
          }else{
            basePath = cordova.file.documentsDirectory;
          }
        } else {
          basePath = cordova.file.externalApplicationStorageDirectory || cordova.file.applicationStorageDirectory;
        }
        return basePath;
      }
    }
  }])

  .factory('DateUtil', [function () {
    return {
      DateFormat: function () {
        var date = new Date();
        var res;
        var year = date.getFullYear();
        var Month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        if (Month < 10) {
          Month = '0' + Month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
        res = '' + year + Month + day + hour + min + sec;
        return res;
      }
    }
  }])

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

  .factory('fsUtil', ['pathUtil', '$q', '$cordovaFile', '$cordovaFileOpener2', '$cordovaFileTransfer',
    function (pathUtil, $q, $cordovaFile, $cordovaFileOpener2, $cordovaFileTransfer) {
      return {
        download: function (serverPath, downloadPathSuffix) {
          var options = {};
          var trustHosts = true;
          var defer = $q.defer();
          // var fileTransfer = new FileTransfer();
          var basePath = pathUtil.getBasePath();
          var targetPath = basePath + '/' + downloadPathSuffix;
          $cordovaFileTransfer.download(serverPath, targetPath, options, trustHosts).then(
            function (result) {
              defer.resolve(targetPath);
              console.log("下载成功", result);
            }, function (error) {
              console.log("下载失败", error);
              defer.reject(error);
            },
            function (process) {
              // defer.reject(error);
            });
          return defer.promise;
        },
        checkFile: function (path, filename) {
          var defer = $q.defer();
          window.resolveLocalFileSystemURL(path, function (fileEntry) {
            $cordovaFile.checkFile(fileEntry.toInternalURL(), filename).then(function () {
              defer.resolve(true);
            }, function (error) {
              defer.resolve(false);
            });
          });
          return defer.promise;
        },
        deleteFile: function (src) {
          var defer = $q.defer();
          var arr = src.split('/');
          var filename = arr.pop();
          var path = arr.join('/') + '/';
          window.resolveLocalFileSystemURL(path, function (fileEntry) {
            $cordovaFile.removeFile(fileEntry.toInternalURL(), filename).then(function () {
              defer.resolve(true);
            }, function (error) {
              defer.resolve(false);
            });
          });
          return defer.promise;
        },
        openFile: function (targetPath) {
          var docSuffix = targetPath.slice(2).split(".");
          var type;
          if (docSuffix[docSuffix.length - 1] == "doc") {
            type = "application/msword";
          } else if (docSuffix[docSuffix.length - 1] == "docx") {
            type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          }
          else if (docSuffix[docSuffix.length - 1] == "pdf") {
            type = "application/pdf";
          } else if (docSuffix[docSuffix.length - 1] == "xls") {
            type = "application/vnd.ms-excel";
          } else if (docSuffix[docSuffix.length - 1] == "xlsx") {
            type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          } else if (docSuffix[docSuffix.length - 1] == "txt" || docSuffix[docSuffix.length - 1] == "text") {
            type = "text/plain";
          } else if (docSuffix[docSuffix.length - 1] == "jpg" || docSuffix[docSuffix.length - 1] == "gif" || docSuffix[docSuffix.length - 1] == "jpeg" || docSuffix[docSuffix.length - 1] == "png") {
            type = "image/" + docSuffix[docSuffix.length - 1];
          } else if (docSuffix[docSuffix.length - 1] == "zip") {
            type = 'application/zip';
          } else if (docSuffix[docSuffix.length - 1] == "ppt") {
            type = 'application/vnd.ms-powerpoint';
          } else if (docSuffix[docSuffix.length - 1] == "pptx") {
            type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          }

          $cordovaFileOpener2.open(targetPath, type)
            .then(function () {
              console.log("Success!")
            }, function (err) {
              console.log("open:" + err.message);
            });
        }
      }
    }])

  .factory('CameraUtil', ['$q', '$cordovaFile', 'DateUtil', 'pathUtil', function ($q, $cordovaFile, DateUtil, pathUtil) {
    //拍照存储
    function takePhoto(dirName, fileNamePrefix) {
      var def = $q.defer();

      var pictureSource = navigator.camera.PictureSourceType;
      var destinationType = navigator.camera.DestinationType;

      navigator.camera.getPicture(onSuccessPic, failure,
        {
          quality: 70,
          destinationType: destinationType.FILE_URI,
          sourceType: pictureSource.CAMERA,
          allowEdit: false,
          targetHeight: 600,
          targetWidth: 600,
          correctOrientation: true
        }
      );

      function failure(error) {
        def.reject(error);
      }

      //照片名称为 时间戳
      function onSuccessPic(imageURI) {
        var basePath = pathUtil.getBasePath();
        var newName = DateUtil.DateFormat() + ".png";
        if (fileNamePrefix) {
          var arr = fileNamePrefix.split('.');
          if (arr[arr.length - 1] == 'png' || arr[arr.length - 1] == 'jpg') {
            newName = fileNamePrefix;
          } else {
            // newName = fileNamePrefix ? fileNamePrefix + '-' + newName : newName;
            newName = fileNamePrefix + '-' + newName
          }
        }
        $cordovaFile.checkDir(basePath, dirName)
          .then(function (success) {
            // 如果有这个文件夹，则直接实现移动
            moveFile(imageURI, basePath + dirName + "/", newName);
          }, function (error) {
            // 如果没有这个文件夹，则先创建再移动
            $cordovaFile.createDir(basePath, dirName, false)
              .then(function (success) {
                moveFile(imageURI, basePath + dirName + "/", newName);
              }, function (error) {
                def.reject(error);
              });
          });
      };

      //移动文件
      function moveFile(fileUri, targetPath, newName) {
        window.resolveLocalFileSystemURL(fileUri, function (fileEntry) {
          window.resolveLocalFileSystemURL(targetPath, function (dirEntry) {
              fileEntry.moveTo(dirEntry, newName, function (entry) {
                //返回文件路径
                def.resolve(entry.toURL());
              }, function (error) {
                // alert("移动出错");
                def.reject(error);
              });
            },
            function (error) {
              // alert("解析目标路径出错");
              def.reject(error);
            });
        }, function (error) {
          // alert("解析源路径出错");
          def.reject(error);
        });
      };

      return def.promise;
    };

    return {
      takePhoto: takePhoto
    }

  }])


  .factory('chart', ['$rootScope', function ($rootScope) {

    function getInstance(id) {
      var node = document.getElementById(id);
      return node && (echarts.getInstanceByDom(node) || echarts.init(node));
    }

    // 环图
    return {
      showPie: function (id, data) {
        var element = getInstance(id);
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b} <br/>{c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              hoverOffset:5,
              type: 'pie',
              radius: ['60%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 24, name: '调光器', itemStyle: {normal: {color: "#FFCF54"}}},
                {value: 8, name: '消防', itemStyle: {normal: {color: "#FF7777"}}},
                {value: 74, name: '其它', itemStyle: {normal: {color: "#1fb5ff"}}},
              ]
            }
          ]
        };

        element.setOption(option, true);

      }

    }

  }])
;
