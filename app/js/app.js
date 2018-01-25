'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'mCtrl1'});
  $routeProvider.when('/product/:category', {templateUrl: 'partials/search_result.html', controller: 'mCtrl2'});
  $routeProvider.when('/product/:category?search', {templateUrl: 'partials/search_result.html', controller: 'mCtrl2'});
  $routeProvider.when('/product/detail/:id', {templateUrl: 'partials/product_detail.html', controller: 'mCtrl3'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
