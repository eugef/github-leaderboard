'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'angular-capitalize-filter',
    'angular-data.DSCacheFactory',
    'angular-md5',
    'googlechart',
    'ngOrderObjectBy',
    'ngRoute',
    'ui.bootstrap',
    'myApp.config',
    'myApp.service.github',
    'myApp.service.leaderboard',
    'myApp.model.commitment',
    'myApp.model.contributor',
    'myApp.model.project',
    'myApp.controller.main',
    'myApp.controller.contributors.leaderboard',
    'myApp.controller.contributors.contributor',
    'myApp.controller.projects.leaderboard',
    'myApp.controller.projects.project'
]).

    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/contributors'});
    }]);
