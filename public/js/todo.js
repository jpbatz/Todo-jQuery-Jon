$(function() {
  // autoload the saved file
  $.get('/items', function( list_items ) {
    for(var i =0; i<list_items.length; i++) {
      
      var list_label = $('<span>', {
        text : list_items[i].title
      });

      var list_item = $('<li>',{
        class : "list_items",
        "data-object-id": list_items[i]._id
      });

      var list_checkbox = $('<input>', {
        type : "checkbox"
      });

      var list_delete = $('<button>', {
        text : "[delete]",
        click : function (e) {
          var button = $(e.currentTarget);
          var object_id = button.closest("li").data("object-id");
          
          $.ajax( '/items/' + object_id ,
            {
              type : "DELETE",
              success : function (data) {
                console.log('data',data);
              }
            }
          );
        }
      });

      if(list_items[i].completed === "true") {
        list_checkbox.attr("checked","checked");
      }

      list_item
        .append( list_checkbox )
        .append( list_label )
        .append( list_delete );
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

      $.post('/items', post_data, function (data){ });  

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
});