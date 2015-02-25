'use strict';

angular.module('myApp.model.contributor', []).factory('ContributorModel', ['CommitmentModel',
    function (Commitment) {

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
             * @type {Object.<String, Object.<Number, Commitment>>}
             */
            this.commitments = {};

            /**
             * @type {Object.<String, Object>}
             */
            this.points = {};

            /**
             * @type {Number}
             */
            this.totalPoints = 0;

            this.calculateTotalPoints = function () {
                this.totalPoints = 0;

                for (var project in this.commitments) {
                    this.totalPoints += this.points[project].points;
                }
            };

            /**
             * @param {String} project
             */
            this.calculatePoints = function (project) {
                this.points[project] = {
                    project: project,
                    points: 0
                };

                for (var week in this.commitments[project]) {
                    this.points[project].points += this.commitments[project][week].points();
                }

                this.calculateTotalPoints();
            };

            /**
             * @param {String} project
             * @param {Number} week
             * @param {Commitment} commitment
             */
            this.addCommitment = function (project, week, commitment) {
                if (!this.commitments[project]) {
                    this.commitments[project] = {};
                }

                this.commitments[project][week] = commitment;
            };

            /**
             * @param {String} project
             */
            this.clearCommitment = function (project) {
                this.commitments[project] = {}
            }
        }

        return Contributor;
    }
]);
