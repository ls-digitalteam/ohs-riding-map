/*
 * jQuery for WP Equal Heights.
 */

jQuery( function( $ ) {

	$.fn.wpEqualHeights = function( options ) {

		var $this = this,
			settings = $.extend( options );

		/**
		 * Bind to load and resize events
		 * unless 'noBind' set to true
		 */
		if( settings.noBind !== true )
			$( window ).on( 'load resize', function() {
				$this.equalizeHeights( settings );
			});
		else
			$this.equalizeHeights( settings );
	}

	$.fn.equalizeHeights = function( settings ) {

		var $this = this;
		this.height( '' );

		/**
		 * Apply max height to elements grouped by row
		 * (or unique offset) if 'byRows' set to false,
		 * otherwise apply max height to all elements
		 */
		if( settings.byRows !== false ) {

			var offsetArray = [];

			this.each( function() {

				var newOffset = $( this ).position().top;
				jQuery.data( this, 'offset', newOffset );
				if( jQuery.inArray( newOffset, offsetArray ) === -1 ) {
					offsetArray.push( newOffset );
				}
			});

			jQuery.each( offsetArray, function( index, value ) {
				var elmts = $this.filter( function() {
								return $( this ).data( 'offset' ) === value;
							});
				applyMaxHeight( elmts );
			});
		}
		else {
			applyMaxHeight( $this );
		}

		/**
		 * Get max height for selected elements and apply
		 * to all (accounting for box-sizing)
		 */
		function applyMaxHeight( elmts ) {

			var elmtHeights = elmts.map( function() {
				var array = $( this ).css( 'box-sizing' ) !== 'border-box' ?
							$( this ).height() : $( this ).outerHeight();
								return array;
				}).get();

			var maxHeight = Math.max.apply( null, elmtHeights );
			elmts.css( 'height', maxHeight );
		}
	}

});

// Initialize Function
jQuery(document).ready(function($) {
	$( '.eq-height [class*="col-"]' ).wpEqualHeights({
		//byRows: false,
    	//noBind: true
	});
});