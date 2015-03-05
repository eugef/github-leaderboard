# Github Leaderboard

Grabs Github contribution statistics for bunch of projects and presents it in a few nice leaderboards.

## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Prerequisites

You must have node.js and its package manager (npm) installed.
You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

You can simply do:

```
npm install
```
### Configure the Application

Add all the projects to the `app/config.js` file.

Get the Github OAUTH_TOKEN. This is how you [can do it](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
The only required permission is `repo` (or `public_repo` if you need statistics only for public repositories)

#### Access to the Github API through proxy (recommended)

In this case Github OAUTH_TOKEN will be added by proxy and won't be available in the browser.
Proxy is started automatically when you run the application.

In the `app/config.js` leave Github AUTH_TOKEN empty and use `http://localhost:8889` as `api_uri`.
In the `bin/github-proxy.config.js` specify your Github AUTH_TOKEN.

#### Direct access to the Github API

*This approach in unsecure as Github AUTH_TOKEN is available in the browser. Use it only on the local machine!*

In the `app/config.js` specify Github AUTH_TOKEN and use `https://api.github.com` as `api_uri`.

### Run the Application

We have preconfigured the project with a simple development web server.
The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8888`.
