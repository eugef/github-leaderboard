'use strict';

angular.module('myApp.model.project', []).factory('ProjectModel', ['CommitmentModel',
        function (Commitment) {
            /**
             * @constructor
             *
             * @param {String} name
             */
            function Project(name) {
                /**
                 * @type {String}
                 */
                this.name = name;

                /**
                 * @type {Object.<String, Object.<Number, Commitment>>}
                 */
                this.commitments = {};

                /**
                 * @type {Object.<String,Object>}
                 */
                this.points = {};

                /**
                 * @type {Object.<String, Number>}
                 */
                this.total = {};
            }

            Project.prototype.calculateTotal = function() {
                this.total = {
                    points: 0,
                    commits: 0,
                    additions: 0,
                    deletions: 0
                };

                for (var contributor in this.points) {
                    this.total.points += this.points[contributor].points;
                    this.total.commits += this.points[contributor].commits;
                    this.total.additions += this.points[contributor].additions;
                    this.total.deletions += this.points[contributor].deletions;
                }
            };

            /**
             * @param {String} contributor
             */
            Project.prototype.calculatePoints = function(contributor) {
                this.points[contributor] = {
                    contributor: contributor,
                    points: 0,
                    commits: 0,
                    additions: 0,
                    deletions: 0
                };

                for (var week in this.commitments[contributor]) {
                    this.points[contributor].points += this.commitments[contributor][week].points();
                    this.points[contributor].commits += this.commitments[contributor][week].commits;
                    this.points[contributor].additions += this.commitments[contributor][week].additions;
                    this.points[contributor].deletions += this.commitments[contributor][week].deletions;
                }

                this.calculateTotal();
            };

            /**
             * @param {String} contributor
             * @param {Number} week
             * @param {Commitment} commitment
             */
            Project.prototype.addCommitment = function(contributor, week, commitment) {
                if (!this.commitments[contributor]) {
                    this.commitments[contributor] = {};
                }

                this.commitments[contributor][week] = commitment;
            };

            /**
             * @param {String} contributor
             */
            Project.prototype.clearCommitment = function(contributor) {
                this.commitments[contributor] = {}
            };

            return Project;
        }
    ]);
