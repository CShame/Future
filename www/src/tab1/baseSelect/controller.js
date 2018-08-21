/**
 * Created by ws on 2018/8/6.
 */
angular.module('starter.controllers')
  .controller('baseSelectCtrl', function ($scope) {

    $scope.options = {
      title: '请选择',
      list: [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}, {name: 'test4'}, {name: 'test5'}, {name: 'test6'}, {name: 'test7'}],
      attrName: 'name'
    };

    $scope.options1 = {
      title: '选择项目',
      list: [{name: '哈哈哈哈'}, {name: '遂宁市'}, {name: '是实打实的'}, {name: '试试'}, {name: '试试1'}, {name: '试试2'}, {name: '少时诵诗书'}],
      attrName: 'name'
    };

    $scope.options2 = {
      list: [
        {
          "ProjectCode": null,
          "NodeCode": "001",
          "NodeText": "东北地区",
          "Children": [
            {
              "ProjectCode": null,
              "NodeCode": "001001",
              "NodeText": "沈阳市",
              "Children": []
            },
            {
              "ProjectCode": null,
              "NodeCode": "001002",
              "NodeText": "大连市",
              "Children": [{
                "ProjectCode": null,
                "NodeCode": "001002004",
                "NodeText": "甘井子区",
                "Children": []
              }]
            }]
        }, {
          "ProjectCode": null,
          "NodeCode": "002",
          "NodeText": "华北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "002001",
            "NodeText": "北京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002001003",
              "NodeText": "朝阳区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "002002",
            "NodeText": "天津市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002002003",
              "NodeText": "河东区",
              "Children": []
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "003",
          "NodeText": "华中地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "003001",
            "NodeText": "武汉市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "003001007",
              "NodeText": "洪山区",
              "Children": []
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004",
          "NodeText": "华东地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004001",
            "NodeText": "上海市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004001014",
              "NodeText": "青浦区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004002",
            "NodeText": "杭州市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004002007",
              "NodeText": "萧山区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004003",
            "NodeText": "南京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004003003",
              "NodeText": "建邺区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004004",
            "NodeText": "烟台市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004004004",
              "NodeText": "莱山区",
              "Children": [{
                "ProjectCode": 51122,
                "NodeCode": "004004004-51122",
                "NodeText": "烟台金地澜悦",
                "Children": []
              }]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "005",
          "NodeText": "华南地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "005001",
            "NodeText": "深圳市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005001001",
              "NodeText": "南山区",
              "Children": [{
                "ProjectCode": 7,
                "NodeCode": "005001001-7",
                "NodeText": "亿达别苑",
                "Children": []
              }, {"ProjectCode": 396, "NodeCode": "005001001-396", "NodeText": "深圳金地国际公寓", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001002",
              "NodeText": "福田区",
              "Children": [{
                "ProjectCode": 9,
                "NodeCode": "005001002-9",
                "NodeText": "深圳金海湾花园",
                "Children": []
              }, {"ProjectCode": 12, "NodeCode": "005001002-12", "NodeText": "深圳金地翠堤湾", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001007",
              "NodeText": "龙华区",
              "Children": []
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "005003",
            "NodeText": "佛山市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005003003",
              "NodeText": "顺德区",
              "Children": []
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "007",
          "NodeText": "西北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "007001",
            "NodeText": "西安市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "007001006",
              "NodeText": "雁塔区",
              "Children": []
            }]
          }]
        }],
      title: '项目范围选择',
      levelOneAttr: 'NodeText',
      levelTwoAttr: 'NodeText'
    };

    $scope.options3 = {
      list: [
        {
          "ProjectCode": null,
          "NodeCode": "001",
          "NodeText": "东北地区",
          "Children": [
            {
              "ProjectCode": null,
              "NodeCode": "001001",
              "NodeText": "沈阳市",
              "Children": [
                {
                  "ProjectCode": null,
                  "NodeCode": "001001006",
                  "NodeText": "浑南区",
                  "Children": [{
                    "ProjectCode": 395,
                    "NodeCode": "001001006-395",
                    "NodeText": "沈阳金地长青湾",
                    "Children": []
                  }]
                }
              ]
            },
            {
              "ProjectCode": null,
              "NodeCode": "001002",
              "NodeText": "大连市",
              "Children": [{
                "ProjectCode": null,
                "NodeCode": "001002004",
                "NodeText": "甘井子区",
                "Children": [{"ProjectCode": 394, "NodeCode": "001002004-394", "NodeText": "大连金地艺境", "Children": []}]
              }]
            }]
        }, {
          "ProjectCode": null,
          "NodeCode": "002",
          "NodeText": "华北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "002001",
            "NodeText": "北京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002001003",
              "NodeText": "朝阳区",
              "Children": [{"ProjectCode": 393, "NodeCode": "002001003-393", "NodeText": "北京金地国际花园", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "002002",
            "NodeText": "天津市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "002002003",
              "NodeText": "河东区",
              "Children": [{"ProjectCode": 385, "NodeCode": "002002003-385", "NodeText": "天津金地紫乐府", "Children": []}]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "003",
          "NodeText": "华中地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "003001",
            "NodeText": "武汉市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "003001007",
              "NodeText": "洪山区",
              "Children": [{"ProjectCode": 388, "NodeCode": "003001007-388", "NodeText": "武汉金地圣爱米伦", "Children": []}]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "004",
          "NodeText": "华东地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "004001",
            "NodeText": "上海市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004001014",
              "NodeText": "青浦区",
              "Children": [{"ProjectCode": 390, "NodeCode": "004001014-390", "NodeText": "上海金地天御", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004002",
            "NodeText": "杭州市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004002007",
              "NodeText": "萧山区",
              "Children": [{"ProjectCode": 389, "NodeCode": "004002007-389", "NodeText": "杭州金地天逸", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004003",
            "NodeText": "南京市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004003003",
              "NodeText": "建邺区",
              "Children": [{"ProjectCode": 391, "NodeCode": "004003003-391", "NodeText": "南京金地名京", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "004004",
            "NodeText": "烟台市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "004004004",
              "NodeText": "莱山区",
              "Children": [{
                "ProjectCode": 51122,
                "NodeCode": "004004004-51122",
                "NodeText": "烟台金地澜悦",
                "Children": []
              }]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "005",
          "NodeText": "华南地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "005001",
            "NodeText": "深圳市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005001001",
              "NodeText": "南山区",
              "Children": [{
                "ProjectCode": 7,
                "NodeCode": "005001001-7",
                "NodeText": "亿达别苑",
                "Children": []
              }, {"ProjectCode": 396, "NodeCode": "005001001-396", "NodeText": "深圳金地国际公寓", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001002",
              "NodeText": "福田区",
              "Children": [{
                "ProjectCode": 9,
                "NodeCode": "005001002-9",
                "NodeText": "深圳金海湾花园",
                "Children": []
              }, {"ProjectCode": 12, "NodeCode": "005001002-12", "NodeText": "深圳金地翠堤湾", "Children": []}]
            }, {
              "ProjectCode": null,
              "NodeCode": "005001007",
              "NodeText": "龙华区",
              "Children": [{"ProjectCode": 386, "NodeCode": "005001007-386", "NodeText": "深圳金地天悦湾", "Children": []}]
            }]
          }, {
            "ProjectCode": null,
            "NodeCode": "005003",
            "NodeText": "佛山市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "005003003",
              "NodeText": "顺德区",
              "Children": [{"ProjectCode": 387, "NodeCode": "005003003-387", "NodeText": "佛山金地天玺", "Children": []}]
            }]
          }]
        }, {
          "ProjectCode": null,
          "NodeCode": "007",
          "NodeText": "西北地区",
          "Children": [{
            "ProjectCode": null,
            "NodeCode": "007001",
            "NodeText": "西安市",
            "Children": [{
              "ProjectCode": null,
              "NodeCode": "007001006",
              "NodeText": "雁塔区",
              "Children": [{"ProjectCode": 392, "NodeCode": "007001006-392", "NodeText": "西安湖城大境天第", "Children": []}]
            }]
          }]
        }],
      title: '项目范围选择',
      levelOneAttr: 'NodeText',
      levelTwoAttr: 'NodeText',
      levelThreeAttr: 'NodeText',
    };

    $scope.options4 = {
      title: '请选择原因',
      list: [{value: 1, Remark: '道行不够'}, {value: 2, Remark: '材料不齐'}, {value: 3, Remark: '缺材料'}, {
        value: 4,
        Remark: '其它'
      }],
      attrName: 'Remark'
    };

    $scope.btnOk = function () {
      console.log('点击成OK', $scope.options4);
    }



  });
