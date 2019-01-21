$("document").ready(function(object){
    //function to bind keypress for tweetInput
    $("#tweetInput").on("keyup", function(object) {
      //update counter to length of word
      var tweetLength = $("span.counter").text((140 - ($(this).val().length)));
      console.log(tweetLength);
      //if negative turn text red
      if (tweetLength.text() < 0 ) {
        tweetLength.addClass("err");
        //else leave it the same color
      } else {
        tweetLength.removeClass("err");
      }
    });
  });