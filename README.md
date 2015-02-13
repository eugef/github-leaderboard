# Github Leaderboard

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

You must specify Github OAUTH_TOKEN in the `app/config.js` file. This is how you [can do it](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
In the same file provide names for all the projects for the leaderboard.

### Run the Application

We have preconfigured the project with a simple development web server.
The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.
