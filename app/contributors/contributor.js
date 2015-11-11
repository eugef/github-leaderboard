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

            this.data = Leaderboard.contributors()[name];

            $scope.$on('leaderboardUpdated', angular.bind(this, function () {
                this.data = Leaderboard.contributors()[name];
            }));
        }
    ]);
