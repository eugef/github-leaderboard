'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location', 'config',
        function ($scope, $location, config) {
            $scope.progress = {
                total: config.projects.length,
                current: 0
            };

            $scope.hasUrl = function(url) {
                return url == $location.url();
            };

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
            };
        }
    ]);
