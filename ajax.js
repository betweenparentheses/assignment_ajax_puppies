

function getPuppies(){
  $.ajax( {

    url: "http://rocky-dusk-3509.herokuapp.com/puppies.json",

    // the data to send (will be converted to a query string)
    // note that this is an object
    // data: {
    //     id: 123
    // },
    type: "GET",
    dataType : "json",

    success: function( json ) {
      $('#puppy-list').empty();
      //newest to oldest
      puppies = json.reverse();
      
      puppies.forEach(function(puppy){
      
        //turn milliseconds into minutes
        minutesAgo = Math.floor(new Date(Date.now()- new Date(puppy.created_at)) / 60000);
        $puppyEntry = $("<li>"+puppy.name+"("+puppy.breed.name+"), created "+minutesAgo +" minutes ago -- <a href = ''>adopt</a></li>");
        $('#puppy-list').append($puppyEntry);
      });
    },

    // Error callback to run if the request fails
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
