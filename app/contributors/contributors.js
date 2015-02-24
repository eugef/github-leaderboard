'use strict';

angular.module('myApp.controller.contributors', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contributors', {
            templateUrl: 'contributors/contributors.html',
            controller: 'ContributorsCtrl'
        });
    }])

    .controller('ContributorsCtrl', ['$scope', 'Github', 'config', 'Leaderboard',
        function ($scope, Github, config, Leaderboard) {
            $scope.leaderboard = {};
            $scope.weeksOffset = 1;
            $scope.startWeek = null;
            $scope.endWeek = null;

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

                $scope.$parent.progress.current = 0;
                
                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], startWeek, forceUpdate);
                }
            };

            function offsetDay(offset) {
                return moment().utcOffset(0).day(offset).hour(0).minute(0).second(0).format('X');
            }
            
            function startOfTheWeek(weekOffset) {
                return offsetDay(-7 * weekOffset);
            }

            function endOfTheWeek() {
                return offsetDay(6);
            }

            function loadProjectContributors(projectName, startWeek, forceUpdate) {
                Github.contributors(projectName, forceUpdate).then(function(data) {
                    Leaderboard.populateProject(projectName, data, startWeek);
                    $scope.leaderboard = Leaderboard.contributors();
                }).finally(function(){
                    $scope.$parent.progress.current ++;
                });
            }

            $scope.updateLeaderboard();
        }
    ]);
