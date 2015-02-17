'use strict';

angular.module('myApp.leaderboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/leaderboard', {
            templateUrl: 'leaderboard/leaderboard.html',
            controller: 'LeaderboardCtrl'
        });
    }])

    .controller('LeaderboardCtrl', ['$scope', 'Github', 'config', 'ContributorLeaderboardModel',
        function ($scope, Github, config, ContributorLeaderboard) {
            var contributorsLeaderboard = new ContributorLeaderboard();

            $scope.leaderboard = {};
            $scope.weeksOffset = 1;
            $scope.startWeek = null;
            $scope.endWeek = null;

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
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

            $scope.updateLeaderboard = function() {
                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], $scope.weeksOffset);
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

            function loadProjectContributors(project, weeksOffset) {
                var startWeek = startOfTheWeek(weeksOffset);
                var endWeek = endOfTheWeek();
                $scope.startWeek = startWeek * 1000;
                $scope.endWeek = endWeek * 1000;

                Github.contributors(project).then(function(data) {
                    console.log(project, data);

                    for (var c = 0; c < data.length; c++) {
                        var contributor = contributorsLeaderboard.contributor(data[c].author);
                        contributor.clearCommitment(project);

                        if (data[c].weeks) {
                            var weekData = data[c].weeks;
                            for (var w = weekData.length - 1; w >= 0; w--) {
                                if (weekData[w].w >= startWeek) {
                                    contributor.addCommitment(project, weekData[w].w, {
                                        add: weekData[w].a,
                                        delete: weekData[w].d,
                                        commit: weekData[w].c
                                    });
                                } else {
                                    break;
                                }
                            }
                        }
                        
                        contributor.calculatePoints(project);
                    }


                    $scope.leaderboard = contributorsLeaderboard.contributors();
                    console.log($scope.leaderboard);
                });
            }

            $scope.updateLeaderboard();
        }
    ]);
