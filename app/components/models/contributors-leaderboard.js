'use strict';

angular.module('myApp.model.contributorsLeaderboard', [])
    .factory('ContributorsLeaderboardModel', ['ContributorModel',
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
                };

                this.populateContributor = function(projectName, data, startWeek) {
                    for (var c = 0; c < data.length; c++) {
                        var contributor = this.contributor(data[c].author);
                        contributor.clearCommitment(projectName);

                        if (data[c].weeks) {
                            var weekData = data[c].weeks;
                            for (var w = weekData.length - 1; w >= 0; w--) {
                                if (weekData[w].w >= startWeek) {
                                    contributor.addCommitment(projectName, weekData[w].w, {
                                        add: weekData[w].a,
                                        delete: weekData[w].d,
                                        commit: weekData[w].c
                                    });
                                } else {
                                    break;
                                }
                            }
                        }

                        contributor.calculatePoints(projectName);
                    }
                }
            }

            return ContributorsLeaderboard;
        }
    ]);
