// ************************************************************************************
// ************************************************************************************
// **************************** The troll-me algorithm. *******************************
// ************************************************************************************
// ************************************************************************************
// ************************************************************************************

// these variables help make sure that the algorithm is executing in the correct order.

var iteration = 0;
var photo_api_complete = 0;

// ********************************* date variables ********************************

var start_year;
var start_month;
var start_day;
var end_year;
var end_month;
var end_day;

// ***************** Setting up the date so we grab content from each 6 month time period ***************

// Getting the current day, month, and year.
var current_date = new Date();
var current_day = current_date.getDate(); // we want to be able to draw content from the current day, as well.
var current_month = current_date.getMonth() + 1; // b/c its 0 indexed.
var current_year = current_date.getFullYear();

// ***************************** FB TROLL - TREEHACKS ***************************************

var photo_comments = []; 
var photo_objects = [];
var photo_link_to_comment = [];
var like_link_to_comment = [];
var like_objects = [];
var like_comments = [];
var chosen_comments = {};
var photo_counter = 0;
var chosen_posts = [];
var user_profile_link;
var friends = 0, bands = 0, birthday = 0;

// ****************************** Bank of comment/status templates *************************************

// To add to the existing bank of words, simply follow the format of each of the arrays,
// and make sure there are no double or single quotes in your new template. Then you're all set!

var photo_comment_templates = ["im going to the store to buy scooby snacks. need anything?",
                               "didnt u throw up after this? lol",
                               "brb gotta go to my yoga class",
                               "prom?",
                               "omg sry 4 txtng tht was my friend lol",
                               "what a great day", 
                               "reminds me of the good old days",
                               "this always reminds me of when i used to live in palo alto", 
                               "i ate so many white castles after this... lol...",
                               "sometimes when i think about this photo i get queezy..",
                               "im going to print this out and put it all over my face/pillowcase. but probably just my face.",
                               "try plugging an ethernet cable into THAT!",
                               "i just cant even..",
                               "ayyyyy, lmao",
                               "if a tree fell in the forest & no one heard it, would jet fuel still melt steel beams?",
                               "great pic... one of my best memories..",
                               "my shopping list for this week: hibiscus plants, reeses puffs (peanut butter chocolate flavour), fruit roll ups. dont let me forget.",
                               "try looking at this picture and listening to notorious b.i.g.",
                               "not to try & be that guy that promotes his new single, but check me out real quick https://soundcloud.com/zenja/jet-fuel-cant-melt-dank-memes",
                               "selling an ATV for $400 obo - runs great, my kids loved it as well."];
var photo_comment_template_names = [", what are u doing today?", 
                                    ", if ur not doing anything later, my mom & i are going to find some rare pepes (ur invited).",
                                    ", i definitely agree with you.", 
                                    ", excuse me..?  hahaha just-kidding.",
                                    ", you left your john deere trucker hat at my place",
                                    ", you still have my copy of mario sunshine! ha-ha.",
                                    ", im going to join the illuminati later if you want to join.",
                                    ", so true, lol",
                                    ", this is classic you",
                                    ", this is embarassing, but yesterday at lunch i forgot your first name",
                                    ", is this what you meant when you said you *lost* your gopro?",
                                    ", i swear i saw this on the front page of reddit earlier this week",
                                    ", where are you in this pic?????",
                                    ", why did you post this?",
                                    ", i have your crocs, still not sure how you got home",
                                    ", is that Beyonce?",
                                    ", i literally cannot believe you posted this",
                                    ", do you remember how long your beard was in middle school?",
                                    ", do you prefer 2% or soy?",
                                    ", what's my age again?",
                                    ", somebody got hacked",
                                    ", who actually took this pic?",
                                    ", you've grown up so fast *sobbing*",
                                    ", that's a nice pic you got over dere",
                                    ", some nights i stay up cashing in my bad luck"];
var photo_comment_template_names_alt = ["im going to remember this one for a while, ", 
                                        "hahahaha, omg ", 
                                        "im not quite sure id say that... ",
                                        "you shouldve seen me when i posted this pic, ",
                                        "my mom gave me some weird questions after this one... remember, ",
                                        "great comment, "];

