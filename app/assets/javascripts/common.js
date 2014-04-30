function showHideMenu(liclass)
{
    li=$("#"+liclass)
        
    if(li.hasClass("active"))
    {
        li.removeClass("active") 
        li.find("ul.children").slideUp('fast'); //hide sub-menu
        li.find("span.arrow:first").removeClass('active'); //remove open class to arrow
    }
    else
    {
       li.removeClass("active").addClass("active"); //add open class to li show li expanded
       li.find("ul.children").slideDown('fast'); //show sub-menu
       li.find("span.arrow:first").removeClass('active').addClass('active'); //add open class to arrow
    }
}

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

