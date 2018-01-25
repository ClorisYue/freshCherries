'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  // navbar Controller
  .controller('mCtrl0', ['$scope', '$location', function($scope, $location) {
    // console.log("url", $location.url());
    var tem = $location.url().indexOf('/', 1);
    if(tem==-1)$scope.selectNav = 'home';

    // get current location to highlight according nav item after refresh the page
    if(tem>1) $scope.selectNav = $location.url().substr(tem+1);
    var tem2 = $location.url().indexOf('?', 1);
    if (tem2>1) {
      $scope.selectNav = $location.url().substr(tem+1, tem2-tem-1);
    };
    if ($scope.selectNav == undefined) {$scope.selectNav = 'home'};
      console.log("here", $scope.selectNav);
  }])

  // Home Page Controller
  .controller('mCtrl1', ['$scope', '$http', function($scope, $http) {
    // get product list
    $http.get('json/data.json').then(function(data) {
      // console.log(data);
      $scope.bestRates = {};
      var tem = {};
      tem = data.data.data;
      // sort by rate
      function sortByRate(a, b) {
        return a.rate - b.rate;
      }
      tem.sort(sortByRate);
      // get the top 6 products
      for (var i = 5; i >= 0; i--) {
        $scope.bestRates[i] = tem[i];
      };
      // console.log($scope.bestRates);

    }, function error() {
      alert("Cannot get the data.");
    });

    // show search field on the nav on other pages except the homepage
    $('#search-input').addClass('homepage-search');

    $scope.$on("$destroy", function() {
      $('#search-input').removeClass('homepage-search');
    })


  }])

  //  Search Result Controller
  .controller('mCtrl2', ['$scope', '$http', "$routeParams", function($scope, $http, $routeParams) {
    $scope.category = $routeParams.category;
    $scope.searchText = $routeParams.search;
    // console.log($scope.searchText);console.log("here");
    if ($scope.category == 'sanitaryPads') $scope.category = 'sanitary pad';
    if ($scope.category == 'all') $scope.category = '';

    console.log($scope.category);
    $http.get('json/data.json').then(function(data) {
      $scope.items = data.data.data;
      // default to order by rate
      $scope.orderType = 'rate';
      $scope.sortOrder = true;
    }, function error() {
      alert("Cannot get the data.");
    });
    // change ober type after user selecting according filters
    $scope.sort = function(id) {
      console.log("hi");
      if (id == 1 || id == 2) $scope.orderType = 'price';
      if (id == 3 || id == 4) $scope.orderType = 'rate';
      if (id == 3 || id == 1) $scope.sortOrder = true;
      if (id == 2 || id == 4) $scope.sortOrder = false;
    }

    $scope.categories = [{'name':'sanitary pad', 'on': false}, {'name':'tampon', 'on':false}, {'name':'cup', 'on':false}, {'name':'other', 'on':false}];
    
    // filter selected caxtegories
    $scope.checkboxFilter = function(a) {
      var count = 0;
      for (var i = 0; i < 4; i++) {
        if ($scope.categories[i].on == false)count++; 
      }
      console.log(a.name, count);
      // if no category selected, show all
      if (count == 4) { return true; }

      for(var cat in $scope.categories){
          var t = $scope.categories[cat];
          if(t.on && a.category == t.name){
              return true;   
          }               
      }
    };
  }])

  //  Product Detail Controller
  .controller('mCtrl3', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('json/data.json').then(function(data) {
      var tem = data.data.data;
      // find the according product
      for (var i = tem.length - 1; i >= 0; i--) {
        if (tem[i].id == $routeParams.id) {
          $scope.product = tem[i];
          break;
        }
      };
      // console.log($scope.product);
    }, function error() {
      alert("Cannot get the data.");
    });

    $http.get('json/comments.json').then(function(data) {
      var tem = data.data.data;
      $scope.comments_json = tem;

    }, function error() {
      alert("Cannot get the comments.");
    });

    // control rate popover
    $("[data-toggle=popover]").popover({
      html: true,
      content: function() {
        return $("#popover-content").html();
      }
    });

    $scope.comments = [];
    $scope.btn_post = function() {
      if ($scope.cmtName != '') {
        var dataObj = {
          'time': 'Dec 5, 2017',
          'name': 'anonymity',
          'img': 'userimage4',
          'content': $scope.cmtName
        };
				$scope.comments_json.push(dataObj);
				console.log($scope.comments_json)
				$scope.cmtName = "";
        var res = $http.post('rest/comments', dataObj);
        console.log($scope.comments);
      }
    }
    $scope.post_cmt = function($home) {
      $scope.comments.splice($home, 1);
    }

  }]);
