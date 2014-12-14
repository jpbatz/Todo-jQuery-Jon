$(function() {
  // autoload the saved file
  $.get('/items', function( list_items ) {
    for(var i =0; i<list_items.length; i++) {
      
      var list_label = $('<span>', {
        text : list_items[i].title
      });

      var list_item = $('<li>',{
        class : "list_items"
      });

      var list_checkbox = $('<input>', {
        type : "checkbox"
      });

      if(list_items[i].completed) {
        list_checkbox.attr("checked","checked");
      }

      list_item
        .append( list_checkbox )
        .append( list_label );
      
      $('ul').append( list_item );
      
    };
  });

  $( "#target" ).keydown(function(event) {
    if( event.which == 13 ) {
      var checkbox = $('<li><input type="checkbox"></input></li>');
      $('ul').append(checkbox);
      checkbox.addClass('list_items');
      var user_input = $('#target').val();
      checkbox.append('<span>' + user_input + '</span>');
      // RESETS TO PLACEHOLDER
      $('input').val('');

      var post_data = {
        new_item : {
          title : user_input,
          checked : false
        }
      }

      $.post('/item', post_data, function(data){ });  

        // if data is not err
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