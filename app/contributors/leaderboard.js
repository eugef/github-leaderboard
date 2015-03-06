'use strict';

angular.module('myApp.controller.contributors.leaderboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contributors', {
            templateUrl: 'contributors/leaderboard.html',
            controller: 'ContributorsLeaderboardCtrl'
        });
    }])

    .controller('ContributorsLeaderboardCtrl', ['$scope', 'Github', 'config', 'Leaderboard',
        function ($scope, Github, config, Leaderboard) {
            $scope.leaderboard = Leaderboard.contributors();

            $scope.$on('leaderboardUpdated', function() {
                $scope.leaderboard = Leaderboard.contributors();
            });
        }
    ]);
