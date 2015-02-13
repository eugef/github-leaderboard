'use strict';

angular.module('myApp.model.contributor', [])
    .factory('ContributorModel', [
        function () {

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
                 * @type {Object.<String,Number>}
                 */
                this.totalCommits = {};

                /**
                 * @type {Object.<String,Number>}
                 */
                this.ranks = {};

                /**
                 * @type {Number}
                 */
                this.totalRank = 0;

                /**
                 * Calculates commitment rank based on amount of commits
                 * @param {Commitment} commitment
                 */
                var commitmentRank = function(commitment) {
                    return commitment.commit;// * 1000 + commitment.add + commitment.delete;
                };
                
                this.calculateTotalRank = function() {
                    this.totalRank = 0;
                    
                    for (var project in this.commitments) {
                        this.totalRank += this.ranks[project];
                    }
                };

                /**
                 * @param {String} project
                 */
                this.calculateRanks = function(project) {
                    this.ranks[project] = 0;
                    
                    for (var week in this.commitments[project]) {
                        this.ranks[project] += commitmentRank(this.commitments[project][week]);
                    }

                    this.calculateTotalRank();
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
                 * @param {Number} total
                 */
                this.addTotal = function(project, total) {
                    this.totalCommits[project] = total;
                }
            }

            return Contributor;
        }
    ]);
