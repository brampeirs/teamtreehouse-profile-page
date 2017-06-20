/*
  0. Global Variables
  1. Get Request
    2. Display Profile Data
    3. Display Points
    4. Display Badges
*/

/* 0. Global Variables */
var skillColors = {
  CSS:                 "#3079AB",
  HTML:                "#39ADD1",
  JavaScript:          "#c25975",
  "Development Tools": "#637a91"
};
var url = "https://teamtreehouse.com/brampeirs.json";
var totalPointsHTML = '';

function sortObj(sortObj, sortDirection, sortValue){
  var sortArray = [];
  
  //create two dimensional array for sorting
  $.each(sortObj, function(key, value){   
    sortArray.push([key, value]);        
  });
  
  //sort two dimensional array 
  sortArray.sort(function(a, b){
    if(sortDirection.toLowerCase() === 'desc') {
      if(sortValue.toLowerCase() === 'value') {
        return b[1] - a[1]; 
      } else {
        return b[0] - a[0]; 
      }      
    } else {
      if(sortValue.toLowerCase() === 'value') {
        return a[1] - b[1]; 
      } else {
        return a[0] - b[0]; 
      }
    }    
  });
  
  //create object of sorted array
  var resultObj = {};
  for (var i = 0; i < sortArray.length; ++i) {
    resultObj[sortArray[i][0]] = sortArray[i][1];
  }    
  return resultObj;
}

function displayProfileData(oProfileData){
  var profileDataHTML = '';
  var skillColor = '';
  var totalPoints = oProfileData.points.total;
  var oPointsSorted = {};
  
  // Profile Picture 
  profileDataHTML += '<div class="profile_picture">';
  profileDataHTML += '<img src="' + oProfileData.gravatar_url + '" alt="profile picture">';
  profileDataHTML += '</div>';
  
  // Profile Name 
  profileDataHTML += '<div class="profile_data">';
  profileDataHTML += '<h2>' + oProfileData.name  + '</h2>';
  profileDataHTML += '</div>';
  
  $('#profile').html(profileDataHTML);  
  
  // Points Bar 
  profileDataHTML = '<div id="pointsBar">';
  
  //Loop sorted points object
  oPointsSorted = sortObj(oProfileData.points, 'desc', 'value');
  $.each(oPointsSorted, function(key, value){
    if (key.toLowerCase() === 'total' || value === 0) {return true;} //skip iteration    
    skillColor = "#d4d9dd";
    if(skillColors.hasOwnProperty(key)) {
      skillColor = skillColors[key];
    }          
    profileDataHTML  +=  '<span data-toggle="tooltip" data-html="true"  data-title="' + key + '" style="width: ' + value / totalPoints * 100 + '%; background-color: ' + skillColor + '"></span>';      
  });  
  profileDataHTML += '</div>';  
  
  $('.profile_data').append(profileDataHTML);
}

function displayPoints(oProfileData){
  var pointsHTML = '';
  var oPointsSorted = {};
  
  pointsHTML =  '<div class="row">';
  pointsHTML +=   '<div class="col-12">';
  pointsHTML +=     '<h2>' + oProfileData.points.total.toLocaleString() + '</h2>';
  pointsHTML +=     '<p class="total_points">Total Points</p>';
  pointsHTML +=   '</div>';
  pointsHTML += '</div>';
  
  //Loop sorted points object
  pointsHTML += '<div class="row">';
  
    oPointsSorted = sortObj(oProfileData.points, 'desc', 'value');
    $.each(oPointsSorted, function(key, value){
      if (key.toLowerCase() === 'total') {return true;} //skip iteration 

      pointsHTML += '<div class="col-6 col-lg-3">';
      pointsHTML +=   '<h3>' + value.toLocaleString() +'</h3>';
      pointsHTML +=   '<p class="skill">' + key + '</p>';
      pointsHTML += '</div>';
    });
  
  pointsHTML += '</div>'; /* row */
  
  pointsHTML += '<div class="disclaimer">';
  
pointsHTML += '<span class="fa-stack fa-lg">';
pointsHTML += '  <i class="fa fa-circle-o fa-stack-2x"></i>';
pointsHTML += '  <i class="fa fa-info fa-stack-1x fa-inverse"></i>';
pointsHTML += '</span>';

  
  pointsHTML +=   '<p>Points are earned whenever you take an important action on Treehouse.<br>';
  pointsHTML +=   'Learn more about when and how points are earned.</p>';
  pointsHTML += '</div>';
  
  $('#points').html(pointsHTML);
}


// 1. Get Request 
$.getJSON(url, function(response){
  
  // 2. Display Profile Data 
  displayProfileData(response);
  
  // 3. Display Points 
  displayPoints(response); 
  
  // Initialise bootstrap tooltips: placed at the end because tooltips added dynamicaly (see points bar) 
  $('[data-toggle="tooltip"]').tooltip();
  
});


