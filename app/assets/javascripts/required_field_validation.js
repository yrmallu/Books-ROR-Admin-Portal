var required_field;
required_field = function(){
	$(".form_validation").validate({
		rules: {
			"school[name]": {
				required: true
			},
			"school[phone]":{
				number: true
			}
		},
		messages: {
			"school[name]": "School Name can't be blank.",
			"school[phone]": "Please enter only number."
		}
		});
	}

jQuery(document).ready(required_field);
$(document).on('page:load', required_field);
