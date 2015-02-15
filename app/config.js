'use strict';

angular.module('myApp.config', [])
    .constant('config', {
        'auth_token': '068002e2f08395cd67bef11262eaa2dbd9709f71',
        'projects': [
            'user/project'
        ],
        
        // Number of weeks to use in calculations
        'commitment_weeks': 4,

        // Average amount of additions/deletions per commit
        'commitment_average_add': 60,
        'commitment_average_delete': 30
    });
