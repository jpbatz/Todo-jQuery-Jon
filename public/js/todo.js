$( document ).ready(function() {
  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      event.preventDefault();
      var user_input = $('#target').val();
      $('ul').append('<li>' + user_input + '</li>');
      // resets to placeholder
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
  });  
});