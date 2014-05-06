
var email_validation;
email_validation = function(){
  jQuery(".email_validation").blur(function(){
  emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
  emailAddress = jQuery("#"+this.id).val();
  valid = emailRegex.test(emailAddress);
  email_id = this.id;
  if (!valid) { } 
  else
  {
    jQuery("#"+this.id).parent().find(".help-inline").html("\t");
    jQuery.get(email_valid,{ email : jQuery("#"+this.id).val() },
    function(data) {
      if(data=='avaiable')
      {
	    jQuery("#"+email_id).parent().find(".help-inline").html("\t");
      }
      else
      {
	    jQuery("#"+email_id).parent().find(".help-inline").html(data);
		return false;
      }
    });
  return true;
  } 
});
}
jQuery(document).ready(email_validation);
$(document).on('page:load', email_validation);



var username_validation;
username_validation = function(){
  jQuery(".username_validation").blur(function(){
  username = jQuery("#"+this.id).val();
  username_id = this.id;
    jQuery("#"+this.id).parent().find(".help-inline").html("\t");
    jQuery.get(username_valid,{ username : jQuery("#"+this.id).val() },
    function(data) {
      if(data=='avaiable')
      {
	    jQuery("#"+username_id).parent().find(".help-inline").html("\t");
      }
      else
      {
	    jQuery("#"+username_id).parent().find(".help-inline").html(data);
		return false;
      }
    });
  return true;
});
}
jQuery(document).ready(username_validation);
$(document).on('page:load', username_validation);

