'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngOrderObjectBy',
    'ui.bootstrap',
    'myApp.config',
    'myApp.github',
    'myApp.leaderboard',
    'myApp.model.contributor',
    'myApp.model.contributorsLeaderboard'
]).

    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/leaderboard'});
    }]);
