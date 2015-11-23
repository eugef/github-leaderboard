'use strict';

angular.module('myApp.controller.contributors.contributor', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contributors/:contributor', {
            templateUrl: 'contributors/contributor.html',
            controller: 'ContributorsContributorCtrl',
            controllerAs: 'contributor'
        });
    }])

    .controller('ContributorsContributorCtrl', ['$scope', '$routeParams', 'Github', 'config', 'Leaderboard', 'CommitmentModel',
        function ($scope, $routeParams, Github, config, Leaderboard, Commitment) {
            var name = $routeParams.contributor;

            this.data = {};
            var chart = {
                type: 'ColumnChart',
                data: {
                    cols: [
                        {id: 'week', type: 'string'},
                        {id: 'value', type: 'number'}
                    ],
                    rows: []
                },
                options: {
                    backgroundColor: 'transparent',
                    chartArea: {
                        top: '10',
                        left: '40',
                        height: '100%',
                        width: '100%'
                    },
                    legend: {position: 'none'},
                    vAxis: {
                        baselineColor: '#3e4348',
                        gridlines: {color: '#3e4348'},
                        minValue: 0,
                        textStyle: {color: '#c8c8c8'}
                    }
                }
            };

            var populateChart = function (commitments) {
                var chartData = {};
                var chartRows = {
                    'points': [],
                    'commits': [],
                    'additions': [],
                    'deletions': []
                };

                /**
                 * Populate row skipping leading empty weeks
                 * @param {Number} week
                 * @param {String} type
                 * @param {Number} value
                 */
                var addChartRow = function (week, type, value) {
                    if (chartRows[type].length || value) {
                        chartRows[type].push({
                            c: [
                                {v: moment.unix(week).add(1, 'day').format('D MMM YY')},
                                {v: value}
                            ]
                        })
                    }
                };

                /* group commitments by week */
                angular.forEach(commitments, function (weeks) {
                    angular.forEach(weeks, function (commitment, week) {
                        chartData[week] = chartData[week] || Commitment.create();
                        chartData[week].add(commitment);
                    })
                });

                /* populate rows */
                angular.forEach(chartData, angular.bind(this, function (data, week) {
                    addChartRow(week, 'points', data.points());
                    addChartRow(week, 'commits', data.commits);
                    addChartRow(week, 'additions', data.additions);
                    addChartRow(week, 'deletions', data.deletions);
                }));

                return chartRows;
            };

            this.chart = function (sortItem) {
                var chartColors = {
                    points: '#7a8288',
                    commits: '#5bc0de',
                    additions: '#62c462',
                    deletions: '#ee5f5b'
                };

                chart.data.rows = chart.data.rowsAll[sortItem];
                chart.options.colors = [chartColors[sortItem]];
                return chart;
            };

            this.update = function () {
                this.data = Leaderboard.contributors()[name];

                chart.data.rows = [];
                if (this.data && this.data.commitments) {
                    chart.data.rowsAll = populateChart(this.data.commitments);
                }
            };

            $scope.$on('leaderboardUpdated', angular.bind(this, function () {
                this.update();
            }));

            this.update();
        }
    ]);
