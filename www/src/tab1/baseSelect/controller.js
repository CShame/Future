/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('baseSelectCtrl', function ($scope) {

    $scope.options2 = {
      title: '请选择',
      list: [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}, {name: 'test4'}, {name: 'test5'}, {name: 'test6'}, {name: 'test7'}],
      attrName: 'name'
    };


  });
