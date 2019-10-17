document.addEventListener('DOMContentLoaded', function(){

    new WOW().init();

    let page = $('html, body');
    $('a[href*="#"]').click(function() {
        page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
        return false;
    });
    
	$("form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", 
			data: th.serialize()
		}).done(function() {
			alert("Спасибо за заявку, я перезвоню в ближайшее время");
			setTimeout(function() {
			
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
