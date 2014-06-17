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
  }
  if (chkBoxType == 'web')
  {
       var arr_user_ids = [];
     $("input[id='"+ chkBoxType + "_ids_']:checked").each(
       function(){ arr_user_ids.push($(this).val() )
     });
  }

    
  if ($("input[id='"+ chkBoxType + "_ids_']:checked").length > 0){
      $("#delete_"+ chkBoxType).removeAttr('disabled');
      $(".bulk-remove-license").removeAttr('disabled');
      $(".bulk-add-update-license").removeAttr('disabled');
      $(".lnk-typ2").css("color","#0d71b4");
  }else{
    $("#delete_"+ chkBoxType).attr('disabled', 'true'); 
    $(".bulk-remove-license").attr('disabled', 'true'); 
    $(".bulk-add-update-license").attr('disabled', 'true'); 
  }
}