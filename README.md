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

## Quick Start

Here are a few quick things you can do within 15 minutes to custom the application:

- Simply find the word bank section of (name_of_js_file) and add your own comment/status templates for trolling! Be sure to follow the format of each array, and including single or double quotes is not supported currently and will cause an error with the Facebook API call.
- Modify the "generateComment()" function. The image url is passed to the function for the photo the comment belongs to, so calling an API with the link or integrating the image in some way would be awesome (See the 'Further Enhancements' section for detailed suggestions).

## Developer Notes

These are some facts about the application as it stands right now:

- It will pull the same media if ran multiple times, but the ordering 

## Known Issues

The following are issues that I've been aware of, but haven't fixed quite yet:

- If you press "Troll Now!" multiple times, the following error message will show up:
```
Uncaught RangeError: Maximum call stack size exceeded
```
From my understanding, it is due to [loading multiple versions of the Facebook JavaScript SDK](http://neverblog.net/facebook-javascript-sdk-uncaught-rangeerror-maximum-call-stack-size-exceeded-error/).

- If a generated comment/post contains any form of quotation marks (single or double) it will not post to Facebook and will return with an error.

## Suggestions for Further Enhancements

- Make an API call to [IBM's Watson](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/services-catalog.html) or other [Visual Recognition](http://blog.mashape.com/list-of-14-image-recognition-apis/) services, so that when comments are generated you can have a few words that describe a photo and integrate them into the "troll" comment.
- Integrate a user's [events](https://developers.facebook.com/docs/graph-api/reference/v2.2/event) into messages (Facebook only allows a kind of restricted access, though).
- [Mention/Tag friends](https://developers.facebook.com/docs/opengraph/using-actions/v2.2#mentions) in the comments/statuses instead of simply mentioning their name.
- [Send messages](https://developers.facebook.com/docs/sharing/reference/send-dialog) to random friends.
- Improving the bank of comments/statuses that are generated.
- Calling an [API](http://iheartquotes.com/api) or [script](http://www.htmlgoodies.com/JSBook/sentence.html) to generate random sentences, possibly incorporate [user's names](http://www.icndb.com/api/).
- Getting rid of the bank of comment/status templates and use [NLP algorithms](http://blog.mashape.com/list-of-25-natural-language-processing-apis/) to generate them dynamically.
- Post random photos/links to weird & funny things from the user.
- Share random [status updates](https://developers.facebook.com/docs/graph-api/reference/v2.2/status) from public users (political figures, department stores, artists, etc.)

## Things to Note

- [Taggable Friends](https://developers.facebook.com/docs/graph-api/reference/v2.2/user/taggable_friends) which is used to mention random friends in statuses, requires additional approval to be used in the application.
- [Animate.css](http://daneden.github.io/animate.css/) is already included in the package, so if you wanted to improve on the UI it is available.
