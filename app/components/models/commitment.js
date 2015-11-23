'use strict';

angular.module('myApp.model.commitment', []).factory('CommitmentModel', ['config',
    function (config) {
        /**
         * @constructor
         *
         * @param {Number} commits
         * @param {Number} additions
         * @param {Number} deletions
         */
        function Commitment(commits, additions, deletions) {
            /**
             * @type {Number}
             */
            this.commits = commits;

            /**
             * @type {Number}
             */
            this.additions = additions;

            /**
             * @type {Number}
             */
            this.deletions = deletions;
        }

        /**
         * @returns {Number}
         */
        Commitment.prototype.points = function () {
            return this.commits +
                Math.floor(this.additions / config.commitment_average_add) +
                Math.floor(this.deletions / config.commitment_average_delete);
        };

        /**
         * @param {Commitment} commitment
         */
        Commitment.prototype.add = function (commitment) {
            this.commits += commitment.commits;
            this.additions += commitment.additions;
            this.deletions += commitment.deletions;
        };

        /**
         * @returns {Commitment}
         */
        Commitment.create = function () {
            return new Commitment(0, 0, 0);
        };

        return Commitment;
    }
]);
