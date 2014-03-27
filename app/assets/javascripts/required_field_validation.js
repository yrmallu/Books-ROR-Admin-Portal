var required_field;
required_field = function(){
	$(".form_validation").validate({
		rules: {
			id:{ required: true },
			"school[name]": { required: true },
			"school[phone]":{ number: true },
			"session[email]":{ required: true, email:true },
			"session[password]":{ required: true, minlength: 5 },
            email: {
				required:true,
				email:true
			 },
 			password: {
 				required: true,
 				minlength: 5
 			},
 			password_confirmation: {
 				required: true,
 				minlength: 5,
 				equalTo: "#password"
 			}
		},
		messages: {
			id:"Select User Type.",
			"school[name]": "School Name can't be blank.",
			"school[phone]": "Please enter only number.",
			"session[email]": "Enter a valid email address.",
			"session[password]": {
								required: "Please provide a password.",
								minlength: "Your password must be at least 5 characters long."
			                  },
			email: "Enter a valid email address.",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long."
			},
			password_confirmation: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long.",
				equalTo: "Please enter the same password as above."
			}
		}
		});
	}

jQuery(document).ready(required_field);
$(document).on('page:load', required_field);
