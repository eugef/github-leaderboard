'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location', '$interval', 'Github', 'config', 'Leaderboard',
        function ($scope, $location, $interval, Github, config, Leaderboard) {
            this.progress = {
                total: config.projects.length,
                current: 0
            };
            this.refreshRate = 0;
            this.weeksOffset = null;
            this.startWeek = null;
            this.endWeek = null;
            this.sortItem = 'points';

            var refreshPromise = null;

            var offsetDay = function (offset) {
                return moment().utcOffset(0).day(offset).hour(0).minute(0).second(0).format('X');
            };

            var startOfTheWeek = function (weekOffset) {
                return offsetDay(-7 * weekOffset);
            };

            var endOfTheWeek = function () {
                return offsetDay(6);
            };

            this.updateLeaderboard = function (forceUpdate) {
                forceUpdate = forceUpdate || false;

                if (this.weeksOffset == -1) {
                    this.startWeek = 0
                } else {
                    this.startWeek = startOfTheWeek(this.weeksOffset);
                }
                this.endWeek = endOfTheWeek();

                this.progress.current = 0;

                for (var i = 0; i < config.projects.length; i++) {
                    loadProjectContributors(config.projects[i], this.startWeek, forceUpdate)
                        .finally(angular.bind(this, function () {
                            this.progress.current++;
                        })
                    );
                }
            };

            var loadProjectContributors = function (projectName, startWeek, forceUpdate) {
                return Github.contributors(projectName, forceUpdate).then(function (data) {
                    Leaderboard.populateProject(projectName, data, startWeek);
                    $scope.$broadcast('leaderboardUpdated');
                });
            };

            this.isRange = function (weeksOffset) {
                return this.weeksOffset == weeksOffset;
            };

            this.setRange = function (weeksOffset) {
                if (this.weeksOffset != weeksOffset) {
                    this.weeksOffset = weeksOffset;

                    this.updateLeaderboard();
                }
            };

            this.isRefresh = function (refreshRate) {
                return this.refreshRate == refreshRate;
            };

            this.setRefresh = function (refreshRate) {
                if (this.refreshRate != refreshRate) {
                    this.refreshRate = refreshRate;
                    if (refreshPromise) {
                        $interval.cancel(refreshPromise);
                    }
                    if (refreshRate) {
                        refreshPromise = $interval(this.refresh, refreshRate * 60 * 1000);
                    }
                }
            };

            this.isSortItem = function (sortItem) {
                return this.sortItem == sortItem;
            };

            this.setSortItem = function (sortItem) {
                if (this.sortItem != sortItem) {
                    this.sortItem = sortItem;
                }
            };

            this.sortItemStyle = function () {
                var styles = {
                    points: 'default',
                    commits: 'info',
                    additions: 'success',
                    deletions: 'danger'
                };

                return styles[this.sortItem];
            };

            this.refresh = function () {
                this.updateLeaderboard(true);
            };

            this.inUrl = function (url) {
                return $location.url().indexOf(url) !== -1;
            };

            this.greaterThan = function (field, value) {
                function index(obj, i) {
                    return obj[i];
                }

                return function (item) {
                    return field.split('.').reduce(index, item) > value;
                }
            };

            this.setRange(1);
        }
    ]);
