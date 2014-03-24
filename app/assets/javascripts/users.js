$(document).ready(function() {
	checked_list = [];
	unchecked_list = [];
	$('.user-check-box').click(function() {
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

