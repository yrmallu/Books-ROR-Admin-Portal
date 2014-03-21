var required_field;
required_field = function(){
	$(".form_validation").validate({
		rules: {
			"school[name]": { required: true },
			"school[phone]":{ number: true },
			"user[email]":{ required: true, email:true },
			"user[password]":{ required: true, minlength: 5 }
		},
		messages: {
			"school[name]": "School Name can't be blank.",
			"school[phone]": "Please enter only number.",
			"user[email]": "Enter a valid email address.",
			"user[password]": {
								required: "Please provide a password.",
								minlength: "Your password must be at least 5 characters long."
			                  },
		}
		});
	}

jQuery(document).ready(required_field);
$(document).on('page:load', required_field);
