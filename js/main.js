var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var profileData = JSON.parse(xhr.responseText);
    $('.profile_data').html('<h2>' + profileData.name  + '</h2>');
    
    $('.profile_picture').html('<img src="' + profileData.gravatar_url + '" alt="profile picture">');
    
    /*
    //Loopen over points object
    var pointsHTML = '<ul class="points">';
    for(var key in profileData.points) {
      pointsHTML += '<li>' + key + ': ' + profileData.points[key] + '</li>';
    }
    pointsHTML += '</ul>';
    $('#points').append(pointsHTML);
    
    //Loopen over badges array
    var badgesHTML = '<ul class="badges">';
    for(var i = 0; i < profileData.badges.length; i ++) {
      badgesHTML += '<li>' + profileData.badges[i].name + '</li>';
    }
    badgesHTML += '</ul>'
    $('#badges').append(badgesHTML);*/
  }
};
xhr.open('GET', 'https://teamtreehouse.com/brampeirs.json');
xhr.send();