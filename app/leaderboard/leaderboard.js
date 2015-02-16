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
            $scope.leaderboard = {};
            $scope.startWeek = null;
            $scope.endWeek = null;

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
            };
            
            var contributorsLeaderboard = new ContributorLeaderboard();

            function startOfTheWeek(weekOffset) {
                return moment().day(-7 * weekOffset).hour(0).minute(0).second(0).utcOffset(0).format('X');
            }

            function endOfTheWeek() {
                return moment().day(6).hour(23).minute(59).second(59).utcOffset(0).format('X');
            }

            function loadProjectContributors(project) {
                var startWeek = startOfTheWeek(config.commitment_weeks - 1);
                var endWeek = endOfTheWeek();
                $scope.startWeek = startWeek * 1000;
                $scope.endWeek = endWeek * 1000;

                Github.contributors(project).then(function(data) {
                    console.log(project, data);

                    for (var c = 0; c < data.length; c++) {
                        var contributor = contributorsLeaderboard.contributor(data[c].author);
                        contributor.addTotal(project, data[c].total);

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
            
            for (var i = 0; i < config.projects.length; i++) {
                loadProjectContributors(config.projects[i]);
            }
        }
    ]);
