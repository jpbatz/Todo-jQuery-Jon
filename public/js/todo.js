$( document ).ready(function() {
  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      var checkbox = $('<li><input type="checkbox"></input></li>');
      $('ul').append(checkbox);
      var user_input = $('#target').val();
      $(checkbox).append(user_input);
      // var checkbox = $('<input type="checkbox">');
      // $('li').append(checkbox);
      // resets to placeholder
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
    // CROSS OUT LIST ITEM IF BOX CHECKED
    $('input:checkbox').change(
      function() {
        if(this.checked) {
          $('li').wrap('<strike>');
        }
      })
  });  
});