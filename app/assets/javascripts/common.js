// left side bar highlight on click of li
$(document).ready(function(){
	$('.page-sidebar li').on('click', function (e) {
		if($('.page-sidebar li').hasClass('active') ) 
		{
			$('.page-sidebar li').removeClass("active");
			$(this).addClass("active");
		}
	});
});	


