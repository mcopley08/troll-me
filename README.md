# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application support the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## Developer Notes

These are some facts about the application as it stands right now:

- It will pull the same media if ran multiple times, but the ordering 

## Known Issues

The following are issues that I've been aware of, but haven't fixed quite yet:

- If you press "Troll Now!" multiple times, the following error message will show up:
```
Uncaught RangeError: Maximum call stack size exceeded
```
From my understanding, it is due to loading multiple version of the Facebook JavaScript SDK.

- If a generated comment/post contains any form of quotation marks (single or double) it will not post to Facebook and will return with an error.

- 

## Improvements

- Fixing the already "Like"-d issue.
- Generating a more random algorithm for photos/likes.
- Separating the likes from the photos.
- Making sure it reaches all of our word banks.

## Suggestions for Further Enhancements

- Make an API call to Watson or other Visual Recognition services, so that when comments are generated you can have a few words that describe a photo and integrate them into the "troll" comment.
- Create events on the user's profile (this might not be allowed anymore, though...)
- Tag friends in the comments/statuses instead of simply mentioning their name.
- Improving the bank of comments/statuses that are generated.
- Getting rid of the bank of comment/status templates and use NLP algorithms to generate them dynamically.
- Post random photos/links to weird & funny things from the user.
- Share random status updates from public users (political figures, department stores, artists, etc.)
