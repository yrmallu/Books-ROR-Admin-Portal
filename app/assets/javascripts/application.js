// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require turbolinks
//= require_tree .


var minus_link;

minus_link = function()  {
	
	$(".remove_fields").click(function(e){
		e.preventDefault(); 
    	return false;
	}).css("visibility", "hidden");
}

$(document).ready(minus_link);
$(document).on('page:load', minus_link);
