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
			checked_list.push($(this).val())
			unchecked_list = jQuery.removeFromArray($(this).val(), unchecked_list);
	    } else {
			 unchecked_list.push($(this).val())
			 checked_list = jQuery.removeFromArray($(this).val(), checked_list);
	    }
	});
	
	jQuery.removeFromArray = function(value, arr) {
	    return jQuery.grep(arr, function(elem, index) {
	        return elem !== value;
	    });
	};
});

