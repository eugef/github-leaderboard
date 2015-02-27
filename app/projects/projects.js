'use strict';

angular.module('myApp.controller.projects', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/projects.html',
            controller: 'ProjectsCtrl'
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'Github', 'config', 'Leaderboard',
        function ($scope, Github, config, Leaderboard) {
            $scope.leaderboard = {};

            $scope.$on('refresh', function() {
                $scope.updateLeaderboard(true);
            });

            $scope.$on('setRange', function() {
                $scope.updateLeaderboard();
            });

            $scope.updateLeaderboard = function(forceUpdate) {
                forceUpdate = forceUpdate || false;

                $scope.$parent.progress.current = 0;

                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], $scope.$parent.startWeek, forceUpdate);
                }
            };

            function loadProjectContributors(projectName, startWeek, forceUpdate) {
                Github.contributors(projectName, forceUpdate).then(function(data) {
                    Leaderboard.populateProject(projectName, data, startWeek);
                    $scope.leaderboard = Leaderboard.projects();
                }).finally(function(){
                    $scope.$parent.progress.current ++;
                });
            }

            $scope.updateLeaderboard();
        }
    ]);
