$(document).on("click",".select-all-classroom",function(){
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


