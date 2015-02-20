'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngOrderObjectBy',
    'ui.bootstrap',
    'angular-data.DSCacheFactory',
    'myApp.config',
    'myApp.github',
    'myApp.model.contributor',
    'myApp.model.contributorsLeaderboard',
    'myApp.model.project',
    'myApp.model.projectsLeaderboard',
    'myApp.controller.leaderboard',
    'myApp.controller.projects'
]).

    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/leaderboard'});
    }]);
