$('#sidebar').affix({
    offset: {
        top: $('#sidebar').offset().top
    }
});

function affixWidth() {
    // ensure the affix element maintains it width
    var affix = $('#sidebar');
    var width = affix.width();
    affix.width(width);
}

$(document).ready(function () {

    affixWidth();

});

jQuery(function($) {
	var open = false;
	$('#footerSlideButton').click(function() {
		if(open === false) {
			$('#footerSlideContent').animate({ height: '30%' });
			open = true;
		} else {
			$('#footerSlideContent').animate({ height: '0px' });
			open = false;
		}
	});
});
