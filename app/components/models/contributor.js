'use strict';

angular.module('myApp.model.contributor', [])
    .factory('ContributorModel', ['config',
        function (config) {

            /**
             * @constructor
             *
             * @typedef {Object} ContributorProfile
             * @property {String} avatar_url
             * @property {String} login
             * @property {String} type
             *
             * @param {ContributorProfile} profile
             */
            function Contributor(profile) {

                /**
                 * @type {ContributorProfile}
                 */
                this.profile = profile;

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
                    
                    for (var project in this.commitments) {
                        this.totalPoints += this.points[project].points;
                    }
                };

                /**
                 * @param {String} project
                 */
                this.calculatePoints = function(project) {
                    this.points[project] = {
                        project: project,
                        points: 0
                    };
                    
                    for (var week in this.commitments[project]) {
                        this.points[project].points += commitmentPoints(this.commitments[project][week]);
                    }

                    this.calculateTotalPoints();
                };
                
                /**
                 * @param {String} project
                 * @param {Number} week
                 * @param {Commitment} commitment
                 */
                this.addCommitment = function(project, week, commitment) {
                    if (!this.commitments[project]) {
                        this.commitments[project] = {};
                    }
                    
                    this.commitments[project][week] = commitment;
                };

                /**
                 * @param {String} project
                 */
                this.clearCommitment = function(project) {
                    this.commitments[project] = {}
                }
            }

            return Contributor;
        }
    ]);
