//get the list of breeds for the select dropdown
function getBreedsOptions(){
  $.ajax( {

    url: "http://pacific-stream-9205.herokuapp.com/breeds.json",
    type: "GET",
    dataType : "json",

    success: function( response ) {
      $('#breeds')

      response.forEach( function(breed){

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
    url: "http://pacific-stream-9205.herokuapp.com/puppies.json",

    data: JSON.stringify({ name: submission[0].value,
                           breed_id: submission[1].value }),

    type: "POST",
    dataType : "json",
    contentType : "application/json",

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

function deletePuppy(target){
  var puppyID = target.data('id');

  $.ajax( {
    url: "http://pacific-stream-9205.herokuapp.com/puppies/"+puppyID+".json",

    // No need for data. It's all in the path
    type: "DELETE",
    contentType : "application/json",

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

    url: "http://pacific-stream-9205.herokuapp.com/puppies.json",

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
        $puppyEntry = $("<li><strong>"+puppy.name+"</strong>("+puppy.breed.name+"), created "+minutesAgo +" minutes ago -- <a class = 'delete-link' href = '' data-id = '"+ puppy.id +"'>adopt</a></li>");
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


  $( 'body').on('click', '.delete-link', function(event){
    $target = $(this);
    deletePuppy($target);
    event.preventDefault();
  });


  $( "#puppy-form" ).on('submit', function( event ) {
    submission = $( this ).serializeArray(); //'event.target' is the whole form
    submitPuppy(submission);

    event.preventDefault();
  });
});
