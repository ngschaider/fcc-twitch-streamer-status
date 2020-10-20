var STREAMERS = [
  "esl_sc2",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "comster404",
  "brunofin",
  "tanzverbotcf",
];
var stream = "";

$(document).ready(function(){
  checkStatus();
});

function checkStatus(){
  for(var i=0;i<STREAMERS.length;i++){
    stream = STREAMERS[i];
    console.log(stream);
    $.getJSON("https://api.twitch.tv/kraken/streams/"+stream, createCallback(stream)).fail(failCallback(stream));
  }
}

function createCallback(stream) {
   return function(data) {
      gotStatus(data, stream);
   };
 }

function failCallback(stream) {
   return function(data) {
      failStatus(data, stream);
   };
 }

function failStatus(data, stream){
  if(data.status == 422){
    
    var html = "<span class='channelname'>"+stream+"</span><p class='notexisting'>Account does not exist</p>";
    $("#status-wrapper").append(html);
  }
}




function createchanCallback(stream) {
   return function(data) {
      gotChanStatus(data, stream);
   };
 }

function gotChanStatus(data, stream){    
  var html = "<span class='channelname'>"+data.display_name+"</span>";
  html += "<a href='"+data.url+"'><p class='offline'>Offline<p></a>";
  
  $("#status-wrapper").append(html);
};

function gotStatus(data, stream){
  console.log(stream);
  console.log(stream+" exists!");
  if(data.stream === null){ // if offline
    $.getJSON("https://api.twitch.tv/kraken/channels/"+stream, createchanCallback(stream));
  }
  else{ // if online
    var html = "<span class='channelname'>"+data.stream.channel.display_name+"</span>";
    html += "<a href='"+data.stream.channel.url+"' target='_blank'><p class='online'>Online<br> Currently playing: "+data.stream.game+"</p></a>";
  }
  $("#status-wrapper").append(html); //apply the html variable to DOM
}