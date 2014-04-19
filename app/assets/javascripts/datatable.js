jQuery(document).ready(function() {

	jQuery('#users_table').dataTable({
		"bRetrieve": true,
		"bDestroy": true,
	    "bPaginate": false,
	    "bAutoWidth": false,
	    "bLengthChange": false,
	    "bInfo": false,
	    "bAutoWidth": false,
	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
	   // "aoColumnDefs": [
// 	               { "bSortable": false, "aTargets": [5] },
// 				   { "bSortable": false, "aTargets": [0] }]
	 });
  
 	jQuery('#school_table').dataTable({
 		"bRetrieve": true,
 		"bDestroy": true,
 	    "bPaginate": false,
 	    "bAutoWidth": false,
 	    "bLengthChange": false,
 	    "bInfo": false,
 	    "bAutoWidth": false,
 	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
 	   "aoColumnDefs": [
 	               { "bSortable": false, "aTargets": [7] },
				   { "bSortable": false, "aTargets": [0] }]
 	 });
	 
  	jQuery('#classroom_table').dataTable({
  		"bRetrieve": true,
  		"bDestroy": true,
  	    "bPaginate": false,
  	    "bAutoWidth": false,
  	    "bLengthChange": false,
  	    "bInfo": false,
  	    "bAutoWidth": false,
  	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
  	   "aoColumnDefs": [
  	               { "bSortable": false, "aTargets": [7] },
 				   { "bSortable": false, "aTargets": [0] }]
  	 });
	 
  	jQuery('#accessright_table').dataTable({
  		"bRetrieve": true,
  		"bDestroy": true,
  	    "bPaginate": false,
  	    "bAutoWidth": false,
  	    "bLengthChange": false,
  	    "bInfo": false,
  	    "bAutoWidth": false,
  	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
  	   "aoColumnDefs": [
  	               { "bSortable": false, "aTargets": [2] }]
  	 });
	 
   	jQuery('#licenses_table').dataTable({
   		"bRetrieve": true,
   		"bDestroy": true,
   	    "bPaginate": false,
   	    "bAutoWidth": false,
   	    "bLengthChange": false,
   	    "bInfo": false,
   	    "bAutoWidth": false,
   	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
   	   "aoColumnDefs": [
   	               { "bSortable": false, "aTargets": [4] }]
   	 });
	 
    jQuery('#license_detail_table').dataTable({
    	"bRetrieve": true,
    	"bDestroy": true,
        "bPaginate": false,
        "bAutoWidth": false,
        "bLengthChange": false,
        "bInfo": false,
        "bAutoWidth": false,
        "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
       "aoColumnDefs": []
     });
	 
  	
  	jQuery('#classroom_table').dataTable({
 		"bRetrieve": true,
 		"bDestroy": true,
 	    "bPaginate": false,
 	    "bAutoWidth": false,
 	    "bLengthChange": false,
 	    "bInfo": false,
 	    "bAutoWidth": false,
 	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
 	   "aoColumnDefs": [
 	               { "bSortable": false, "aTargets": [7] },
				   { "bSortable": false, "aTargets": [0] }]
 	 });
  	
  	jQuery('#book_table').dataTable({
 		"bRetrieve": true,
 		"bDestroy": true,
 	    "bPaginate": false,
 	    "bAutoWidth": false,
 	    "bLengthChange": false,
 	    "bInfo": false,
 	    "bAutoWidth": false,
 	    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",
 	   // "aoColumnDefs": [
 	               // { "bSortable": false, "aTargets": [3] },
				   // { "bSortable": false, "aTargets": [0] }]
 	 });
  
  });

