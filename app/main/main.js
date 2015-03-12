'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location', '$interval', 'Github', 'config', 'Leaderboard',
        function ($scope, $location, $interval, Github, config, Leaderboard) {
            $scope.progress = {
                total: config.projects.length,
                current: 0
            };
            $scope.refreshRate = 0;
            $scope.weeksOffset = null;
            $scope.startWeek = null;
            $scope.endWeek = null;

            var refreshPromise = null;

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

                    if (weeksOffset == -1) {
                        $scope.startWeek = 0
                    } else {
                        $scope.startWeek = startOfTheWeek(weeksOffset);
                    }
                    $scope.endWeek = endOfTheWeek();

                    updateLeaderboard();
                }
            };

            $scope.isRefresh = function(refreshRate) {
                return $scope.refreshRate == refreshRate;
            };

            $scope.setRefresh = function(refreshRate) {
                if ($scope.refreshRate != refreshRate) {
                    $scope.refreshRate = refreshRate;
                    if (refreshPromise) {
                        $interval.cancel(refreshPromise);
                    }
                    if (refreshRate) {
                        refreshPromise = $interval($scope.refresh, refreshRate * 60 * 1000);
                        console.log(refreshPromise);
                    }
                }
            };

            $scope.refresh = function() {
                updateLeaderboard(true);
            };

            $scope.inUrl = function(url) {
                return $location.url().indexOf(url) !== -1;
            };

            $scope.greaterThan = function(field, value){
                function index(obj, i) {
                    return obj[i];
                }
                return function(item){
                    return field.split('.').reduce(index, item) > value;
                }
            };

            $scope.setRange(1);
        }
    ]);
