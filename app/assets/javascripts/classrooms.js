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

$( ".classroom_form" ).submit(function( event ) {
	  if ($('#classroom_school_year_start_date').val() >= $('#classroom_school_year_end_date').val() )
	  {
		$('#id_end_msg').show();
		event.preventDefault();
		return false;
	  }
	  else
	  {
		$('#id_end_msg').hide();
		return true;
	  }
});

});



$(document).ready(function () {
  	$("#classroom_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());
		if (search_query.length > 0) {
			var new_url
			var split_url = document.URL.split("?");
			var split_params = split_url[1].split("&");
			//alert(split_params[split_params.length -1]);
			if (split_params[split_params.length -1].split("=")[0] == "query_string"){
				split_params.pop();
			}
			if (split_url[1].split("&")[0].split("=")[0] == "page"){
				split_params.shift();
			    new_url = split_url[0] + "?" + split_params.join("&") + "&query_string=" + search_query;
				
			}else if((split_params.length >=2) && (split_url[1].split("&")[1].split("=")[0] == "school_id")){
				new_url = split_url[0]+ "?" + split_url[1].split("&")[0]+ "&" + split_url[1].split("&")[1] + "&query_string=" + search_query;
			}else{
				new_url = split_url[0]+ "?" + split_url[1].split("&")[0] + "&query_string=" + search_query;
			}
		   $(location).attr('href', new_url);
		}
	});
});


// // Assign student to a classroom, multi select
//     $(function () {
//       $('select#student_assigned_id').listbox({'searchbar': true});
//       $('select#all_student_id').listbox({'searchbar': true});
//     });
//   $(document).ready(function() {

//     $('.remove_stud').click(function(e) {
//       student_selected_ids = $("#student_selected_ids").val().split(" ");
//       $('#student_assigned_id option:selected').each(function(){
//         student_selected_ids.removeByValue(this.value)
//       });
//       $('#student_assigned_id option:selected').remove();
//       $("#student_selected_ids").val(student_selected_ids.join(" "));
//       $('#student_assigned_div').children('div .lbjs').remove();
//       $('select#student_assigned_id').listbox({'searchbar': true});
//     });

//     $('.add_stud').on('click', function(){
//       student_selected_ids = []
//       var selectedOpts = $('#all_student_id option:selected').clone();
//       selectedOpts.each(function(i){
//         if($("#student_assigned_id option[value='"+this.value+"']").length <= 0){
//           $('#student_assigned_id').append(this);
//           student_selected_ids.push(this.value);
//         }
//       });
//       $("#student_selected_ids").val($.merge($("#student_selected_ids").val().split(" "), student_selected_ids).join(" "));
//       $('#student_assigned_div').children('div .lbjs').remove();
//       $('select#student_assigned_id').listbox({'searchbar': true});
//     });
//   });

//   Array.prototype.removeByValue = function(val) {
//     for(var i=0; i<this.length; i++) {
//         if(this[i] == val) {
//             this.splice(i, 1);
//             break;
//         }
//     }
// }   


