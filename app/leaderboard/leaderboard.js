'use strict';

angular.module('myApp.leaderboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/leaderboard', {
            templateUrl: 'leaderboard/leaderboard.html',
            controller: 'LeaderboardCtrl'
        });
    }])

    .filter('toDictionaryArray', function () {
        return function (obj) {
            if (!(obj instanceof Object)) return obj;

            var arr = [];
            for (var key in obj) {
                arr.push({ key: key, value: obj[key] });
            }
            return arr;
        }
    })

    .controller('LeaderboardCtrl', ['$scope', 'Github', 'config', 'ContributorLeaderboardModel',
        function ($scope, Github, config, ContributorLeaderboard) {
            $scope.leaderboard = {};

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
            };
            
            var contributorsLeaderboard = new ContributorLeaderboard();
            
            function loadProjectContributors(project) {
                Github.contributors(project).then(function(data) {
                    console.log(project, data);

                    for (var c = 0; c < data.length; c++) {
                        var contributor = contributorsLeaderboard.contributor(data[c].author);
                        contributor.addTotal(project, data[c].total);

                        if (data[c].weeks) {
                            var weekData = data[c].weeks;
                            for (var w = weekData.length - 1; w >= Math.max(0, weekData.length - config.commitment_weeks); w--) {
                                contributor.addCommitment(project, weekData[w].w, {
                                    add: weekData[w].a,
                                    delete: weekData[w].d,
                                    commit: weekData[w].c
                                });
                            }
                        }
                        
                        contributor.calculateRanks(project);
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