var post_birthday_templates = [" is my birthday, who wants to go to chuck-e-cheese.",
                               " is that time when i dont have to pretend im ordering a cake for my 'friend'.",
                               " is the only day of the year i get socks from dockers, and i want to keep it that way.",
                               " gives me an excuse to spend $35 on doritos and say to myself: its okay, today is MY day"];

var post_birthday_templates_alt = ["take a wild guess at what happens on the following date, and ill give you a hint, it has to do with being my birthday: ",
                                   "ill give you $10 if you chill with me on: "];

var post_band_templates = ["i should really do more than eat sun chips and listen to ",
                           "is it a bird? is it a plane? nooooo you're on strike 2 - its: ",
                           "todays goals: drink a liter of water, try not to be intimidated by my own dog, listen to: ",
                           "hella fresh (definition): ",
                           "tell your parents to listen to: "];

var post_band_templates_alt = [" is the reason i never get my homework done, but im okay with it. its a mutual relationship.",
                               " was playing music when i had my first kiss. on the cheek. from my mom.",
                               ", homemade baklava, pictures of sad monkeys. all of those are essential.",
                               " and i have been together for 18 month now, time flies when youre scared about your future..",
                               " should do a cover of that weird-ass witch doctor song."];

var funny_quotes = ['I just ate some garlic, so I cant talk. -',
                    'Dont u love it when ur sitting at a red light and when it turns green all the other lights behind it turn green lol -',
                    'I hate when Im on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle. -',
                    'You put the boom-boom into my heart, You send my soul sky high when your lovin starts - ',
                    'It’s grind-day, from Friday, to next Friday. I been up straight for nine days, I need a spa day -',
                    'Tomorrow is Saturday, and Sunday comes after ... wards - I dont want this weekend to end!!! -',
                    'just picked up some dish detergent from target. -',
                    'my dad says the amount of nutella i eat in a weak is unattractive. -',
                    'from my understanding, groundhogs day is more of an illuminati thing. but dont quote me on that.. -'];

var watson_smarty = ["tbh, i just spaced out while looking at this ",
                     "sometimes i wish i could just live in this picture with all of the ",
                     "just imagined getting hit by this ",
                     "lets sing songs off of p!nks debut album and find more pictures of this ",
                     "i am not using complex computational algorithms to determine that this picture is of a ",
                     "lolz, props to this ",
                     "hoodie allen needs to write a song about "];

// ******************************** Functions for the troll-me application ***********************************

// EFFECTS: This function generates a random comment and 
//          may/may not take in the user's name for consideration.
//          Nothing is done with the img_url, but it is passed to the 
//          function in case improvements were made that called a visual
//          recognition API for the photo.
//
//          *Doesn't return the same template more than once in each 
//          'troll-me' call.
function generateComment(person_name, img_url) {
  var random = Math.floor(Math.random()*30);

  // random comment - no name
  if (0 <= random && random < 10) {
    var new_comment = photo_comment_templates[Math.floor(Math.random()*photo_comment_templates.length)];

    // if we've already chosen this one, call the function again to get a new template.
    if (new_comment in chosen_comments) {
      return generateComment(person_name);
    }
    else {
      chosen_comments[new_comment] = true;
      return new_comment;
    }
  }

  // random comment - name before
  else if (10 <= random && random < 20) {
    var new_comment = photo_comment_template_names[Math.floor(Math.random()*photo_comment_template_names.length)];

    // if we've already chosen this one, call the function again to get a new template.
    if (new_comment in chosen_comments) {
      return generateComment(person_name);
    }
    else {
      chosen_comments[new_comment] = true;
      return person_name + new_comment;
    }
  }

  // random comment - name after
  else if (20 <= random && random < 30) {
    var new_comment = photo_comment_template_names_alt[Math.floor(Math.random()*photo_comment_template_names_alt.length)];

    // if we've already chosen this one, call the function again to get a new template.
    if (new_comment in chosen_comments) {
      return generateComment(person_name);
    }
    else {
      chosen_comments[new_comment] = true;
      return new_comment + person_name;
    }
  }
}

