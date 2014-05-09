jQuery(document).ready(function(){
// checking school year validation
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

// $( ".form_validation" ).submit(function( e ) {
// 	$( "#classroom_school_year_end_date" ).change(function() {
// 	  if ($('#classroom_school_year_start_date').val() >= $('#classroom_school_year_end_date').val() )
// 	  {
// 		$('#id_end_msg').show();
// 		return false;
// 		e.preventDefault();
// 	  }
// 	  else
// 	  {
// 		$('#id_end_msg').hide();
// 		return true;
// 	  }
// 	});
// 	$( "#classroom_school_year_start_date" ).change(function() {
// 	  if ($('#classroom_school_year_start_date').val() >= $('#classroom_school_year_end_date').val() )
// 	  {
// 		$('#id_end_msg').show();
// 		return false;
// 		e.preventDefault();
// 	  }
// 	  else
// 	  {
// 		$('#id_end_msg').hide();
// 		return true;
// 	  }
// 	});
// 	
//   if ($('#classroom_school_year_start_date').val() >= $('#classroom_school_year_end_date').val() )
//   {
// 	$('#id_end_msg').show();
// 	return false;
// 	e.preventDefault();
//   }
//   else
//   {
// 	$('#id_end_msg').hide();
// 	return true;
//   }
// });

});




// Assign student to a classroom, multi select
    $(function () {
      $('select#student_assigned_id').listbox({'searchbar': true});
      $('select#all_student_id').listbox({'searchbar': true});
    });
  $(document).ready(function() {

    $('.remove_stud').click(function(e) {
      student_selected_ids = $("#student_selected_ids").val().split(" ");
      $('#student_assigned_id option:selected').each(function(){
        student_selected_ids.removeByValue(this.value)
      });
      $('#student_assigned_id option:selected').remove();
      $("#student_selected_ids").val(student_selected_ids.join(" "));
      $('#student_assigned_div').children('div .lbjs').remove();
      $('select#student_assigned_id').listbox({'searchbar': true});
    });

    $('.add_stud').on('click', function(){
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


