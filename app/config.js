'use strict';

angular.module('myApp.config', [])
    .constant('config', {
        'auth_token': 'OAUTH_TOKEN',
        'commitment_weeks': 4,
        'projects': [
            'user/project'
        ]
    });
