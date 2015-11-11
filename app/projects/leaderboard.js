'use strict';

angular.module('myApp.controller.projects.leaderboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/leaderboard.html',
            controller: 'ProjectsLeaderboardCtrl',
            controllerAs: 'projectsLeaderboard'
        });
    }])

    .controller('ProjectsLeaderboardCtrl', ['$scope', 'Github', 'config', 'Leaderboard',
        function ($scope, Github, config, Leaderboard) {
            this.data = Leaderboard.projects();

            $scope.$on('leaderboardUpdated', angular.bind(this, function () {
                this.data = Leaderboard.projects();
            }));
        }
    ]);
