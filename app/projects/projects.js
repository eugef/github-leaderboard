'use strict';

angular.module('myApp.controller.projects', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/projects.html',
            controller: 'ProjectsCtrl'
        });
    }])

    .controller('ProjectsCtrl', ['$scope', 'Github', 'config', 'ProjectsLeaderboardModel',
        function ($scope, Github, config, ProjectsLeaderboard) {
            var projectsLeaderboard = new ProjectsLeaderboard();

            $scope.leaderboard = {};
            $scope.weeksOffset = 1;
            $scope.startWeek = null;
            $scope.endWeek = null;

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
            };

            $scope.refresh = function() {
                $scope.updateLeaderboard(true);
            };

            $scope.setRange = function(weeksOffset) {
                if ($scope.weeksOffset != weeksOffset) {
                    $scope.weeksOffset = weeksOffset;
                    $scope.updateLeaderboard();
                }
            };

            $scope.isRange = function(weeksOffset) {
                return $scope.weeksOffset == weeksOffset;
            };

            $scope.updateLeaderboard = function(forceUpdate) {
                forceUpdate = forceUpdate || false;

                var startWeek = startOfTheWeek($scope.weeksOffset);
                $scope.startWeek = startWeek * 1000;
                $scope.endWeek = endOfTheWeek() * 1000;

                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], startWeek, forceUpdate);
                }
            };

            function offsetDay(offset) {
                return moment().day(offset).hour(0).minute(0).second(0).utcOffset(0).format('X');
            }

            function startOfTheWeek(weekOffset) {
                return offsetDay(-7 * weekOffset);
            }

            function endOfTheWeek() {
                return offsetDay(6);
            }

            function loadProjectContributors(projectName, startWeek, forceUpdate) {
                Github.contributors(projectName, forceUpdate).then(function(data) {
                    projectsLeaderboard.populateProject(projectName, data, startWeek);
                    $scope.leaderboard = projectsLeaderboard.projects();
                });
            }

            $scope.updateLeaderboard();
        }
    ]);
