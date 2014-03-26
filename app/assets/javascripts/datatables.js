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
	   "aoColumnDefs": [
	               { "bSortable": false, "aTargets": [5] },
				   { "bSortable": false, "aTargets": [0] }]
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
 	               { "bSortable": false, "aTargets": [10] },
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
  
  
  });

