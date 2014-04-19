$(document).ready(function () {
    $('.check-box').change(function () {
        var check = ($('.check-box').filter(":checked").length == $('.check-box').length);
        $('.select-all').prop("checked", check);
    });
	// enable/disable delete button whether select-all check-box is checked or not
    $('.select-all').click(function () {
        if($(".class_common_table .check-box:checked").length > 0)
			document.getElementById("delete_element").disabled=true;
		else
			document.getElementById("delete_element").disabled=false;  
    });
	// enable/disable delete button whether any check-box is checked or not
    $('.check-box').click(function () {
       if($(".class_common_table .check-box:checked").length > 0)
			document.getElementById("delete_element").disabled=false;
		else
			document.getElementById("delete_element").disabled=true;  
    }); 
});
	
// select-all check-box functionality
$(document).on("click",".select-all",function(){
	$('.check-box').prop('checked', $(this).is(':checked'));
});
