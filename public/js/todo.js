$(function() {
  // autoload the saved file
  $.get('/todo_save.txt', function(data) {
    var list_items = jQuery.parseJSON(data);
    for(var i =0; i<list_items.length; i++) {
      var checked= '';
      if(list_items[i].completed) {
        checked = 'checked="checked"';
      }
      var checkbox = $('<li class="list_items"><input type="checkbox" ' + checked + '></input></li>');
      $('ul').append(checkbox);
      checkbox.append('<span>' + list_items[i].title + '</span>');
    };
  });

  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      var checkbox = $('<li><input type="checkbox"></input></li>');
      $('ul').append(checkbox);
      checkbox.addClass('list_items');
      var user_input = $('#target').val();
      checkbox.append('<span>' + user_input + '</span>');
      // RESESTS TO PLACEHOLDER
      $('input').val('');
    }
  });

  // CROSS OUT LIST ITEM IF BOX CHECKED
  $('ul').on('change', 'input[type=checkbox]', function() {
    if(this.checked) {
      $(this).siblings().css('text-decoration', 'line-through');
    } else {
      console.log("uncheck");
      $(this).siblings().css('text-decoration', 'none');
    }
  });

  // save
  // $('button#save').click(function() {
  //   console.log('save button clicked');
  //   var list_items_array = [];
  //   $('.list_items').each(function (i, obj) {
  //     var list_item = {
  //       'index': i,
  //       'title': $(obj).text(),
  //       'completed': $(obj).find('input:checked').length > 0
  //     };
  //     list_items_array.push(list_item);
  //   });
  //   var the_list_to_save = {'list': JSON.stringify(list_items_array)}
  //   $.post('/item', the_list_to_save);
  // });
});