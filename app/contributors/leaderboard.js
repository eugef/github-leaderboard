'use strict';

angular.module('myApp.controller.contributors.leaderboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contributors', {
            templateUrl: 'contributors/leaderboard.html',
            controller: 'ContributorsLeaderboardCtrl',
            controllerAs: 'contributorsLeaderboard'
        });
    }])

    .controller('ContributorsLeaderboardCtrl', ['$scope', 'Github', 'config', 'Leaderboard',
        function ($scope, Github, config, Leaderboard) {
            this.data = Leaderboard.contributors();

            $scope.$on('leaderboardUpdated', angular.bind(this, function () {
                this.data = Leaderboard.contributors();
            }));
        }
    ]);
