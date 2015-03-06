'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location', 'Github', 'config', 'Leaderboard',
        function ($scope, $location, Github, config, Leaderboard) {
            $scope.progress = {
                total: config.projects.length,
                current: 0
            };
            $scope.weeksOffset = null;
            $scope.startWeek = null;
            $scope.endWeek = null;

            function offsetDay(offset) {
                return moment().utcOffset(0).day(offset).hour(0).minute(0).second(0).format('X');
            }

            function startOfTheWeek(weekOffset) {
                return offsetDay(-7 * weekOffset);
            }

            function endOfTheWeek() {
                return offsetDay(6);
            }

            function updateLeaderboard(forceUpdate) {
                forceUpdate = forceUpdate || false;

                $scope.progress.current = 0;

                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], $scope.startWeek, forceUpdate);
                }
            }

            function loadProjectContributors(projectName, startWeek, forceUpdate) {
                Github.contributors(projectName, forceUpdate).then(function(data) {
                    Leaderboard.populateProject(projectName, data, startWeek);
                    $scope.$broadcast('leaderboardUpdated');
                }).finally(function(){
                    $scope.progress.current ++;
                });
            }

            $scope.isRange = function(weeksOffset) {
                return $scope.weeksOffset == weeksOffset;
            };

            $scope.setRange = function(weeksOffset) {
                if ($scope.weeksOffset != weeksOffset) {
                    $scope.weeksOffset = weeksOffset;
                    $scope.startWeek = startOfTheWeek(weeksOffset);
                    $scope.endWeek = endOfTheWeek();

                    updateLeaderboard();
                }
            };

            $scope.refresh = function() {
                updateLeaderboard(true);
            };

            $scope.hasUrl = function(url) {
                return url == $location.url();
            };

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
            };

            $scope.setRange(1);
        }
    ]);
