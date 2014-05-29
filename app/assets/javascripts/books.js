// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function () {
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
// $( "#book_interest_level_to" ).change(function() {	
//   if ($('#book_interest_level_from').val() >= $('#book_interest_level_to').val() )
//   {
// 	show_message();
// 	return false;
//   }
//   else
//   {
// 	hide_message();  
// 	return true;
//   }
// });
// $( "#book_interest_level_from" ).change(function() {
//   if($('#book_interest_level_to').val() != '')	
//   {
//   	if ($('#book_interest_level_from').val() >= $('#book_interest_level_to').val() )
//     {
// 	  show_message();  
// 	  return false;
//     }
//     else
//     {
// 	  hide_message();
// 	  return true;
//     }
//   }
// });

$( ".book_form" ).submit(function( event ) {
	  if ($('#book_interest_level_from').val() >= $('#book_interest_level_to').val() )
	  {
		show_message();
		event.preventDefault();
		return false;
	  }
	  else
	  {
		hide_message();
		return true;
	  }
});
$( ".edit_book" ).submit(function( event ) {
	  if ($('#book_interest_level_from').val() >= $('#book_interest_level_to').val() )
	  {
		show_message();
		event.preventDefault();
		return false;
	  }
	  else
	  {
		hide_message();  
		return true;
	  }
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

