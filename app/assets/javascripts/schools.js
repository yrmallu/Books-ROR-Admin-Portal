

// $(document).on("click","#school_country",function(){
// 	select_wrapper = $('#school_state_wrapper')		
//     $('select', select_wrapper).attr('disabled', true);
//     country_code = $(this).val();
//     alert(country_code);
//     url = "/schools/subregion_options?parent_region=#{country_code}"
//     select_wrapper.load(url)
// });

$(function() {
  return $('select#school_country').change(function(event) {
    var country_code, select_wrapper, url;
    select_wrapper = $('#school_state_wrapper');
    $('select', select_wrapper).attr('disabled', true);
    country_code = $(this).val();
    url = "/schools/subregion_options?parent_region=" + country_code;
    return select_wrapper.load(url);
  });
});

function validateform()
{
    var flag = true;
    var ext = $('#file').val().split('.').pop().toLowerCase();
    if ($.inArray(ext,['xls', 'csv', 'xlsx']) == -1) {
      alert("Please upload xls or csv files only");
      flag = false;
    }

  return flag;
}

// Search on index page
$(document).ready(function () {
  $('#text_field_search').keypress(function(e){
    if(e.which == 13){//Enter key pressed
      $('#school_search').click();//Trigger search button click event
    }
  });

	$("#school_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());
		if (search_query.length > 0) {
			url = document.URL.split("?");
		   var new_url = url[0] + "?query_string=" + search_query;
		   $(location).attr('href', new_url);
		}
	});
});	 
// var school_name_uniqueness;
// school_name_uniqueness = function(){
//   jQuery(".school_name_unique").blur(function(){
//   school_name = jQuery("#"+this.id).val();
//   school_id = this.id;
//     jQuery("#"+this.id).parent().find(".help-inline").html("\t");
//     jQuery.get(school_unique,{ name : jQuery("#"+this.id).val() },
//     function(data) {
//       if(data=='avaiable')
//       {
// 	    jQuery("#"+school_id).parent().find(".help-inline").html("\t");
//       }
//       else
//       {
// 	    jQuery("#"+school_id).parent().find(".help-inline").html(data);
// 		return false;
//       }
//     });
//   return true;
// });
// }
// jQuery(document).ready(school_name_uniqueness);
// $(document).on('page:load', school_name_uniqueness);

