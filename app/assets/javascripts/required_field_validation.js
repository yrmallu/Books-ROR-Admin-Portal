//$.validator.addMethod("contact_email_required", $.validator.methods.required, "Email can't be blank.");
$.validator.addMethod("parent_email_valid", $.validator.methods.email, "Please enter a valid email.");
$.validator.addClassRules("class_parent_email", {parent_email_valid:true});


var required_field;
required_field = function(){
	$(".form_validation").validate({
		rules: {
			id:{ required: true },
			"school[name]": { required: true },
			"school[phone]":{ number: true },
			"session[email]":{ required: true, email:true },
			"session[password]":{ required: true, minlength: 5 },
			"license[expiry_date]":{required: true} ,
			"user[username]":{required: true} ,
			"license[no_of_licenses]":{ required: true, number: true, min: 1 },
			"user[school_id]":{required: true} ,
			"user[first_name]":{required: true} ,
			"user[email]":{ email:true, required: true} ,
			"user[password]":{ minlength: 5, required: true} ,
			"user[password_confirmation]":{ minlength: 5, required: true, equalTo: "#user_password"} ,
			"license[license_batch_name]":{required: true} ,
			"classroom[name]":{required: true} ,
			"user[parent_email]":{email:true },
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
 			},
			"user[phone_number]":{ number: true }
		},
		messages: {
			id:"Select User Type.",
			"school[name]": "School Name can't be blank.",
			"school[phone]": "Please enter only number.",
			"session[email]": "Enter a valid email address.",
			"license[license_batch_name]":"Please enter license batch name.",
			"classroom[name]": "Classroom Name can't be blank.",
			"user[parent_email]":"Enter a valid email address.",
			"user[username]": "Username can't be blank.",
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
			},
			"user[phone_number]":"Please enter only number.",
			"license[expiry_date]":"Please enter license expiration date.",
			"license[no_of_licenses]":"Please enter number greater than zero.",
			"user[school_id]":"Select School.",
			"user[first_name]":"First Name can't be blank.",
			"user[email]":"Enter a valid email address.",
			"user[password]":{
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long."
			},
			"user[password_confirmation]": {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long.",
				equalTo: "Please enter the same password as above."
			}
		}
		});
	}

jQuery(document).ready(required_field);
$(document).on('page:load', required_field);
