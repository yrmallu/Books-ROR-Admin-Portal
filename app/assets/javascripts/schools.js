$(document).ready(function () {
	document.getElementById("delete_school").disabled=true; 
    $('.school-check-box').change(function () {
        var check = ($('.school-check-box').filter(":checked").length == $('.school-check-box').length);
        $('.select-all-school').prop("checked", check);
    });
	// enable/disable delete button whether select-all check-box is checked or not
    $('.select-all-school').click(function () {
        if($("#school_table .school-check-box:checked").length > 0)
			document.getElementById("delete_school").disabled=true;
		else
			document.getElementById("delete_school").disabled=false;  
    });
	// enable/disable delete button whether any check-box is checked or not
    $('.school-check-box').click(function () {
       if($("#school_table .school-check-box:checked").length > 0)
			document.getElementById("delete_school").disabled=false;
		else
			document.getElementById("delete_school").disabled=true;  
    }); 
});
	
// select-all check-box functionality
$(document).on("click",".select-all-school",function(){
	$('.school-check-box').prop('checked', $(this).is(':checked'));
});

$(document).on("click","#school_country",function(){
	select_wrapper = $('#school_state_wrapper')		
    $('select', select_wrapper).attr('disabled', true);
    country_code = $(this).val();
    url = "/schools/subregion_options?parent_region=#{country_code}"
    select_wrapper.load(url)
});
