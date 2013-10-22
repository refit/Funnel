$(function(){
	$('a[href^="#"]').click(function(){
		var hash = $(this).attr('href');
	    $('html, body').animate({
	        scrollTop: $($(this).attr('href')).offset().top
	    }, 500, 'easeInOutQuad', function() {
		    window.location.hash = hash;
	    });
	    return false;
	});
});