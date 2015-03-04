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

> ## Walkthrough of the 'troll-me' Algorithm

> Once the 'Start Trolling!' button is pressed,

1. The algorithm will start drawing user information in three 6 month intervals, starting from the interval 18 to 12 months ago, then 12 to 6 months ago, then 6 months to the present. It does this to make sure it trolls a wide time span across the user's timeline. **The number of intervals is customizable.** There is a variable called ```how_long_ago``` in **troll_me_algorithm.js** that represents the number of years to go back in the timeline. The default is 1.5, and it must only be whole or half numbers.

2. In every six month time interval, it grabs 25 photos from the user's profile in that time period, then deletes all of the photos that don't have any comments. Then, it will grab one random photo to make a photo comment, and another random photo to like a random comment. It will add these photo objects to their appropriate arrays. **The number of photos to comment on/comments to like is customizable.** The first parameter to the ```Math.min()``` in the following line:
```
for (var i = 0; i < Math.min(1, response.data.length); i++) {
```
is the number of photos it grabs for comments, as well as the number of random comments it grabs to like - they change together the way it is set up. You can easily change this number to your desired amount. 

3. After this, it will generate three status updates using information from the user's profile:  
  + Incorporating the user's birthday.  
  + Taking into account one of the user's music interests.  
  + Attributing a random quote to one of your friends (from the [Taggable Friends](https://developers.facebook.com/docs/graph-api/reference/v2.2/user/taggable_friends) API call).  

  and put them into the appropriate arrays.

4. It will then call the ```displayData()``` function and it will generate the html to provide the user with their options of suggested trolls. Once it is complete, it is displayed to the user.

5. The user can then select whether or not they want to execute any (or all) of the suggested 'trolls'. They also have the option to generate a new batch of 'trolls' if they press the **Troll Again!** button, however if this is pressed a number of times there is an issue with this (see the **Known Issues** section below).


## Quick Start

> Here are a few quick things you can do within 15 minutes to customize the application:

- Simply find the word bank section of **troll_me_algorithm.js** and add your own comment/status templates for trolling! Be sure to follow the format of each array, and **_including single or double quotes is not supported currently and will cause an error_** with the Facebook API call.

- Modify the ```generateComment()``` function. The image url is passed to the function for the photo the comment belongs to, so calling an API with the link or integrating the image in some way would be awesome (see the **Further Enhancements** section for detailed suggestions).

## Developer Notes

These are some facts about the application as it stands right now:

- It will pull the same media if ran multiple times, but the ordering 

## Known Issues

The following are issues that I've been aware of, but haven't fixed quite yet:

- If a user presses ```Troll Now!``` multiple times, the following error message will show up:
```
Uncaught RangeError: Maximum call stack size exceeded
```
From my understanding, it is due to [loading multiple versions of the Facebook JavaScript SDK](http://neverblog.net/facebook-javascript-sdk-uncaught-rangeerror-maximum-call-stack-size-exceeded-error/).

- If a generated comment/post contains **any form of quotation marks (single or double)** it will not post to Facebook and will return with an error.

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
