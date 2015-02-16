'use strict';

angular.module('myApp.config', [])
    .constant('config', {
        'auth_token': 'OAUTH_TOKEN',
        'projects': [
            'user/project'
        ],
        
        // Number of weeks to use in calculations
        'commitment_weeks': 4,

        // Average amount of additions/deletions per commit
        'commitment_average_add': 60,
        'commitment_average_delete': 30
    });
