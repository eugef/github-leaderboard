angular.module('myApp.github', [])
    .factory('Github', ['$q', '$http', 'config',
    function ($q, $http, config) {
        "use strict";

        /**
         * @constructor
         * @param {Array} config
         * @param {String} config.auth_token
         */
        function GithubAPI(config) {

            var apiUri = 'https://api.github.com';
            
            var retryTimeout = 1000;

            /**
             * @param {String} project
             * @returns {Promise}
             */
            this.contributors = function (project) {
                var request = $q.defer();

                function doRequest() {
                    console.log('doRequest with ' + project);
                    $http.get(
                        apiUri + '/repos/' + project + '/stats/contributors',
                        {
                            headers: {
                                Accept: 'application/vnd.github.v3+json',
                                Authorization: 'token ' + config.auth_token
                            }
                        }
                    ).then(
                        function(response) {
                            console.log(response.status);
                            if (response.status == '202') {
                                console.log('retry in ' + retryTimeout + ' with ' + project);
                                setTimeout(
                                    function() {
                                        doRequest(project);
                                    },
                                    retryTimeout
                                )
                            } else {
                                console.log('return result for ' + project);
                                request.resolve(response.data);
                            }
                        }
                    );
                }

                doRequest();
                
                return request.promise;
            };
        }

        return new GithubAPI(config);
    }
]);