// REQUIRES: The user is logged into their Facebook account.
//           In order to function correctly, checkLength() MUST be the first
//           parameter passed to this function, and final_check() MUST be the second.
// EFFECTS: This function adds a single (but can be changed) photo to comment on 
//          and photo comment to like to their respective arrays.
function photo_API_request(callback, callback_2) {

  var FB_photo_request = '/me/photos?since=' + start_year + '-' + start_month + '-' + start_day + '&until=' + end_year + '-' + end_month + '-' + end_day;

  // making the api call to grab photos in the given 6 month time frame.
  FB.api(FB_photo_request, function(response) {

    // sorting the photos by the most comments.
    response.data.sort(function(a, b) {

      // if its a tie, it doesn't matter which is first.
      if (typeof a.comments == "undefined")
        return 1; // so b is ranked higher
      else if (typeof b.comments == "undefined")
        return -1; // so a is ranked higher

      return b.comments.data.length - a.comments.data.length;
    });

    // deleting all photo objects with no comments.
    for (var i = 0; i < response.data.length; i++) {
      if (typeof response.data[i].comments == "undefined") {
        response.data.splice(i, 1);
        i--;
      }
    }

    // This loop adds one generated photo comment and one random photo
    // comment to like into their respectful arrays. 
    // Change the first parameter to Math.min() in order to grab the desired number
    // of photos to comment on/random photo comments to like in that six month time frame.
    // Note: They both rely on this same variable.
    for (var i = 0; i < Math.min(1, response.data.length); i++) {

      // ************ picking a random photo to comment on *****************
      var random_pic = Math.floor(Math.random()*response.data.length);
      photo_objects.push(response.data[random_pic].id);

      // console.log(response.data[random_pic].comments.data[0].from.name);

      // generating a comment with the person's name who first commented.
      photo_comments.push(generateComment(response.data[random_pic].comments.data[0].from.name, response.data[random_pic].source));
      photo_link_to_comment.push(response.data[random_pic].link);

      // ********* picking a random photo comment to like. *************
      random_pic = Math.floor(Math.random()*response.data.length);
      var random_com; 

      // trying ten times (to avoid infinite loop if user likes all comments) to pick
      // a comment that the user hasn't already liked - then after gets a new photo.
      // gets a new photo a max number of 10 times.
      for (var j = 0; j < 100; j++) {

        // getting a new picture after 10 tries.
        if (j % 10 == 0) {
          random_pic = Math.floor(Math.random()*response.data.length);
        }

        random_com = Math.floor(Math.random()*response.data[random_pic].comments.data.length);

        // adding to the array, if the user hasn't already liked it.
        if (!response.data[random_pic].comments.data[random_com].user_likes) {
          like_objects.push(response.data[random_pic].comments.data[random_com].id);
          like_comments.push(response.data[random_pic].comments.data[random_com].message);
          like_link_to_comment.push(response.data[random_pic].link);
          break;
        }
      }
    } // end of 'for' loop

    photo_api_complete = 1;
    callback(callback_2); // calling checkLength(final_check);
  });
}

// 800 432 1359

// EFFECTS: This function checks to see if we've exhausted all of our
//          six month intervals. If not, it moves to the next one and
//          calls photo_API_request() again. Otherwise, tells the algorithm
//          to move onto generating the statuses.
// MODIFIES: Potentially start_year, start_month, end_year, end_month,
//           photo_api_complete, check_complete.
function final_check() {

  // Callback if there is any problems with code executing asynchronously.
  while (check_complete != 1) {
    setTimeout(function() { checkLength(final_check); }, 500);
    return;
  }

  // Call photo_API_request() again if we still have more 6 month intervals.
  if (!(end_year == current_year && end_month == current_month)) {

      photo_api_complete = 0;
      check_complete = 0;

      // moving to the next 6 month interval.
      start_year = end_year;
      start_month = end_month;

      end_month += 6;

      if (end_month > 12) {
        end_month = end_month % 12;
        ++end_year;
      }

      photo_API_request(checkLength, final_check);

  }
  // Otherwise, move onto generating the statuses. 
  else {
    // console.dir(photo_comments);
    populatePosts();
  }
}

// REQUIRES: final_check() MUST be the callback function in order
//           for the algorithm to execute as intended.
// EFFECTS: Waits for the photo_API_request() function to be completed,
//          then calls final_check() when it is finished.
// MODIFIES: Potentially check_complete.
function checkLength(callback) {

    while (photo_api_complete != 1) {
      var my_var = setTimeout(function() { checkLength(final_check); }, 500);
      console.log("NOT YET! api is not complete!");
      return 0;
    }

    check_complete = 1;
    callback(); // calling final_check();
}

