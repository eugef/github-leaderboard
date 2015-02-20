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
                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], $scope.weeksOffset, forceUpdate);
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

            function loadProjectContributors(projectName, weeksOffset, forceUpdate) {
                var startWeek = startOfTheWeek(weeksOffset);
                var endWeek = endOfTheWeek();
                $scope.startWeek = startWeek * 1000;
                $scope.endWeek = endWeek * 1000;

                Github.contributors(projectName, forceUpdate).then(function(data) {
                    var project = projectsLeaderboard.project(projectName);
                                        
                    for (var c = 0; c < data.length; c++) {
                        var contributor = data[c].author.login;
                        project.clearCommitment(contributor);
                        
                        if (data[c].weeks) {
                            var weekData = data[c].weeks;
                            
                            for (var w = weekData.length - 1; w >= 0; w--) {
                                if (weekData[w].w >= startWeek) {
                                    project.addCommitment(contributor, weekData[w].w, {
                                        add: weekData[w].a,
                                        delete: weekData[w].d,
                                        commit: weekData[w].c
                                    });
                                } else {
                                    break;
                                }
                            }
                        }

                        project.calculatePoints(contributor);
                    }

                    $scope.leaderboard = projectsLeaderboard.projects();
                });
            }

            $scope.updateLeaderboard();
        }
    ]);
