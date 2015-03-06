'use strict';

angular.module('myApp.controller.projects.leaderboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/leaderboard.html',
            controller: 'ProjectsLeaderboardCtrl'
        });
    }])

    .controller('ProjectsLeaderboardCtrl', ['$scope', 'Github', 'config', 'Leaderboard',
        function ($scope, Github, config, Leaderboard) {
            $scope.leaderboard = Leaderboard.projects();

            $scope.$on('leaderboardUpdated', function() {
                $scope.leaderboard = Leaderboard.projects();
            });
        }
    ]);
