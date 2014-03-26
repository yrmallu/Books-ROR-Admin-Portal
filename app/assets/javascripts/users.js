$(document).ready(function() {
	// enable/disable delete button whether any check-box is checked or not
	document.getElementById("delete_user").disabled=true; 
	$('.user-check-box').click(function () {
       if($("#users_table .user-check-box:checked").length > 0)
			document.getElementById("delete_user").disabled=false;
		else
			document.getElementById("delete_user").disabled=true;  
    });    
});


