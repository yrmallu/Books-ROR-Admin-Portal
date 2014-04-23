$(document).ready(function () {
 //    $('.school-check-box').change(function () {
 //        var check = ($('.school-check-box').filter(":checked").length == $('.school-check-box').length);
 //        $('.select-all-school').prop("checked", check);
 //    });
	// // enable/disable delete button whether select-all check-box is checked or not
 //    $('.select-all-school').click(function () {
 //        if($("#school_table .school-check-box:checked").length > 0)
	// 		document.getElementById("delete_school").disabled=true;
	// 	else
	// 		document.getElementById("delete_school").disabled=false;  
 //    });
	// // enable/disable delete button whether any check-box is checked or not
 //    $('.school-check-box').click(function () {
 //       if($("#school_table .school-check-box:checked").length > 0)
	// 		document.getElementById("delete_school").disabled=false;
	// 	else
	// 		document.getElementById("delete_school").disabled=true;  
 //    }); 
    $("input[type='checkbox']").on('click',function(){
    checkIfAnySchools();
  });
});
	
function checkAllSchools(){
  // alert("above checkall code");
    $(".school-check-box").each(function(){$(this).prop("checked", true);});
    // alert("below checkall code");
    $(".lnk-typ1").css("color","#908a8a");
    $(".lnk-typ2").css("color","#0d71b4");
    checkIfAnySchools();
}

function uncheckAllSchools(){
    $(".school-check-box").each(function(){$(this).removeAttr("checked");});
    $(".lnk-typ1").css("color","#0d71b4");
    $(".lnk-typ2").css("color","#908a8a");
    checkIfAnySchools();
}

function checkIfAnySchools(){
  // alert("hiiii");
  // alert($("input[id='school_ids_']:checked").length);
  if ($("input[id='school_ids_']:checked").length > 0){
    
      $("#delete_school").removeAttr('disabled');
      // alert("hiiii");
      // $("#send_request").removeAttr('disabled');
  }else{
    // alert("hiiii");
    $("#delete_school").attr('disabled', 'true'); 
    // $("#send_request").attr('disabled', 'true');
  }
}
// select-all check-box functionality
// $(document).on("click",".select-all-school",function(){
// 	$('.school-check-box').prop('checked', $(this).is(':checked'));
// });

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

