'use strict';

angular.module('myApp.config', [])
    .constant('config', {
        'auth_token': 'OAUTH_TOKEN',
        'projects': [
            'user/project'
        ],

        // Average amount of additions/deletions per commit
        'commitment_average_add': 60,
        'commitment_average_delete': 30
    });
