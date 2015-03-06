'use strict';

angular.module('myApp.controller.projects.project', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:user/:project', {
            templateUrl: 'projects/project.html',
            controller: 'ProjectsProjectCtrl'
        });
    }])

    .controller('ProjectsProjectCtrl', ['$scope', '$routeParams', 'Github', 'config', 'Leaderboard',
        function ($scope, $routeParams, Github, config, Leaderboard) {
            $scope.project = $routeParams.project
        }
    ]);
