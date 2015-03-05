'use strict';

angular.module('myApp.config', [])
    .constant('config', {
        github: {
            api_uri: 'http://localhost:8889',
            auth_token: '[added by github-proxy]'
        },
        projects: [
            'user/project'
        ],

        // Average amount of additions/deletions per commit
        commitment_average_add: 60,
        commitment_average_delete: 30
    });
