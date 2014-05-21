jQuery(document).ready(function() {

  jQuery('#users_table').dataTable({
   "bRetrieve": true,
   "bDestroy": true,
   "bPaginate": false,
   "bAutoWidth": false,
   "bLengthChange": false,
   "bInfo": false,
   "bAutoWidth": false,
   "sDom": 't',
   "aoColumnDefs": [
   { "bSortable": false, "aTargets": [-1] },
   { "bSortable": false, "aTargets": [0] }
   ]
 });
 
  jQuery('#all_user_table').dataTable({
  "bRetrieve": true,
  "bDestroy": true,
  "bPaginate": false,
  "bAutoWidth": false,
  "bLengthChange": false,
  "bInfo": false,
  "bAutoWidth": false,
  "sDom": 't',
  "aoColumnDefs": [
 ]
 });
  
  jQuery('#school_table').dataTable({
   "bRetrieve": true,
   "bDestroy": true,
   "bPaginate": false,
   "bAutoWidth": false,
   "bLengthChange": false,
   "bInfo": false,
   "bAutoWidth": false,
   "bFilter": false,
   "sDom": 't',
   "aoColumnDefs": [
   { "bSortable": false, "aTargets": [-1] },
   { "bSortable": false, "aTargets": [0] }
   ]
 });
  
  jQuery('#classroom_table').dataTable({
    "bRetrieve": true,
    "bDestroy": true,
    "bPaginate": false,
    "bAutoWidth": false,
    "bLengthChange": false,
    "bInfo": false,
    "bAutoWidth": false,
    "sDom": 't',
    "aoColumnDefs": [
    { "bSortable": false, "aTargets": [-1] },
    { "bSortable": false, "aTargets": [0] }
    ]
  });
  
  jQuery('#accessright_table').dataTable({
    "bRetrieve": true,
    "bDestroy": true,
    "bPaginate": false,
    "bAutoWidth": false,
    "bLengthChange": false,
    "bInfo": false,
    "bAutoWidth": false,
    "sDom": 't',
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
   "sDom": 't',
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
   "sDom": 't',
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
   "sDom": 't',
   "aoColumnDefs": [
   { "bSortable": false, "aTargets": [-1] },
   { "bSortable": false, "aTargets": [0] }
   ]
 });
  
  jQuery('#book_table').dataTable({
   "bRetrieve": true,
   "bDestroy": true,
   "bPaginate": false,
   "bAutoWidth": false,
   "bLengthChange": false,
   "bInfo": false,
   "bAutoWidth": false,
   "sDom": 't',
 	    "aoColumnDefs": [
 	            { "bSortable": false, "aTargets": [-1] },
			   { "bSortable": false, "aTargets": [0] }]
        });
  
});

