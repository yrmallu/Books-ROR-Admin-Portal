$(document).on("click",".select-all-classroom",function(){$("#classroom_school_year_end_date").change(function(){return $("#classroom_school_year_start_date").val()>=$("#classroom_school_year_end_date").val()?($("#id_end_msg").show(),!1):($("#id_end_msg").hide(),!0)}),$("#classroom_school_year_start_date").change(function(){return $("#classroom_school_year_start_date").val()>=$("#classroom_school_year_end_date").val()?($("#id_end_msg").show(),!1):($("#id_end_msg").hide(),!0)})});