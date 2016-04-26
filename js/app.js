// create app
var app = angular.module('myApp', [
  '720kb.tooltips'
]);

// set up controller
app.controller('ARodController', function($http) {

    console.log("success!");

    // load json data
    this.homeruns = [];
    var _this = this;
    $http.get('js/homeruns.json')
      .success(function(data){
        _this.homeruns = data;
      })
      .error(function(msg) {
      });
});
