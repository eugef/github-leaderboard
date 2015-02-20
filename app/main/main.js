'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location',
        function ($scope, $location) {
            $scope.hasUrl = function(url) {
                return url == $location.url();
            }
        }
    ]);
