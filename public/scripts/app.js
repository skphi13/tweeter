/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json
$(document).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function createDate(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(function(tweet) {
        let $tweet = createTweetElement(tweet);
        $('.tweets-container').prepend($tweet);
    });
}

function createTweetElement(tweet) {
    console.log(tweet);
    // let date = new Date(tweet.created_at).toString().slice(0, 15);
    let imgUrl = $('<img>').attr("src", tweet.user.avatars.large);
    let h1 = $('<h1>').text(tweet.user.name);
    let span = $('<span>').text(tweet.user.handle);
    let header = $('<header>').append(imgUrl).append(h1).append(span);
    let div = $('<div>').text(tweet.content.text);
    let footer = $('<footer>').append('<span>').text("Created " + createDate(tweet.created_at));
    let $tweet = $('<article>').addClass('tweet').append(header).append(div).append(footer);
    
  // ...
  return $tweet;
}

$(function () {
  let $post = $('form input');
  $post.click(function() {
    let tweetData = $('form').serialize();
    event.preventDefault();
    console.log("submit buttom click");
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: tweetData,
      success: function(newTweets) {
      console.log('Success: ', newTweets);
      }
    });
  });
});

renderTweets(data);
});




