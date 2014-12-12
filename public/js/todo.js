$(function() {
  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      var checkbox = $('<li><input type="checkbox"></input></li>');
      $('ul').append(checkbox);
      checkbox.addClass('list_items');
      var user_input = $('#target').val();
      $(checkbox).append('<span>' + user_input + '</span>');
      // RESESTS TO PLACEHOLDER
      $('input').val('').removeAttr('checked').removeAttr('selected');
    }
    // CROSS OUT LIST ITEM IF BOX CHECKED
    $('input:checkbox').change(
      function() {
        if(this.checked) {
          $(this).siblings().css('text-decoration', 'line-through');
        } else {
          console.log("uncheck");
          $(this).siblings().css('text-decoration', 'none');
        }
      });
  });

  // save
  $('button#save').click(function() {
    console.log('save button clicked');
    var list_items_array = [];
    $('.list_items').each(function (i, obj) {
      var list_item = {
        'index': i,
        'title': $(obj).text(),
        'completed': $(obj).find('input:checked').length > 0
      };
      list_items_array.push(list_item);
    });
    var the_list_to_save = {'list': JSON.stringify(list_items_array)}
    $.post('/save', the_list_to_save);
  });
});