// MODIFIES: The chosen_posts array, which contains the generated
//           'troll' statuses for the user.
// EFFECTS: Makes three API calls to gather data from the user.
//          Generates three random statuses based on the user's 
//          birthday, music interests, and friend list.
function populatePosts() {

  var user_birthday, random_band, random_friend;
  chosen_posts = [];

  // grabbing the user's birthday.
  FB.api("/me", function(response) {

    // storing the link back to the user's facebook wall.
    user_profile_link = response.link;

    // only grabbing the day and month - in format DD/MM
    user_birthday = response.birthday;

    // making sure they actually provide their birthday on fb - else theres an infinite spinning error
    if (typeof user_birthday != 'undefined') {
      user_birthday = user_birthday.substring(0, user_birthday.length - 5);

      // the upper limit of 100 is an arbitrary random number (it can be anything).
      var random = Math.floor(Math.random()*101);
      
      // the even/odd separation is simply there just to randomly select
      // which bank we're grabbing it from, if we need to b-day info before
      // or after our template.
      if (random % 2 == 0) {
        chosen_posts.push(user_birthday + post_birthday_templates[Math.floor(Math.random()*post_birthday_templates.length)]);
      }
      else {
        chosen_posts.push(post_birthday_templates_alt[Math.floor(Math.random()*post_birthday_templates_alt.length)] + user_birthday);
      }
    }
    else {
      console.log("no birthday status for this user :(");
    }
    
    birthday = 1;
  });

  // grabbing the user's music interests.
  FB.api("/me/music", function(response) {  

    if (response.data.length != 0) {

      var random = Math.floor(Math.random()*response.data.length);
      random_band = response.data[random].name;

      // explaination for even/odd separation in function above.
      if (random % 2 == 0) {
        chosen_posts.push(post_band_templates[Math.floor(Math.random()*post_band_templates.length)] + random_band.replace("'","\'"));
      }
      else {
        chosen_posts.push(random_band.replace("'","\'") + post_band_templates_alt[Math.floor(Math.random()*post_band_templates_alt.length)]);
      }       
    }   

    bands = 1;
  });

  // grabbing one of the user's friends, generating a status.
  FB.api("/me/taggable_friends?limit=100", function(response) {

    if (response.data.length != 0) {
      var random = Math.floor(Math.random()*response.data.length);
      random_friend = response.data[random].name;

      chosen_posts.push(funny_quotes[Math.floor(Math.random()*funny_quotes.length)] + random_friend);
    }
    
    // friends = 1;
  });

  friends = 1; // putting this here now to not throw an error, but when taggable friends is approved
               // well want to take this out & uncomment it above.

}

// ************* Function that fills in our empty div with our content we generated. ******************

