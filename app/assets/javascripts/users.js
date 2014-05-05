
jQuery(document).ready(function(){
	$('#datepicker').datepicker({ 
		dateFormat: 'yy-mm-dd',
	    minDate: 0
	}).val();
	$('.input-group-addon').click(function() {
		$("#datepicker").datepicker( "show" );
	});
  });


// select/de-select classrooms while add/edit school-admin,teacher,student
// select/de-select users while add/edit classroom
    $(function () {
      $('select#already_assigned_id').listbox({'searchbar': true});
      $('select#all_present_id').listbox({'searchbar': true});
    });
  $(document).ready(function() {

    $('.remove').click(function(e) {
      selected_ids = $("#selected_ids").val().split(" ");
      $('#already_assigned_id option:selected').each(function(){
        selected_ids.removeByValue(this.value)
      });
      $('#already_assigned_id option:selected').remove();
      $("#selected_ids").val(selected_ids.join(" "));
      $('#assigned_div').children('div .lbjs').remove();
      $('select#already_assigned_id').listbox({'searchbar': true});
    });

    $('.add').on('click', function(){
      selected_ids = []
      var selectedOpts = $('#all_present_id option:selected').clone();
      selectedOpts.each(function(i){
        if($("#already_assigned_id option[value='"+this.value+"']").length <= 0){
          $('#already_assigned_id').append(this);
          selected_ids.push(this.value);
        }
      });
      $("#selected_ids").val($.merge($("#selected_ids").val().split(" "), selected_ids).join(" "));
      $('#assigned_div').children('div .lbjs').remove();
      $('select#already_assigned_id').listbox({'searchbar': true});
    });
  });

  Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}


 

