'use strict';

angular.module('myApp.model.project', [])
    .factory('ProjectModel', ['config',
        function (config) {

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
                 * @typedef {Object} Commitment
                 * @property {Number} add
                 * @property {Number} delete
                 * @property {Number} commit
                 *
                 * @type {Commitment[]}
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

                /**
                 * Calculates commitment points based on amount of commits, additions anddeletions
                 * @param {Commitment} commitment
                 */
                var commitmentPoints = function(commitment) {
                    return commitment.commit +
                        Math.floor(commitment.add / config.commitment_average_add) +
                        Math.floor(commitment.delete / config.commitment_average_delete);
                };

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
                        this.points[contributor].points += commitmentPoints(this.commitments[contributor][week]);
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
