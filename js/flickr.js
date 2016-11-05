$(document).ready(function() {


 $('form').submit(function (e) {
    // highlight the button
    // not AJAX, just cool looking
   e.preventDefault();
   var $searchField = $('#search');
   var $submitButton = $('#submit');
   $searchField.prop("disabled", true);
   $submitButton.attr("disabled",true).val("Searching....");
   
    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $searchField.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      if ($.isEmptyObject(data.items) === true){
        alert("not found");
      }
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled",false).val("submit");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready