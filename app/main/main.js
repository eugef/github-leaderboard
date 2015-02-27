'use strict';

angular.module('myApp.controller.main', [])

    .controller('MainCtrl', ['$scope', '$location', 'config',
        function ($scope, $location, config) {
            $scope.progress = {
                total: config.projects.length,
                current: 0
            };
            $scope.weeksOffset = null;
            $scope.startWeek = null;
            $scope.endWeek = null;

            function offsetDay(offset) {
                return moment().utcOffset(0).day(offset).hour(0).minute(0).second(0).format('X');
            }

            function startOfTheWeek(weekOffset) {
                return offsetDay(-7 * weekOffset);
            }

            function endOfTheWeek() {
                return offsetDay(6);
            }

            $scope.isRange = function(weeksOffset) {
                return $scope.weeksOffset == weeksOffset;
            };

            $scope.setRange = function(weeksOffset) {
                if ($scope.weeksOffset != weeksOffset) {
                    $scope.weeksOffset = weeksOffset;
                    $scope.startWeek = startOfTheWeek(weeksOffset);
                    $scope.endWeek = endOfTheWeek();

                    $scope.$broadcast('setRange');
                }
            };

            $scope.refresh = function() {
                $scope.$broadcast('refresh');
            };

            $scope.hasUrl = function(url) {
                return url == $location.url();
            };

            $scope.greaterThan = function(prop, val){
                return function(item){
                    if (item[prop] > val) return true;
                }
            };

            $scope.setRange(1);
        }
    ]);
