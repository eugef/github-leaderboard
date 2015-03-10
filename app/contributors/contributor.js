'use strict';

angular.module('myApp.controller.contributors.contributor', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contributors/:contributor', {
            templateUrl: 'contributors/contributor.html',
            controller: 'ContributorsContributorCtrl'
        });
    }])

    .controller('ContributorsContributorCtrl', ['$scope', '$routeParams', 'Github', 'config', 'Leaderboard',
        function ($scope, $routeParams, Github, config, Leaderboard) {
            $scope.name = $routeParams.contributor;

            $scope.contributor = Leaderboard.contributors()[$scope.name];
            $scope.projects = Leaderboard.projects();

            $scope.$on('leaderboardUpdated', function() {
                $scope.contributor = Leaderboard.contributors()[$scope.name];
                $scope.projects = Leaderboard.projects();
            });
        }
    ]);
