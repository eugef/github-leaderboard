'use strict';

angular.module('myApp.controller.contributors.contributor', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contributors/:contributor', {
            templateUrl: 'contributors/contributor.html',
            controller: 'ContributorsContributorCtrl',
            controllerAs: 'contributor'
        });
    }])

    .controller('ContributorsContributorCtrl', ['$scope', '$routeParams', 'Github', 'config', 'Leaderboard',
        function ($scope, $routeParams, Github, config, Leaderboard) {
            var name = $routeParams.contributor;

            this.data = {};
            this.chart = {
                type: 'ColumnChart',
                data: {
                    cols: [
                        {id: 'week', type: 'string'},
                        {id: 'points', type: 'number'}
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
                var chartRows = [];

                /* group commitments by week */
                angular.forEach(commitments, function (weeks) {
                    angular.forEach(weeks, function (commitment, week) {
                        chartData[week] = chartData[week] || {points: 0};
                        chartData[week].points += commitment.points();
                    })
                });

                /* populate rows skipping leading empty weeks*/
                angular.forEach(chartData, angular.bind(this, function (data, week) {
                    if (chartRows.length || data.points) {
                        chartRows.push({
                            c: [
                                {v: moment.unix(week).add(1, 'day').format('D MMM YY')},
                                {v: data.points}
                            ]
                        })
                    }
                }));

                return chartRows;
            };

            this.update = function () {
                this.data = Leaderboard.contributors()[name];

                this.chart.data.rows = [];
                if (this.data && this.data.commitments) {
                    this.chart.data.rows = populateChart(this.data.commitments);
                }
            };

            $scope.$on('leaderboardUpdated', angular.bind(this, function () {
                this.update();
            }));

            this.update();
        }
    ]);
