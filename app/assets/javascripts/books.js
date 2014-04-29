// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function () {
	 $("#school_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());

		if (search_query.length > 0) {
			url = document.URL.split("?");
		   var new_url = url[0] + "?query_string=" + search_query;
		   $(location).attr('href', new_url);
		}
	 	 
	 });

  	$("#user_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());
		if (search_query.length > 0) {
			var new_url
			var split_url = document.URL.split("?");
			var split_params = split_url[1].split("&");
			// alert(split_params[split_params.length -1]);
			if (split_params[split_params.length -1].split("=")[0] == "query_string"){
				split_params.pop();
			}

			if (split_url[1].split("&")[0].split("=")[0] == "page"){
				// split_params = split_url[1].split("&");
				split_params.shift();
			    new_url = split_url[0] + "?" + split_params.join("&") + "&query_string=" + search_query;
				
			}else{
				new_url = document.URL + "&query_string=" + search_query;
			}
			// alert(split_params[split_params.length]);
		   // var new_url = split_url[0] + split_params.join("&") + "&query_string=" + search_query;
		   // alert("hiii");
					   // var new_url = url[0] + "?query_string=" + search_query;
		   $(location).attr('href', new_url);
		}
	});

  	$("#classroom_search").on('click',function(){
	 	var search_query = jQuery.trim($('#text_field_search').val());
		if (search_query.length > 0) {
			var new_url
			var split_url = document.URL.split("?");
			var split_params = split_url[1].split("&");
			alert(split_params[split_params.length -1]);
			if (split_params[split_params.length -1].split("=")[0] == "query_string"){
				split_params.pop();
			}
			if (split_url[1].split("&")[0].split("=")[0] == "page"){
				split_params.shift();
			    new_url = split_url[0] + "?" + split_params.join("&") + "&query_string=" + search_query;
				
			}else{
				new_url = document.URL + "&query_string=" + search_query;
			}
		   $(location).attr('href', new_url);
		}
	});

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

