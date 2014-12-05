$( document ).ready(function() {
  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      event.preventDefault();
      var user_input = $('#target').val();
      var checkbox = $('<input type="checkbox">');
      $('ul').append('<li>' + user_input + '</li>');
      var checkbox = $('<input type="checkbox">');
      $('li').append(checkbox);
      // resets to placeholder
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
    // CROSS OUT LIST ITEM IF BOX CHECKED
    $('input:checkbox').change(
      function() {
        if(this.checked) {
          console.log("meow");
        }
      })
  });  
});