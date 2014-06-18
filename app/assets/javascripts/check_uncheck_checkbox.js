$(document).ready(function () {

  $("input[type='checkbox']").on('click',function(){
    chkBoxType = this.id.split("_")[0];
    checkIfAny(chkBoxType);
  });

});
  
function checkAll(chkBoxType){
    $("." + chkBoxType + "-check-box").each(function(){$(this).prop("checked", true);});
    $(".lnk-typ1").css("color","#908a8a");
    $(".lnk-typ2").css("color","#0d71b4");
    checkIfAny(chkBoxType);
}

function uncheckAll(chkBoxType){
    $("." + chkBoxType + "-check-box").each(function(){$(this).removeAttr("checked");});
    $(".lnk-typ1").css("color","#0d71b4");
    $(".lnk-typ2").css("color","#908a8a");
    checkIfAny(chkBoxType);
}

function checkIfAny(chkBoxType){
  if (chkBoxType == 'user')
  {
     var arr_user_ids = [];
     $("input[id='"+ chkBoxType + "_ids_']:checked").each(
       function(){ arr_user_ids.push($(this).val() )
     });
     //alert($(".bulk-add-update-license").attr("href").concat("&user_ids="+arr_user_ids));
     $(".bulk-remove-license").attr("href", $(".bulk-remove-license").attr("href").concat("&user_ids="+arr_user_ids))
     $('#selected_user_ids_').val(arr_user_ids); 
     $(".delete-user-list").attr("href", $(".delete-user-list").attr("href").concat("&user_ids="+arr_user_ids))
  }
  if (chkBoxType == 'web')
  {
     var arr_user_ids = [];
     $("input[id='"+ chkBoxType + "_ids_']:checked").each(
       function(){ arr_user_ids.push($(this).val() )
     });
     $(".delete-user-list").attr("href", $(".delete-user-list").attr("href").concat("&user_ids="+arr_user_ids))
  }

  if (chkBoxType == 'school')
  {
     var arr_school_ids = [];
     $("input[id='"+ chkBoxType + "_ids_']:checked").each(
       function(){ arr_school_ids.push($(this).val() )
     });
     $(".delete-school-list").attr("href", $(".delete-school-list").attr("href").concat("&school_ids="+arr_school_ids))      
  }

  if (chkBoxType == 'classroom')
  {
     var arr_class_ids = [];
     $("input[id='"+ chkBoxType + "_ids_']:checked").each(
       function(){ arr_class_ids.push($(this).val() )
     });
     $(".delete-classroom-list").attr("href", $(".delete-classroom-list").attr("href").concat("&classroom_ids="+arr_class_ids))      
  }

  if (chkBoxType == 'book')
  {
     var arr_book_ids = [];
     $("input[id='"+ chkBoxType + "_ids_']:checked").each(
       function(){ arr_book_ids.push($(this).val() )
     });
     $(".delete-book-list").attr("href", $(".delete-book-list").attr("href").concat("&book_ids="+arr_book_ids))      
  }
    
  if ($("input[id='"+ chkBoxType + "_ids_']:checked").length > 0){
      $("#delete_"+ chkBoxType).removeAttr('disabled');
      $(".bulk-remove-license").removeAttr('disabled');
      $(".bulk-add-update-license").removeAttr('disabled');
      $(".delete-user-list").removeAttr('disabled');
      $(".delete-school-list").removeAttr('disabled');
      $(".delete-classroom-list").removeAttr('disabled');
      $(".delete-book-list").removeAttr('disabled');
      $(".lnk-typ2").css("color","#0d71b4");
  }else{
    $("#delete_"+ chkBoxType).attr('disabled', 'true'); 
    $(".bulk-remove-license").attr('disabled', 'true'); 
    $(".bulk-add-update-license").attr('disabled', 'true'); 
    $(".delete-user-list").attr('disabled', 'true'); 
    $(".delete-school-list").attr('disabled', 'true'); 
    $(".delete-classroom-list").attr('disabled', 'true'); 
    $(".delete-book-list").attr('disabled', 'true');
  }
}