var required_field;
required_field = function(){
	$(".form_validation").validate({
		rules: {
			id:{ required: true },
			"school[name]": { required: true },
			"school[phone]":{ number: true },
			"user[email]":{ required: true, email:true },
			"user[password]":{ required: true, minlength: 5 },
			"user[password_confirmation]": {required: true,	minlength: 5, equalTo: "#password"},
		},
		messages: {
			id:"Select User Type.",
			"school[name]": "School Name can't be blank.",
			"school[phone]": "Please enter only number.",
			"user[email]": "Enter a valid email address.",
			"user[password]": {
								required: "Please provide a password.",
								minlength: "Your password must be at least 5 characters long."
			                 },
			"user[password_confirmation]":{
											required: "Please provide a password",
											minlength: "Your password must be at least 5 characters long.",
											equalTo: "Password confirmation doesn't match Password"
											}	                  
			
		}
		});
	}

jQuery(document).ready(required_field);
$(document).on('page:load', required_field);
