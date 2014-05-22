
jQuery(document).ready(function(){
	$('#datepicker').datepicker({ 
		dateFormat: 'yy-mm-dd',
	    minDate: 1
	}).val();
	$('.input-group-addon').click(function() {
		$("#datepicker").datepicker( "show" );
	});
	$("#user_phone_number").mask("(999) 999-9999");
	
	// Search on index page
	$("#user_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());
		if (search_query.length > 0) {
			var new_url
			var split_url = document.URL.split("?");
			var split_params = split_url[1].split("&");
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

    // All users search	
 	$("#all_user_search").on('click',function(){
 		var search_query_fn = jQuery.trim($('#text_field_search_by_fn').val());
		var search_query_ln = jQuery.trim($('#text_field_search_by_ln').val());
		var search_query_un = jQuery.trim($('#text_field_search_by_un').val());
		var search_query_email = jQuery.trim($('#text_field_search_by_email').val());
		var search_query_school = jQuery.trim($('#text_field_search_by_school').val());
		var search_query = [];
		if (search_query_fn.length > 0)
		{ search_query.push(search_query_fn); }
		else
		{ search_query.push(""); }
		
		if (search_query_ln.length > 0)
		{ search_query.push(search_query_ln); }
		else
		{ search_query.push(""); }
		
		if (search_query_un.length > 0)
		{ search_query.push(search_query_un); }
		else{ search_query.push(""); }
		
		if (search_query_email.length > 0)
		{ search_query.push(search_query_email); }
		else
		{ search_query.push(""); }
		
		if (search_query_school.length > 0)
		{ search_query.push(search_query_school); }
		else
		{ search_query.push(""); }
		
		if (search_query.length > 0) {
			url = document.URL.split("?");
	   	 	var new_url = url[0] + "?query_string=" + search_query;
	   	 	$(location).attr('href', new_url);
		}
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

// Disable arrows by default, enable when clicked on left or right lists
$(document).ready(function(){
$('.disable-add').bind('click', false);
$('.disable-add').removeClass("enable-arrors").addClass("diasble-arrors");
$('.disable-remove').removeClass("enable-arrors").addClass("diasble-arrors");
$('.disable-remove').bind('click', false);

$('.stud-disable-add').bind('click', false);
$('.stud-disable-add').removeClass("enable-arrors").addClass("diasble-arrors");
$('.stud-disable-remove').removeClass("enable-arrors").addClass("diasble-arrors");
$('.stud-disable-remove').bind('click', false);


$('.left-listbox').on('click','.lbjs-item',function(){
	$('.disable-remove').removeClass("diasble-arrors").addClass("enable-arrors");
	$('.left-listbox.disable-remove').unbind('click', false);
});

$('.right-listbox').on('click','.lbjs-item',function(){
	$('.disable-add').removeClass("diasble-arrors").addClass("enable-arrors");
	$('.right-listbox.disable-add').unbind('click', false);
});

$('.left-stud-listbox').on('click','.lbjs-item',function(){
	$('.stud-disable-remove').removeClass("diasble-arrors").addClass("enable-arrors");
	$('.left-stud-listbox.stud-disable-remove').unbind('click', false);
});

$('.right-stud-listbox').on('click','.lbjs-item',function(){
	$('.stud-disable-add').removeClass("diasble-arrors").addClass("enable-arrors");
	$('.right-stud-listbox.stud-disable-remove').unbind('click', false);
});


});
 

