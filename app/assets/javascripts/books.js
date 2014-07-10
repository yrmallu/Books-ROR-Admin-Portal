// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function () {
  $('#text_field_search').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      $('#book_search').click();//Trigger search button click event
    }
  });
	
  $("#book_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());
		if (search_query.length > 0) {
			url = document.URL.split("?");
		   var new_url = url[0] + "?query_string=" + search_query;
		   $(location).attr('href', new_url);
		}
	 });
});

$(document).ready(function () {
$( "#book_interest_level_to" ).change(function() {	
  check_val();
});
$( "#book_interest_level_from" ).change(function() {
  if(parseInt($('#book_interest_level_to').val()) != '')	
  {
  	check_val();
  }
});

$( ".book_form" ).submit(function( event ) {
  check_val();
});

});

function show_message()
{
	$('#id_end_msg').removeClass('hide').addClass('show');
}

function hide_message()
{
	$('#id_end_msg').removeClass('show').addClass('hide');
}

function check_val()
{
  if (parseInt($('#book_interest_level_from').val()) >= parseInt($('#book_interest_level_to').val()) )
  {
  	show_message();
  	return false;
  }
  else
  {
  	hide_message();  
  	return true;
  }
}