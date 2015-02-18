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
                }
            }

            return ProjectsLeaderboard;
        }
    ]);
