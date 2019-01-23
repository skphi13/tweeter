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

//rendering the tweet
function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    });
}
// create the tweet
function createTweetElement(tweet) {
    let imgUrl = $('<img>').attr("src", tweet.user.avatars.large);
    let h1 = $('<h1>').text(tweet.user.name);
    let span = $('<span>').text(tweet.user.handle);
    let header = $('<header>').append(imgUrl).append(h1).append(span);
    let div = $('<div>').text(tweet.content.text);
    let divIcon = $('<div>').addClass('icons');
    let flagIcon = $('<i>').addClass('fas fa-flag');
    let retweetIcon = $('<i>').addClass('fas fa-retweet');
    let heartIcon = $('<i>').addClass('fas fa-heart');
    let icons = divIcon.append(flagIcon).append(retweetIcon).append(heartIcon);
    let footer = $('<footer>').append('<span>').text("Created " + createDate(tweet.created_at) + " ago").append(icons);
    let $tweet = $('<article>').addClass('tweet').append(header).append(div).append(footer);
    return $tweet;
    console.log($tweet);
}

//hiding errors
$('#emptyError').hide();
$('#fullError').hide();

// preventdefault from submit form, post ajax
$(function () {
  let tweetPost = $('form input');
  tweetPost.click(function() {
    let tweetData = $('form').serialize();
    let textContent = $('textarea#tweetInput').val().length;
    event.preventDefault();
    $('#emptyError').slideUp();
    $('#fullError').slideUp();
      if (textContent === 0) {
        $('#emptyError').slideDown();
      } else if ( textContent > 140 ) {
        $('fullError').slideDown();
      } else {
        $.ajax({
        url: "/tweets/",
        type: "POST",
        data: tweetData,
        success: function(newTweets) {
          console.log('Success: ', newTweets);
          loadTweets();
          }
        });
      }
    });
});

//compose button toggle
$('.container .new-tweet').hide();
$('.compose-button').click(function() {
  $(this).toggleClass('higlight');
  $('html, body').animate({
    scrollTop: '0px'
  }, 300);
  $('.container .new-tweet').slideToggle();
  $('.container textarea').select();
})

// loading tweets back
function loadTweets() {
  $(function () {
    $.ajax({
      url: "/tweets/",
      type: "GET",
      success: function (tweets) {
        console.log("Is it working", tweets)
        renderTweets(tweets);
      }
    });
  });
}
// renderTweets(data);
loadTweets();

});




