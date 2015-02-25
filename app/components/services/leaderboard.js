'use strict';

angular.module('myApp.service.leaderboard', []).factory('Leaderboard', ['ProjectModel', 'ContributorModel', 'CommitmentModel',
    function (Project, Contributor, Commitment) {

        /**
         * @constructor
         */
        function Leaderboard() {
            /**
             * @type {Object.<String, Project>}
             */
            var projects = {};

            this.project = function (name) {
                if (!projects[name]) {
                    projects[name] = new Project(name);
                }

                return projects[name];
            };

            this.projects = function () {
                return projects;
            };

            /**
             * @type {Object.<String, Contributor>}
             */
            var contributors = {};

            this.contributor = function (profile) {
                if (!contributors[profile.login]) {
                    contributors[profile.login] = new Contributor(profile);
                }

                return contributors[profile.login];
            };

            this.contributors = function () {
                return contributors;
            };

            /**
             * @param {String} projectName
             * @param {Object[]} data
             * @param {Number} startWeek
             */
            this.populateProject = function (projectName, data, startWeek) {
                var project = this.project(projectName);

                for (var c = 0; c < data.length; c++) {
                    var contributor = this.contributor(data[c].author);

                    contributor.clearCommitment(projectName);
                    project.clearCommitment(contributor.profile.login);

                    if (data[c].weeks) {
                        var weekData = data[c].weeks;

                        for (var w = weekData.length - 1; w >= 0; w--) {
                            if (weekData[w].w >= startWeek) {
                                project.addCommitment(contributor.profile.login, weekData[w].w, new Commitment(
                                    weekData[w].c,
                                    weekData[w].a,
                                    weekData[w].d
                                ));

                                contributor.addCommitment(projectName, weekData[w].w, new Commitment(
                                    weekData[w].c,
                                    weekData[w].a,
                                    weekData[w].d
                                ));
                            } else {
                                break;
                            }
                        }
                    }

                    project.calculatePoints(contributor.profile.login);
                    contributor.calculatePoints(projectName);
                }
            };
        }

        return new Leaderboard();
    }
]);