// REQUIRES: The arrays must be filled with all of the suggestions for 'trolls'.
// MODIFIES: Empties the arrays after it generates the html for them. This is done
//           so if the algorithm is run again, it doesn't show the older trolls.
// EFFECTS: It takes all of the data from the arrays and puts it into an html
//          format so that the user can see them, and decide if they want
//          to execute the 'trolls' that were generated.
function displayData() {

  // making sure the div is empty, so we don't add to previous suggestions for 'trolls'.
  $('#troll-paste').empty();

  // making sure we generated statuses that integrate
  // friends, bands, and the user's birthday before we continue.
  while (friends != 1 || bands != 1 || birthday != 1) {
    setTimeout(function() { displayData(); }, 500);
    return;
  }

  // this is the variable that will hold all of the new content's html.
  var your_trolls = '<div class="row"><div class="medium-offset-2 medium-8 columns text-center">';
  your_trolls += '<h2 style="margin-bottom: 25px">Here\'s what we came up with:</div></div>';

  // adding all of the suggestions for photo comment 'trolls'.
  for (var i = 0; i < photo_comments.length; i++) {
    your_trolls += '<div class = "medium-4 columns">';
    your_trolls += '<ul class="pricing-table">';
    your_trolls += '<li class="title">Photo Comment</li>';
    your_trolls += '<li class="content" style="font-size: 1.75em">'+ photo_comments[i] + '</li>';
    your_trolls += '<li class="link-to-fb" style="font-size: 1.2em">See the photo <a href="' + photo_link_to_comment[i] + '" target="_blank">here</a></li>';
    your_trolls += '<li class="copy-paste"><a class="button trollz" onclick="copy_and_paste(this);">Copy & Paste!</a></li>';
    your_trolls += '<li class="price text"><textarea style="font-size: 0.6em" placeholder="What you want to post..."></textarea></li>';
    your_trolls += '<li class="cta-button"><a class="button round trollz" onclick="postComment(' + photo_objects[i] + ', this.parentNode.previousSibling.childNodes[0].value, this);">Comment!</a></li></ul></div>';
  }

  // adding all of the suggestions for status update 'trolls'.
  for (var i = 0; i < chosen_posts.length; i++) {
    your_trolls += '<div class = "medium-4 columns">';
    your_trolls += '<ul class="pricing-table">';
    your_trolls += '<li class="title">Status Update</li>';
    your_trolls += '<li class="content" style="font-size: 1.75em">'+ chosen_posts[i] + '</li>';
    your_trolls += '<li class="link-to-fb" style="font-size: 1.2em">On <a href="' + user_profile_link + '" target="_blank">your wall</a></li>';
    your_trolls += '<li class="copy-paste"><a class="button trollz" onclick="copy_and_paste(this);">Copy & Paste!</a></li>';
    your_trolls += '<li class="price text"><textarea style="font-size: 0.6em" placeholder="What you want to post..."></textarea></li>';
    your_trolls += '<li class="cta-button"><a class="button round trollz" onclick="postStatus(this.parentNode.previousSibling.childNodes[0].value, this)">Post!</a></li></ul></div>';
  }

  // adding all of the suggestions for liking comment 'trolls'.
  for (var i = 0; i < like_comments.length; i++) {
    your_trolls += '<div class = "medium-4 columns">';
    your_trolls += '<ul class="pricing-table">';
    your_trolls += '<li class="title">Like the comment</li>';
    your_trolls += '<li class="link-to-fb" style="font-size: 1.75em">'+ like_comments[i] + '</li>';
    your_trolls += '<li class="price" style="font-size: 1.2em">See the comment <a href="' + like_link_to_comment[i] + '" target="_blank">here</a></li>';
    // your_trolls += '<li class="bullet-item" style="display:none">' + photo_objects[i] + '</li>';
    your_trolls += '<li class="cta-button"><a class="button round trollz" onclick="postLike(\'' + like_objects[i] + '\', this);">Like!</a></li></ul></div>';
  }

  // adding the 'post all' button to the html variable.
  your_trolls += '</div><div class="row"><div class="medium-offset-2 medium-8 columns text-center">';
  your_trolls += '<a target="_blank"><button class="button radius spotify login-button" onclick="postAll();">Post <strong>ALL of them!</strong></button></a>';

  // updating the results
  $('#troll-paste').append(your_trolls);

  // making the slider go up and down while the content fills up.
  if (!$('#loading-contents').hasClass('none')) {
    $.when( $('.troll-container').slideUp() ).then(function() {
      $('#loading-contents').addClass('none');
      $('#troll-contents').removeClass('none');
      $('.troll-container').delay(400).slideDown(1200);
    });
  }

  // changing 'start trolling' to 'troll again'
  if ($('#submit-troll').text() == "Start Trolling!") {
    $('#submit-troll').text("Troll Again!");
  }

  // resetting the arrays if the 'troll again' button is pressed.
  console.log(chosen_posts); 
  your_trolls = "";
  photo_comments = [];
  chosen_posts = [];
  photo_link_to_comment = [];
  like_link_to_comment = [];
  photo_objects = [];      
  like_objects = [];
  like_comments = []; 

}

// **************** This is the function that is called when 'troll-me' is pressed **************

