var config = {
    github: {
        api_uri: 'https://api.github.com',
        auth_token: 'AUTH_TOKEN'
    },
    allowed_urls: [
        '/favicon.ico',
        '/repos/*/*/stats/contributors'
    ]
};

module.exports = config;
