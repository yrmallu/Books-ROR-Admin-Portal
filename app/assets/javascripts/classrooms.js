$(document).ready(function () {
    $('.classroom-check-box').change(function () {
        var check = ($('.classroom-check-box').filter(":checked").length == $('.classroom-check-box').length);
        $('.select-all-classroom').prop("checked", check);
    });
	// enable/disable delete button whether select-all check-box is checked or not
    $('.select-all-classroom').click(function () {
        if($("#classroom_table .classroom-check-box:checked").length > 0)
			document.getElementById("delete_classroom").disabled=true;
		else
			document.getElementById("delete_classroom").disabled=false;  
    });
	// enable/disable delete button whether any check-box is checked or not
    $('.classroom-check-box').click(function () {
       if($("#classroom_table .classroom-check-box:checked").length > 0)
			document.getElementById("delete_classroom").disabled=false;
		else
			document.getElementById("delete_classroom").disabled=true;  
    }); 
});
	
// select-all check-box functionality
$(document).on("click",".select-all-classroom",function(){
	$('.classroom-check-box').prop('checked', $(this).is(':checked'));
});
