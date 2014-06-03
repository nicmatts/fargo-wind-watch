
$(document).ready(function($) {
  $.ajax({
    url : "http://api.wunderground.com/api/58d1555600ee8ced/geolookup/conditions/q/ND/Fargo.json",
    dataType : "jsonp",
    success : function(parsed_json) {
    var location = parsed_json['location']['city'];
    var wind_string = parsed_json['current_observation']['wind_string'];
    var wind_dir = parsed_json['current_observation']['wind_dir'];
    var wind_degrees = parsed_json['current_observation']['wind_degrees'];
    var wind_mph = parsed_json['current_observation']['wind_mph'];
    var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
  
    //display wind speed   
    $(".wind").text(wind_mph);

    //change wind speed background depending on direction of wind
    if (wind_dir == "N"){
      $('.wind').css({background: 'url(north.png)'});
    } else if (wind_dir == "NW" || wind_dir == "NNW" || wind_dir == "WNW"){
      $('.wind').css({background: 'url(nw.png)'});
    } else if (wind_dir == "NE" || wind_dir == "NNE" || wind_dir == "ENE"){
      $('.wind').css({background: 'url(ne.png)'});
    } else if (wind_dir == "E"){
      $('.wind').css({background: 'url(east.png)'});
    } else if (wind_dir == "SE" || wind_dir == "SSE" || wind_dir == "ESE"){
      $('.wind').css({background: 'url(se.png)'});
    } else if (wind_dir == "S"){
      $('.wind').css({background: 'url(south.png)'});
    } else if (wind_dir == "SW" || wind_dir == "SSW" || wind_dir == "WSW"){
      $('.wind').css({background: 'url(sw.png)'});
    } else if (wind_dir == "W"){
      $('.wind').css({background: 'url(west.png)'});
    } else {
      $('.wind').css('background', 'url(no-wind.png)');
    }

    //change text depending on wind speed
    if (wind_mph === 0){
      $(".wind-text").text("There's no wind!");
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
    } else if (wind_mph >=30){
      $(".wind-text").text("Watch out for flying debris!");
    } else {
      $(".wind-error").text("Data is temporarily unavailable.");
    }
     // add wind data text if wind mph is available   
    if (wind_mph > 0){
      $(".wind-data").text("Wind is out of the " + wind_dir + " at " + wind_mph + ".");
    }
  }
  });
});

