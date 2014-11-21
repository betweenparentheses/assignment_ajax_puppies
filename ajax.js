

function getPuppies(){
  $.ajax( {

    // The URL (path) for the request
    // The below would submit to http://www.yoursite.com/post
    url: "http://rocky-dusk-3509.herokuapp.com/puppies.json",

    // the data to send (will be converted to a query string)
    // note that this is an object
    // data: {
    //     id: 123
    // },

    // HTTP verb (aka "Type" of request)
    type: "GET",

    // the type of data we expect back
    dataType : "json",

    // Success callback to run if the request succeeds.
    // The response is passed to the function
    // as a variable, usually called `data` or `json`
    success: function( json ) {
      $('#puppy-list').empty();
      json.forEach(function(puppy){
        //turn milliseconds into minutes
        minutesAgo = Math.floor(new Date(Date.now()- new Date(puppy.created_at)) / 60000);
        $puppyEntry = $("<li>"+puppy.name+"("+puppy.breed.name+"), created "+minutesAgo +" minutes ago -- <a href = ''>adopt</a></li>");
        $('#puppy-list').append($puppyEntry);
      });
      console.log(stuff);
    },

    // Error callback to run if the request fails
    // (e.g. server returns an error code like 301)
    // The raw request and any status codes are 
    // passed to the callback
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },

    // Complete callback to run regardless of the outcome
    complete: function( xhr, status ) {
        alert( "The request is complete!" );
    }
  });
};


$(document).ready(function(){
  $('#refresh').click(getPuppies());


});