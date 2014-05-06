$.validator.addMethod("parent_email_valid",$.validator.methods.email,"Please enter a valid email."),$.validator.addClassRules("class_parent_email",{parent_email_valid:!0});var required_field;required_field=function(){$(".form_validation").validate({rules:{id:{required:!0},"school[name]":{required:!0},"school[phone]":{number:!0},"session[email]":{required:!0,email:!0},"session[password]":{required:!0,minlength:5},"license[expiry_date]":{required:!0},"user[username]":{required:!0},"license[no_of_licenses]":{required:!0,number:!0,min:1},"user[school_id]":{required:!0},"user[first_name]":{required:!0},"user[password]":{minlength:5,required:!0},"user[password_confirmation]":{minlength:5,required:!0,equalTo:"#user_password"},"license[license_batch_name]":{required:!0},"classroom[name]":{required:!0},"user[parent_email]":{email:!0},email:{required:!0,email:!0},password:{required:!0,minlength:5},password_confirmation:{required:!0,minlength:5,equalTo:"#password"},"user[phone_number]":{number:!0}},messages:{id:"Select User Type.","school[name]":"School Name can't be blank.","school[phone]":"Please enter only number.","session[email]":"Enter a valid email address.","license[license_batch_name]":"Please enter license batch name.","classroom[name]":"Classroom Name can't be blank.","user[parent_email]":"Enter a valid email address.","user[username]":"Username can't be blank.","session[password]":{required:"Please provide a password.",minlength:"Your password must be at least 5 characters long."},email:"Enter a valid email address.",password:{required:"Please provide a password",minlength:"Your password must be at least 5 characters long."},password_confirmation:{required:"Please provide a password",minlength:"Your password must be at least 5 characters long.",equalTo:"Please enter the same password as above."},"user[phone_number]":"Please enter only number.","license[expiry_date]":"Please enter license expiration date.","license[no_of_licenses]":"Please enter number greater than zero.","user[school_id]":"Select School.","user[first_name]":"First Name can't be blank.","user[password]":{required:"Please provide a password",minlength:"Your password must be at least 5 characters long."},"user[password_confirmation]":{required:"Please provide a password",minlength:"Your password must be at least 5 characters long.",equalTo:"Please enter the same password as above."}}})},jQuery(document).ready(required_field),$(document).on("page:load",required_field);