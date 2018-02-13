$(document).ready(function () {
  
  // select the form and use submit event. add a parameter called event-evt
  $('form').submit(function (evt) {
    //stops normal response of the event so we dont leave webpage
    evt.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');
    
    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("searching...");
    // the AJAX request with getJSON arguments
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?       jsoncallback=?";
    //common to store request in a var so can be reused
    var animal = $searchField.val(); // text of the submit var
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      $.each(data.items, function (i, photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }
    
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    
  });
  
});