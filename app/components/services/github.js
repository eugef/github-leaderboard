angular.module('myApp.service.github', []).factory('Github', ['$q', '$http', 'DSCacheFactory', 'config',
    function ($q, $http, DSCacheFactory, config) {
        "use strict";

        /**
         * @constructor
         * @param {Array} config
         * @param {String} config.auth_token
         */
        function GithubAPI(config) {

            /**
             * @type {String}
             */
            var apiUri = 'https://api.github.com';

            /**
             * @type {Number}
             */
            var retryTimeout = 1000;

            /**
             * @type {DSCache}
             */
            var cache = DSCacheFactory('githubAPICache', {
                    maxAge: 15 * 60 * 1000,
                    deleteOnExpire: 'aggressive'
                }
            );

            /**
             * @param {String} project
             * @param {Boolean} forceUpdate
             * @returns {Promise}
             */
            this.contributors = function (project, forceUpdate) {
                if (forceUpdate) {
                    cache.removeAll();
                }

                function doRequest() {
                    console.log(project, 'do request');
                    $http.get(
                        apiUri + '/repos/' + project + '/stats/contributors',
                        {
                            headers: {
                                Accept: 'application/vnd.github.v3+json',
                                Authorization: 'token ' + config.auth_token
                            }
                        }
                    ).then(
                        function (response) {
                            if (response.status == '202') {
                                console.log(project, 'retry in ' + retryTimeout);
                                setTimeout(
                                    function() {
                                        doRequest();
                                    },
                                    retryTimeout
                                )
                            } else {
                                console.log(project, 'return result');
                                cache.put(project, response.data);
                                request.resolve(response.data);
                            }
                        }
                    );
                }

                var request = $q.defer();

                if (cache.info(project)) {
                    console.log(project, 'cached result');
                    request.resolve(cache.get(project));
                } else {
                    doRequest();
                }

                return request.promise;
            };
        }

        return new GithubAPI(config);
    }
]);
