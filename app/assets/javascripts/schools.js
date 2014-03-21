$(document).ready(function () {
    $('.school-check-box').change(function () {
        var check = ($('.school-check-box').filter(":checked").length == $('.school-check-box').length);
        $('.select-all-school').prop("checked", check);
    });
});

$(document).on("click",".select-all-school",function(){
	$('.school-check-box').prop('checked', $(this).is(':checked'));
});

$(document).ready(function() {
	checked_list = [];
	unchecked_list = [];
	$('.school-check-box').click(function() {
		
	    if ($(this).is(':checked')) {
	        //$(this).prop('checked',false);
			checked_list.push($(this).val())
			unchecked_list = jQuery.removeFromArray($(this).val(), unchecked_list);
			         alert(checked_list);
			 alert(unchecked_list);
	    } else {
	         //$(this).prop('checked',true);
			 unchecked_list.push($(this).val())
			 checked_list = jQuery.removeFromArray($(this).val(), checked_list);
			 alert(checked_list);
			 alert(unchecked_list);
	    }
	     
		//$("#ffff").val(checked_list);
		//$("#unchecked_list_").val(unchecked_list);
	});
	
	jQuery.removeFromArray = function(value, arr) {
	    return jQuery.grep(arr, function(elem, index) {
	        return elem !== value;
	    });
	};
});

$(document).on("click",".delete-school-list",function(){
	//$("#delete_school_list").attr("href").concat($("#ffff"));
	//$( "#delete_school_list" ).contact( 'dgdg' );
	//alert('dg');
	// $.post( 
             // "/schools/delete_school",
             // { name: "Zara" },
             // function(data) {
                // $('#delete_school_list').html(data);
             // }
// 
          // );
});
