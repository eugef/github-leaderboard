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
             * @type {Object.<String, Number>}
             */
            this.total = {};
        }

        Contributor.prototype.calculateTotal = function () {
            this.total = {
                points: 0,
                commits: 0,
                additions: 0,
                deletions: 0
            };

            for (var project in this.points) {
                this.total.points += this.points[project].points;
                this.total.commits += this.points[project].commits;
                this.total.additions += this.points[project].additions;
                this.total.deletions += this.points[project].deletions;
            }
        };

        /**
         * @param {String} project
         */
        Contributor.prototype.calculatePoints = function (project) {
            this.points[project] = {
                project: project,
                points: 0,
                commits: 0,
                additions: 0,
                deletions: 0
            };

            for (var week in this.commitments[project]) {
                this.points[project].points += this.commitments[project][week].points();
                this.points[project].commits += this.commitments[project][week].commits;
                this.points[project].additions += this.commitments[project][week].additions;
                this.points[project].deletions += this.commitments[project][week].deletions;
            }

            this.calculateTotal();
        };

        /**
         * @param {String} project
         * @param {Number} week
         * @param {Commitment} commitment
         */
        Contributor.prototype.addCommitment = function (project, week, commitment) {
            if (!this.commitments[project]) {
                this.commitments[project] = {};
            }

            this.commitments[project][week] = commitment;
        };

        /**
         * @param {String} project
         */
        Contributor.prototype.clearCommitment = function (project) {
            this.commitments[project] = {}
        };

        return Contributor;
    }
]);
