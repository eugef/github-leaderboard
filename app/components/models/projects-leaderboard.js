'use strict';

angular.module('myApp.model.projectsLeaderboard', [])
    .factory('ProjectsLeaderboardModel', ['ProjectModel',
        function (Project) {

            /**
             * @constructor
             */
            function ProjectsLeaderboard() {

                /**
                 * @type {Object.<String, Project>}
                 */
                var projects = {};

                this.project = function(name) {
                    if (!projects[name]) {
                        projects[name] = new Project(name);
                    }

                    return projects[name];
                };

                this.projects = function() {
                    return projects;
                };

                /**
                 * @param {String} projectName
                 * @param {Object[]} data
                 * @param {Number} startWeek
                 */
                this.populateProject = function(projectName, data, startWeek) {
                    var project = this.project(projectName);

                    for (var c = 0; c < data.length; c++) {
                        var contributor = data[c].author.login;
                        project.clearCommitment(contributor);

                        if (data[c].weeks) {
                            var weekData = data[c].weeks;

                            for (var w = weekData.length - 1; w >= 0; w--) {
                                if (weekData[w].w >= startWeek) {
                                    project.addCommitment(contributor, weekData[w].w, {
                                        add: weekData[w].a,
                                        delete: weekData[w].d,
                                        commit: weekData[w].c
                                    });
                                } else {
                                    break;
                                }
                            }
                        }

                        project.calculatePoints(contributor);
                    }
                }
            }

            return ProjectsLeaderboard;
        }
    ]);
