'use strict';

angular.module('myApp.model.contributorsLeaderboard', [])
    .factory('ContributorLeaderboardModel', ['ContributorModel',
        function (Contributor) {

            /**
             * @constructor
             */
            function ContributorsLeaderboard() {

                /**
                 * @type {Object.<String, Contributor>}
                 */
                var contributors = {};
                
                this.contributor = function(profile) {
                    if (!contributors[profile.login]) {
                        contributors[profile.login] = new Contributor(profile);
                    }
                    
                    return contributors[profile.login];
                };
                
                this.contributors = function() {
                    return contributors;
                }
            }

            return ContributorsLeaderboard;
        }
    ]);
