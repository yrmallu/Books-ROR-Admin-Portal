// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function () {
    // $('.book-check-box').change(function () {
    //     var check = ($('.book-check-box').filter(":checked").length == $('.book-check-box').length);
    //     $('.select-all-book').prop("checked", check);
    // });

    $("input[type='checkbox']").on('click',function(){
		checkIfAnyBooks();
	});

	// enable/disable delete button whether select-all check-box is checked or not
  //   $('.select-all-book').click(function () {
  //       if($("#books_table .book-check-box:checked").length > 0){
		// 	// document.getElementById("delete_book").disabled=true;
		// 	// $('#delete_book').attr('disabled', true)
		// 	alert($("#books_table .book-check-box:checked").length);

		// }else{
		// 	// document.getElementById("delete_book").disabled=false;  
		// 	// $('#delete_book').removeAttr('disabled')
		// 	alert($("#books_table .book-check-box:checked").length);
		// }
		// 	// $('#delete_book').removeAttr('disabled')
  //   });
	// enable/disable delete button whether any check-box is checked or not
  //   $('.book-check-box').click(function () {
  //      if($("#books_table .book-check-box:checked").length > 0)
		// 	document.getElementById("delete_book").disabled=false;
		// else
		// 	document.getElementById("delete_book").disabled=true;  
  //   }); 
});
	
// select-all check-box functionality
// $(document).on("click",".select-all-book",function(){
// 	$('.book-check-box').prop('checked', $(this).is(':checked'));
// });

function checkAllBooks(){
	// alert("above checkall code");
    $(".book-check-box").each(function(){$(this).prop("checked", true);});
    // alert("below checkall code");
    $(".lnk-typ1").css("color","#908a8a");
    $(".lnk-typ2").css("color","#0d71b4");
    checkIfAnyBooks();
}

function uncheckAllBooks(){
    $(".book-check-box").each(function(){$(this).removeAttr("checked");});
    $(".lnk-typ1").css("color","#0d71b4");
    $(".lnk-typ2").css("color","#908a8a");
   	checkIfAnyBooks();
}

function checkIfAnyBooks(){
	// alert("hiiii");
	// alert($("input[id='book_ids_']:checked").length);
	if ($("input[id='book_ids_']:checked").length > 0){
		
    	$("#delete_book").removeAttr('disabled');
    	// alert("hiiii");
    	// $("#send_request").removeAttr('disabled');
	}else{
		// alert("hiiii");
		$("#delete_book").attr('disabled', 'true');	
		// $("#send_request").attr('disabled', 'true');
	}
}