// MODIFIES: Fills in all of the data for the suggested 'trolls' in the appropriate
//           arrays. Generates trolls for photo comments, status updates, and random
//           comments on photos to like.
// EFFECTS: Gets all of the arrays ready to be manipulated by displayData().
//          Makes multiple calls to the FAcebook Open Graph API, and is essentially
//          the driver function for 'troll-me'.
function testAPI() {

  console.log('Welcome! Fetching your information.... ');

  // ********************** Clearing the data before **********************
  friends = 0;
  bands = 0;
  birthday = 0;

  your_trolls = "";
  photo_comments = [];
  photo_link_to_comment = [];
  like_link_to_comment = [];
  photo_objects = [];      
  like_objects = [];
  like_comments = []; 
  chosen_posts = [];

  iteration = 0;
  photo_api_complete = 0;

  // ****************** finding out our starting date ***********************

  // This generates three 6 month intervals to have data be drawn from.
  // In other words, it grabs 18 months of FB data. You can change this
  // variable if you wanted to go further in the timeline, but values
  // MUST be whole or half numbers.
  how_long_ago = 1.5; // years.


  // *********************** don't adjust ****************************

  // since
  start_year = current_year;
  start_month = current_month;
  start_day = current_day;

  // if its a whole number, just adjust the year.
  if (how_long_ago % 1 == 0) {
    start_year -= how_long_ago;
  }
  // otherwise, subtract the year, then adjust the months.
  else {
    start_year -= (how_long_ago - 0.5);

    // if subtracting 6 months takes you into the previous year.
    if (start_month - 6 < 0) {
      --start_year;
    }
    start_month = (start_month + 6) % 12;
  }

  // until
  end_year = start_year;
  end_month = start_month + 6;
  end_day = start_day;

  if (end_month > 12) {
    end_month = end_month % 12;
    ++end_year;
  }

  // ************************ end of don't adjust ************************

  // Calling the photo_API_request, which sets off the chain of 
  // callback functions that generate and populate all of the arrays
  // with the suggested trolls.
  photo_API_request(checkLength, final_check); 

} // testAPI()

// ********************************* Functions to actally post the trolls to FB ***********************

// REQUIRES: The object id of the photo, the troll comment, and the button used to post it.
// MODIFIES: Makes the button fade out that was used to post the comment.
// EFFECTS: Posts a photo comment on the photo specified by object id.
function postComment(obj_id, new_msg, btn) {
  var first_param = "/" + obj_id + "/comments";
  FB.api(first_param, "POST", { "message": new_msg },
    function (response) {
      if (response && !response.error) {
        // alert("it was successful!");
        btn.parentNode.previousSibling.childNodes[0].disabled = true;
        $(btn).fadeOut("slow");
      }
    }
  );
}

// REQUIRES: The troll status, and the button used to post it.
// MODIFIES: Makes the button fade out that was used to post the status.
// EFFECTS: Posts a status to the user's Facebook wall.
function postStatus(status_msg, btn) {
  FB.api(
    "/me/feed",
    "POST",
    {
      "message": status_msg
    },
    function (response) {
      if (response && !response.error) {
        // alert('Post successful!');
        btn.parentNode.previousSibling.childNodes[0].disabled = true;
        $(btn).fadeOut("slow");
      }
  });
}

// REQUIRES: The object id of the comment, and the button used to post it.
// MODIFIES: Makes the button fade out that was used to like the comment.
// EFFECTS: Likes the photo comment specified by object id.
function postLike(obj_id, btn) {
  var first_param = "/" + obj_id + "/likes";
  FB.api(
    first_param, "POST",
    function (response) {
      if (response && !response.error) {
        // alert("holllaaaa!");
        $(btn).fadeOut("slow");
      }
    }
  );
}

// EFFECTS: Essentially just presses all of the 'Troll!' buttons,
//          and in turn they will call the above three functions to
//          post the various trolls to the user's Facebook profile. 
function postAll() {
  var items = document.querySelectorAll(".trollz");
  for (var i = 0; i < items.length; i++) {
      items[i].click();
  }
}

// EFFECTS: copies the suggestion that was generated and pastes
//          it into the field for the user.
function copy_and_paste(btn) {  

  console.log("triggered");
  
  // Select the email link anchor text  
  var emailLink = btn.parentNode.previousSibling.previousSibling.innerHTML;  
  console.log("twerked");
  console.log(emailLink);

  // this is the "paste"
  btn.parentNode.nextSibling.childNodes[0].value = emailLink;

  // some nice UI to let the user know it worked
  $(btn).fadeOut(function() {
    
    btn.text = "Done!";
    btn.style.setProperty("background-color", "#7BA1D7", "important");
    $(btn).addClass("disabled");
    $(btn).fadeIn("slow");

    setTimeout(function() {
        $(btn).fadeOut("slow", function() {
          btn.text = "Copy & Paste!";
          btn.style.setProperty("background-color", "#0B243B", "important");
          $(btn).removeClass("disabled");
          $(btn).fadeIn("slow");
        });
    }, 1800);

  });

}
