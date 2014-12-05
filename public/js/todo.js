$( document ).ready(function() {
  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      var checkbox = $('<li><input type="checkbox"></input></li>');
      $('ul').append(checkbox);
      var user_input = $('#target').val();
      $(checkbox).append('<span>' + user_input + '</span>');
      // RESESTS TO PLACEHOLDER
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
    // CROSS OUT LIST ITEM IF BOX CHECKED
    $('input:checkbox').change(
      function() {
        if(this.checked) {
          // add class
          // link to styles.css is best practice
          $(this).siblings().css('text-decoration', 'line-through');
        } else {
          // remove class
          $(this).siblings().css('text-decoration', 'none');
        }
      });
    // TODO LIST COUNTER
  });  
});