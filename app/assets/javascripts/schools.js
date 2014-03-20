$(document).ready(function () {
    $('.school-check-box').change(function () {
        var check = ($('.school-check-box').filter(":checked").length == $('.school-check-box').length);
        alert(check);
        alert($('.school-check-box').filter(":checked").length);
        alert($('.school-check-box').length);
        $('.select-all-school').prop("checked", check);
    });
});

$(document).on("click",".select-all-school",function(){
	$('.school-check-box').prop('checked', $(this).is(':checked'));
});

