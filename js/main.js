var url = "https://teamtreehouse.com/brampeirs.json";

$.getJSON(url, function(profileData){
  
  var totalPoints = 0
  var $pointsBarItem = 
  //Profile
  $('.profile_data').html('<h2>' + profileData.name  + '</h2>');
  $('.profile_picture').html('<img src="' + profileData.gravatar_url + '" alt="profile picture">');

  //Loopen over points object
  var pointsHTML = '<ul class="row">';
  var pointsBar = '<div id="pointsBar">';
  $.each(profileData.points, function(key, value){
    if(key.toUpperCase() === "TOTAL") {
      totalPoints = value;
      return true;
    } //skip iteration
    
    if (value !== 0) {
      var pointsBarItemColor = "#ddd";
      switch(key.toUpperCase()) {
        case "CSS":
          pointsBarItemColor = "#3079AB";
          break;
      case "HTML":
          pointsBarItemColor = "#39ADD1";
          break;
      case "JAVASCRIPT":
          pointsBarItemColor = "#c25975";
          break;
      case "HTML":
          pointsBarItemColor = "#f00";
          break;    
      case "DEVELOPMENT TOOLS":
          pointsBarItemColor = "#637a91";
          break;        
      default:
          pointsBarItemColor = "#d4d9dd";
      }
      console.log("total:" + totalPoints + " " + key + ": " + value + " :" + totalPoints/value)
      pointsBar  +=  '<span style="width: ' + value / totalPoints * 100 + '%; background-color: ' + pointsBarItemColor + '"></span>';
    }    
    
    pointsHTML += '<li class="col-sm-6 col-lg-3">';
    pointsHTML += '<h3>' + value.toLocaleString() +'</h3>';
    pointsHTML += '<p class="topic">'  + key + '</p>';
    pointsHTML += '</li>';
  });
  pointsBar += '</div>'
  
  pointsHTML += '</ul>';
  $('.profile_data').append(pointsBar);
  $('#points').html(pointsHTML);
    
  /*
  //Loopen over badges array
  var badgesHTML = '<ul class="badges">';
  for(var i = 0; i < profileData.badges.length; i ++) {
    badgesHTML += '<li>' + profileData.badges[i].name + '</li>';
  }
  badgesHTML += '</ul>'
  $('#badges').append(badgesHTML);*/
  
});


