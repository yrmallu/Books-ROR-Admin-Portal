

$(document).on("click","#school_country",function(){
	select_wrapper = $('#school_state_wrapper')		
    $('select', select_wrapper).attr('disabled', true);
    country_code = $(this).val();
    url = "/schools/subregion_options?parent_region=#{country_code}"
    select_wrapper.load(url)
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


var school_name_uniqueness;
school_name_uniqueness = function(){
  jQuery(".school_name_unique").blur(function(){
  school_name = jQuery("#"+this.id).val();
  school_id = this.id;
    jQuery("#"+this.id).parent().find(".help-inline").html("\t");
    jQuery.get(school_unique,{ name : jQuery("#"+this.id).val() },
    function(data) {
      if(data=='avaiable')
      {
	    jQuery("#"+school_id).parent().find(".help-inline").html("\t");
      }
      else
      {
	    jQuery("#"+school_id).parent().find(".help-inline").html(data);
		return false;
      }
    });
  return true;
});
}
jQuery(document).ready(school_name_uniqueness);
$(document).on('page:load', school_name_uniqueness);

