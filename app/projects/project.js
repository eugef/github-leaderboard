'use strict';

angular.module('myApp.controller.projects.project', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:user/:project', {
            templateUrl: 'projects/project.html',
            controller: 'ProjectsProjectCtrl',
            controllerAs: 'project'
        });
    }])

    .controller('ProjectsProjectCtrl', ['$scope', '$routeParams', 'Github', 'config', 'Leaderboard',
        function ($scope, $routeParams, Github, config, Leaderboard) {
            var name = $routeParams.user + '/' + $routeParams.project;

            this.data = Leaderboard.projects()[name];
            this.contributors = Leaderboard.contributors();

            $scope.$on('leaderboardUpdated', angular.bind(this, function () {
                this.data = Leaderboard.projects()[name];
                this.contributors = Leaderboard.contributors();
            }));
        }
    ]);
