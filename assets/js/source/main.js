



window.DW = {

	// All pages
	global: {
		init: function() {
			//this.initEqualHeight();

			function fullscreen(){
				$('#home-hero.image-bg').css({
		            width: jQuery(window).width(),
		            height: jQuery(window).height()
		        });
		        $('#home-video').css({
		            width: jQuery(window).width(),
		            //height: jQuery(window).height()
		        });
			}
		  	
		  	if ($(window).width() > 768) {
				fullscreen();
			}

		    // Run the function in case of window resize
		    $(window).resize(function() {
		        if ($(window).width() >= 768){
		       		fullscreen(); 
		       	}       
		    });

		    //$("#content").fadeOut(4000);
		    $(".image-bg").addClass("zoom");
		    setTimeout(function(){
		    	$(".image-bg").removeClass("zoom");
		    },20000);
		    
		    $('.show-map').click(function(e){
		    	e.preventDefault();

		    	$('html, body').animate({
		            scrollTop: $('#main-map').offset().top - 106
		        }, 500, 'swing')
		    	
		    	/*
		    	if( $(this).hasClass('no-show') ) {
		    		$(".main-photo").show();
	            	$(".map").hide();
	            	$(this).toggleClass('no-show');
	            }
	            else {
		    		$(".main-photo").hide();
	            	$(".map").toggleClass('hidden-map');
	            	$(this).toggleClass('no-show');
	            }
	            */
	        });
	        

	        $('#category-choice').on('change', function() {
	        	var url = this.value;
			  	if (url != '') { 
		            window.location = url; // redirect
		        }
		        return false;
			})
		    


		},

		// Grid Overlay
		initEqualHeight: function() {

		},

	},

};

UTIL = {

	fire : function(func,funcname, args){

		var namespace = DW;

		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}

	},

	loadEvents : function($){

		var bodyId = document.body.id;

		// hit up common first.
		UTIL.fire('global');

		// do all the classes too.
		$.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});

	}
};

// kick it all off here
$(document).ready(UTIL.loadEvents);



