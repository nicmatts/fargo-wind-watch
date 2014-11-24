$(document).ready(function($) {
  $.ajax({
    url : "http://api.wunderground.com/api/58d1555600ee8ced/geolookup/conditions/q/ND/Fargo.json",
    dataType : "jsonp",
    success : function(parsed_json) {
      wind_dir = parsed_json['current_observation']['wind_dir'];
      wind_mph = parsed_json['current_observation']['wind_mph'];
      //don't need this one, but may use it later
      var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
      var observation_time = parsed_json['current_observation']['observation_time'];
      var windchill = parsed_json['current_observation']['windchill_f'];
      windchill = parseInt(windchill, 10);
      var temp = parsed_json['current_observation']['temp_f'];
      windSpeed(wind_mph);
      windDirection(wind_dir);
      windInfo(wind_mph);
      windText(wind_mph);
      windchillText(windchill);
      observationTime(observation_time);
      console.log("Wind: " + wind_mph);
      console.log(windchill);
      console.log(temp);
      console.log(typeof(windchill));
      // console.log("Direction: " + wind_dir);
      // console.log("Gust:" + wind_gust_mph);
      // console.log("last updated: " + observation_time);
    }
  });
});

//display wind speed
var windSpeed = function(wind_mph){
  if (wind_mph >= 0){
    $(".wind").append("<div class='wind-mph'>" + wind_mph + "</div");
  }
};


//change wind speed background depending on direction of wind
var windDirection = function(wind_dir){
    if (wind_dir == "N" || wind_dir == "North"){
      $('.wind').css({background: 'url(img/north.png)'});
    } else if (wind_dir == "NW" || wind_dir == "NNW" || wind_dir == "WNW"){
      $('.wind').css({background: 'url(img/nw.png)'});
    } else if (wind_dir == "NE" || wind_dir == "NNE" || wind_dir == "ENE"){
      $('.wind').css({background: 'url(img/ne.png)'});
    } else if (wind_dir == "E" || wind_dir == "East"){
      $('.wind').css({background: 'url(img/east.png)'});
    } else if (wind_dir == "SE" || wind_dir == "SSE" || wind_dir == "ESE"){
      $('.wind').css({background: 'url(img/se.png)'});
    } else if (wind_dir == "S" || wind_dir == "South"){
      $('.wind').css({background: 'url(img/south.png)'});
    } else if (wind_dir == "SW" || wind_dir == "SSW" || wind_dir == "WSW"){
      $('.wind').css({background: 'url(img/sw.png)'});
    } else if (wind_dir == "W" || wind_dir == "West"){
      $('.wind').css({background: 'url(img/west.png)'});
    } else {
      $('.wind').css({background: 'url(img/no-wind.png)'});
    }
};

//change text depending on wind speed
var windInfo = function(wind_mph) {
    if (wind_mph === 0){
      $(".wind-text").text("There's no wind!");
      $('.wind').css({background: 'url(img/no-wind.png)'});
    } else if (wind_mph > 0 && wind_mph < 8){
      $(".wind-text").text("The wind is calm.");
    } else if (wind_mph >=8 && wind_mph < 13){
      $(".wind-text").text("There's a gentle breeze blowing.");
    } else if (wind_mph >=13 && wind_mph < 17){
      $(".wind-text").text("It's a little windy, not too bad.");
    } else if (wind_mph >=17 && wind_mph < 18){
      $(".wind-text").text("It's pretty breezy out there.");
    } else if (wind_mph >=18 && wind_mph < 24){
      $(".wind-text").text("You could fly a kite in this.");
    } else if (wind_mph >=24 && wind_mph < 30){
      $(".wind-text").text("Uff da, it's windy out.");
    } else if (wind_mph >=30 && wind_mph <100){
      $(".wind-text").text("Watch out for flying debris!");
    } else {
      $(".wind-error").text("Data is temporarily unavailable.");
    }
  };

// add wind data text if wind mph is available   
var windText =  function(wind_mph){
 if (wind_mph > 0 && wind_mph != "Variable"){
    $(".wind-data").text("Wind is out of the " + wind_dir + " at " + wind_mph + ".");
  } else if (wind_mph == "Variable") {
    $(".wind-data").text("Wind is variable at " + wind_mph + ".");
  } else {
    $(".wind-data").text("Check back in a few minutes.");
  }
};

// add windchill data if available
var windchillText =  function(windchill){
 if (windchill){
    console.log("good so far");
    $(".wind-data").prepend("<h2>The windchill is " + windchill + ".</h2>");
  } else {
    $(".wind-data").prepend("No windchill data available.");
  }
};

var observationTime = function(observation_time){
  $(".wind-data").append("<p class='observation-time'>" + observation_time + "</p>");
};


