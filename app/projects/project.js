'use strict';

angular.module('myApp.controller.projects.project', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:user/:project', {
            templateUrl: 'projects/project.html',
            controller: 'ProjectsProjectCtrl'
        });
    }])

    .controller('ProjectsProjectCtrl', ['$scope', '$routeParams', 'Github', 'config', 'Leaderboard',
        function ($scope, $routeParams, Github, config, Leaderboard) {
            $scope.name = $routeParams.user + '/' + $routeParams.project;

            $scope.project = Leaderboard.projects()[$scope.name];
            $scope.contributors = Leaderboard.contributors();

            $scope.$on('leaderboardUpdated', function() {
                $scope.project = Leaderboard.projects()[$scope.name];
                $scope.contributors = Leaderboard.contributors();
            });
        }
    ]);
