// Search on index page
$(document).ready(function () {
	 $("#license_search").on('click',function(){
 	 	var search_query = jQuery.trim($('#text_field_search').val());
 		if (search_query.length > 0) {
 			var new_url
 			var split_url = document.URL.split("?");
 			var split_params = split_url[1].split("&");
 			//alert(split_params[split_params.length -1]);
 			if (split_params[split_params.length -1].split("=")[0] == "query_string"){
 				split_params.pop();
 			}
 			if (split_url[1].split("&")[0].split("=")[0] == "page"){
 				split_params.shift();
 			    new_url = split_url[0] + "?" + split_params.join("&") + "&query_string=" + search_query;
				
 			}else if((split_params.length >=2) && (split_url[1].split("&")[1].split("=")[0] == "school_id")){
 				new_url = split_url[0]+ "?" + split_url[1].split("&")[0]+ "&" + split_url[1].split("&")[1] + "&query_string=" + search_query;
 			}else{
 				new_url = split_url[0]+ "?" + split_url[1].split("&")[0] + "&query_string=" + search_query;
 			}
		   $(location).attr('href', new_url);
 		}
	 	 
	 });
});	 

function license_table_sortable()
{
    jQuery('#licenses_table').dataTable({
     "bRetrieve": true,
     "bDestroy": true,
     "bPaginate": false,
     "bAutoWidth": false,
     "bLengthChange": false,
     "bInfo": false,
     "bAutoWidth": false,
     "sDom": 't',
     "aoColumnDefs": [
     { "bSortable": false, "aTargets": [4] }]
   });
}