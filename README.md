assignment_ajax_puppies
=======================

GET! POST! FETCH!


##Build Some Puppies

*Set up the "Update puppies list" link so clicking it will pull the latest list of puppies from the server and use that to populate the puppies list on the page. You might consider creating a separate function to handle generating the DOM elements from the raw object that was returned. You'll also need to prevent the link's default behavior.
*Set up your form to submit asynchronously. You'll need to serialize the form inputs and send them using AJAX. Turns out you actually will need to use the serializeArray method...
*When the form submits successfully, add the returned puppy object to the top of the list.
*If the form submits unsuccessfully, display the returned error message.
*Wire up the "adopt" links next to each puppy so they remove the puppy from the back end (DELETE) and, when that is successful, the puppy is removed from the list as well.

##Give User Feedback

Create a simple AJAX status notification at the top of the page which sits atop other elements. It should show up whenever a new request is initiated and contain the following states:

*"Waiting..." (yellow) after a new request is initiated.
*"Sorry this is taking so long..." (yellow) after 1 second if it hasn't completed
*"Finished!" (green) after successful. This should fade out after 2 seconds.
*"Failed. Errors were: Puppy Name is required to be present" (red) after failure. This should be dynamically populated with error messages and fade out after 2 seconds.
To test this, turn off your internet briefly before making a request.

