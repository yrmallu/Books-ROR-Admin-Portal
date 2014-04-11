$(document).on("click",".user-check-box",function(){
	if($("#users_table .user-check-box:checked").length > 0)
		document.getElementById("delete_user").disabled=false;
	else
		document.getElementById("delete_user").disabled=true;  
});


jQuery(document).ready(function(){
  $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' }).val();
});

