//get the list of breeds for the select dropdown
function getBreedsOptions(){
  $.ajax( {

    url: "http://rocky-dusk-3509.herokuapp.com/breeds.json",
    type: "GET",
    dataType : "json",

    success: function( json ) {
      $('#breeds')
      
      json.forEach(function(breed){
      
        //turn milliseconds into minutes
        var $breedOption = $("<option value='"+breed.id +"'>"+breed.name+"</option>");
        $('#breeds').append($breedOption);
      });
    },

    // Error callback to run if the request fails
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    }
  });
}

function submitPuppy(submission){
  $.ajax( {
    url: "http://rocky-dusk-3509.herokuapp.com/puppies.json",

    data: { name: submission.name,
        breed_id: submission.breed_id },

    type: "POST",
    dataType : "json",

    success: function( json ) {
      getPuppies();
    },

    // Error callback to run if the request fails
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
  });
}

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
        $puppyEntry = $("<li><strong>"+puppy.name+"</strong>("+puppy.breed.name+"), created "+minutesAgo +" minutes ago -- <a href = ''>adopt</a></li>");
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


$( document ).ready(function(){
  getBreedsOptions();

  $( '#refresh' ).click( getPuppies() );
  

  $( "#puppy-form" ).submit(function( event ) {
    submission = $( this ).serializeArray(); //'this' is the whole form
    submitPuppy(submission);
    
    //refresh puppy list
    getPuppies();
    event.preventDefault();
  });
});
