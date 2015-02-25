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
                 * @type {Number}
                 */
                this.totalPoints = 0;

                this.calculateTotalPoints = function() {
                    this.totalPoints = 0;

                    for (var contributor in this.commitments) {
                        this.totalPoints += this.points[contributor].points;
                    }
                };

                /**
                 * @param {String} contributor
                 */
                this.calculatePoints = function(contributor) {
                    this.points[contributor] = {
                        contributor: contributor,
                        points: 0
                    };

                    for (var week in this.commitments[contributor]) {
                        this.points[contributor].points += this.commitments[contributor][week].points();
                    }

                    this.calculateTotalPoints();
                };

                /**
                 * @param {String} contributor
                 * @param {Number} week
                 * @param {Commitment} commitment
                 */
                this.addCommitment = function(contributor, week, commitment) {
                    if (!this.commitments[contributor]) {
                        this.commitments[contributor] = {};
                    }

                    this.commitments[contributor][week] = commitment;
                };

                /**
                 * @param {String} contributor
                 */
                this.clearCommitment = function(contributor) {
                    this.commitments[contributor] = {}
                }
            }

            return Project;
        }
    ]);
