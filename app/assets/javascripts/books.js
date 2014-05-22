// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function () {
	 $("#book_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());

		if (search_query.length > 0) {
			url = document.URL.split("?");
		   var new_url = url[0] + "?query_string=" + search_query;
		   $(location).attr('href', new_url);
		}
	 	 
	 });

	// $('#text_field_search').on('keypress', function(event) {
 //        if (event.keyCode == 13) {
 //            split_url = document.URL.split("?");
 //            alert(split_url[1].split("&")[split_url[1].split("&").length -1].split("=")[0]);
 //            if (split_url.length > 1 && split_url[1].split("&")[split_url[1].split("&").length -1].split("=")[0] == "query_string"){
 //            	alert("has params");
 //            }else{
 //            	alert("no params");
 //            } 
 //        }
 //    });


});

