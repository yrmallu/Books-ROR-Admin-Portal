$(document).ready(function () {
    $('.classroom-check-box').change(function () {
        var check = ($('.classroom-check-box').filter(":checked").length == $('.classroom-check-box').length);
        $('.select-all-classroom').prop("checked", check);
    });
	// enable/disable delete button whether select-all check-box is checked or not
    $('.select-all-classroom').click(function () {
        if($("#classroom_table .classroom-check-box:checked").length > 0)
			document.getElementById("delete_classroom").disabled=true;
		else
			document.getElementById("delete_classroom").disabled=false;  
    });
	// enable/disable delete button whether any check-box is checked or not
    $('.classroom-check-box').click(function () {
       if($("#classroom_table .classroom-check-box:checked").length > 0)
			document.getElementById("delete_classroom").disabled=false;
		else
			document.getElementById("delete_classroom").disabled=true;  
    }); 
});
	
// select-all check-box functionality
$(document).on("click",".select-all-classroom",function(){
	$('.classroom-check-box').prop('checked', $(this).is(':checked'));

// checking school year validation
//$( ".classroom_form" ).submit(function( event ) {	
$( "#classroom_school_year_end_date" ).change(function() {
  if ($('#classroom_school_year_start_date').val() >= $('#classroom_school_year_end_date').val() )
  {
	$('#id_end_msg').show();
	return false;
  }
  else
  {
	$('#id_end_msg').hide();
	return true;
  }
});
$( "#classroom_school_year_start_date" ).change(function() {
  if ($('#classroom_school_year_start_date').val() >= $('#classroom_school_year_end_date').val() )
  {
	$('#id_end_msg').show();
	return false;
  }
  else
  {
	$('#id_end_msg').hide();
	return true;
  }
});
//});
});

    $(function () {
      $('select#student_assigned_id').listbox({'searchbar': true});
      $('select#all_student_id').listbox({'searchbar': true});
    });
  $(document).ready(function() {

    $('.remove').click(function(e) {
      student_selected_ids = $("#student_selected_ids").val().split(" ");
      $('#student_assigned_id option:selected').each(function(){
        student_selected_ids.removeByValue(this.value)
      });
      $('#student_assigned_id option:selected').remove();
      $("#student_selected_ids").val(student_selected_ids.join(" "));
      $('#student_assigned_div').children('div .lbjs').remove();
      $('select#student_assigned_id').listbox({'searchbar': true});
    });

    $('.add').on('click', function(){
      student_selected_ids = []
      var selectedOpts = $('#all_student_id option:selected').clone();
      selectedOpts.each(function(i){
        if($("#student_assigned_id option[value='"+this.value+"']").length <= 0){
          $('#student_assigned_id').append(this);
          student_selected_ids.push(this.value);
        }
      });
      $("#student_selected_ids").val($.merge($("#student_selected_ids").val().split(" "), student_selected_ids).join(" "));
      $('#student_assigned_div').children('div .lbjs').remove();
      $('select#student_assigned_id').listbox({'searchbar': true});
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