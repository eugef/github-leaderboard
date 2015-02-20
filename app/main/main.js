'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location',
        function ($scope, $location) {
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
