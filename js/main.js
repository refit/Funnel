// Gumby is ready to go
Gumby.ready(function() {
	console.log('Gumby is ready to go...', Gumby.debug());

	// placeholder polyfil
	if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}
});

// Oldie document loaded
Gumby.oldie(function() {

});

// Document ready

$(function() {

	// Get the window height
	var win_height = $(window).height();

	$(".image").imgLiquid({fill:true, fadeInTime:500});

	$('.home').css('height', win_height);

	// $(document).scroll(function(){

 //    	if($(this).scrollTop() > move_height){
 //    		$('#what').addClass("move");
 //    	}
 //    	else{
 //    		$('#what').removeClass("move");
    		
 //    	}
 //    });

});


