function RideDetailsOverlay(origin, map, did, heading,description,mvr_parent) {

  // Now initialize all properties.
  this._mvr = typeof(mvr_parent) == 'undefined' ? null : mvr_parent;
  this._did = did;
  this._title = heading;
  this._desc = description;
  this._origin = origin;
  this._map = map;
  var self = this;
  this.removeThis = function(){/* TryLog('removeInfoBox');*/self.setMap(null);}

  this.startRide = function(){
		/*TryLog('startRide()');TryLog(self._mvr);*/
	  	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	  	if(width < 1040){
		  	document.getElementById('video_player').scrollIntoView();
	  	}
		if(self._mvr != null){
			if(self._mvr.loadRide())
			{
				self._mvr.start();
				self.removeThis();
			}
		}
  }
  			
	this.cancelEvent = function(e) {/* TryLog('cancelEvent');*/e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); }  
  this.div_ = null;
  
  RideDetailsOverlay.prototype.onRemove = function() {
		/*TryLog('RideDetailsOverlay.prototype.onRemove');*/
	  this.div_.parentNode.removeChild(this.div_);
	}
   
  RideDetailsOverlay.prototype.onAdd = function() {
		/*TryLog('Overlay onAdd()');*/
		 
		// Create the DIV and set some basic attributes.
		var div = document.createElement('DIV');
		div.style.cssText="z-index:300000000000;";
		div.style.border = "none";
		div.style.borderWidth = "0px";
		div.style.position = "absolute";
		div.className = 'rideInfoWindow riw_' + this._did;
		
		var div_top = document.createElement('DIV');
		div_top.className = 'top';
		div.appendChild(div_top);
		
		var div_content = document.createElement('DIV');
		div_content.className  = 'content';
		//Close Icon
		var closeBox = document.createElement('P');
		closeBox.appendChild(document.createTextNode('x'));
		closeBox.className  = 'btn btn_close'; 
		div_content.appendChild(closeBox);
		
		var p = document.createElement('H4');
		p.appendChild(document.createTextNode(this._title));
		div_content.appendChild(p);
		
		p = document.createElement('P');
		p.appendChild(document.createTextNode(this._desc));
		p.className = 'desc';
		div_content.appendChild(p);
		
		p = document.createElement('P');
		var b = document.createElement('B');
		b.appendChild(document.createTextNode('Skill Rating: '));
		p.appendChild(b);
		var rating_text;
		switch(this._did) {
			case '1': rating_text = 'Easy'; break;
			case '2': rating_text = 'Low'; break;
			case '3': rating_text = 'Medium'; break;
			case '4': rating_text = 'Hard'; break;
			case '5': rating_text = 'Difficult'; break;
			default: rating_text = 'Hard'; break;
		}
		p.appendChild(document.createTextNode(rating_text));
		div_content.appendChild(p);
		
		var startBox = document.createElement('P');
		startBox.appendChild(document.createTextNode('Start the Ride'));
		startBox.className  = 'btn';
		div_content.appendChild(startBox);
		//google.maps.event.addDomListener(p, 'click', cancelEvent);    
		
		div.appendChild(div_content);
		
		
		var div_bottom = document.createElement('DIV');
		div_bottom.className = 'bottom';
		div.appendChild(div_bottom);
		
		/*TryLog(div);  */
		
		  this.div_ = div;  
		  var panes = this.getPanes();
		  panes.floatPane.appendChild(div);
			
			
		google.maps.event.addDomListener(closeBox, 'click', this.removeThis);   
		google.maps.event.addDomListener(startBox, 'click', this.startRide);    
			/*TryLog('Overlay onAdd() - EXIT');*/
		}
		
	RideDetailsOverlay.prototype.draw = function() { 
	  var overlayProjection = this.getProjection(); 
	  var origin_pixel  = overlayProjection.fromLatLngToDivPixel(this._origin);  
	  var div = this.div_;
	  div.style.left = (origin_pixel.x - 130) + 'px';
	  div.style.top = (origin_pixel.y-140) + 'px'; 
	  var jDiv = $(div);  
	  TryLog('position - ' + jDiv.css('position'));
	}

  // Explicitly call setMap() on this overlay
  this.setMap(map);
}
RideDetailsOverlay.prototype = new google.maps.OverlayView();

/************************** LANDMARK CUSTOM OVERLAY ***********************************/
function LandmarkOverlay(origin, map, heading,description,imgSrc) {

	// Now initialize all properties.
	this._title = heading;
	this._desc = description;
	this._imgSrc = imgSrc;
	this._origin = origin;
	this._map = map;

	var self = this;
	this.removeThis = function(){ /*TryLog('LandmarkOverlay - removeThis()');*/self.setMap(null);}  			
	this.cancelEvent = function(e) { /*TryLog('cancelEvent');*/e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); }  
	this.div_ = null;
  
	LandmarkOverlay.prototype.onRemove = function() {
		/*TryLog('LandmarkOverlay.prototype.onRemove');*/
		this.div_.parentNode.removeChild(this.div_);
	}
   
  LandmarkOverlay.prototype.onAdd = function() {
		/*TryLog('Overlay onAdd()');*/
		 
		// Create the DIV and set some basic attributes.
		var div = document.createElement('DIV');
		div.style.cssText="z-index:300000000000;";
		div.style.border = "none";
		div.style.borderWidth = "0px";
		div.style.position = "absolute";
		div.className = 'landmark_bubble';
		
		
		/************* CREATE TOP\CLOSE *****************/
		var div_top = document.createElement('DIV');
		div_top.className = 'bubble_top';		
		var div_close = document.createElement('DIV');
		div_close.className = 'bubble_close btn';
		div_close.appendChild(document.createTextNode('close x'));
		div_top.appendChild(div_close);
		div.appendChild(div_top);
		
		/************* CREATE CONTENT *****************/
		var div_content = document.createElement('DIV');
		div_content.className  = 'bubble_content';
		if(this._imgSrc.length > 0)
		{
			var img = document.createElement('img');
			img.className = 'bubble_image';
			img.setAttribute('alt',this._title);
			img.setAttribute('src',this._imgSrc);
			img.setAttribute('width','125');	
			div_content.appendChild(img);
		}
		var tag = document.createElement('H5');
		tag.appendChild(document.createTextNode(this._title));
		div_content.appendChild(tag);
		tag = document.createElement('p');
		tag.appendChild(document.createTextNode(this._desc));
		div_content.appendChild(tag);
		div.appendChild(div_content);
		
		/************* CREATE BOTTOM *****************/				
		var div_bottom = document.createElement('DIV');
		div_bottom.className = 'bubble_bottom';
		div.appendChild(div_bottom);
		
		/************** SAVE APPEND ******************/
		this.div_ = div;  
		var panes = this.getPanes();
		panes.floatPane.appendChild(div);			
			
		google.maps.event.addDomListener(div_close, 'click', this.removeThis); 
		/*	TryLog('Overlay onAdd() - EXIT');*/
		}
		
		
	LandmarkOverlay.prototype.draw = function() { 
	  var overlayProjection = this.getProjection(); 
	  var origin_pixel  = overlayProjection.fromLatLngToDivPixel(this._origin);  
	  var div = this.div_;
	  var jDiv = $(div);  
	  div.style.left = (origin_pixel.x - 180) + 'px';
	  div.style.top = (origin_pixel.y-jDiv.height()) + 'px'; 
	}

  // Explicitly call setMap() on this overlay
  this.setMap(map);
}
LandmarkOverlay.prototype = new google.maps.OverlayView();


/************************** OTHER CUSTOM OVERLAY ***********************************/
function OtherOverlay(origin, map, heading,description,type,icon,phone,website) {
    // Now initialize all properties.
    this._title = heading;
    this._desc = description;
    this._type = type;
    this._icon = icon;
    this._phone = phone;
    this._website = website;
    this._origin = origin;
    this._map = map;

    switch(this._type) {
        case 'Acute Care': this._did = '4'; break;
        case 'Red Cross': this._did = '5'; break;
        case 'Police': this._did = '2'; break;
        case 'Hospital': this._did = '2'; break;
        default: this._did = '4'; break;
    }

    var self = this;
    this.removeThis = function(){ /*TryLog('LandmarkOverlay - removeThis()');*/self.setMap(null);}              
    this.cancelEvent = function(e) { /*TryLog('cancelEvent');*/e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); }  
    this.div_ = null;
  
    OtherOverlay.prototype.onRemove = function() {
        /*TryLog('RideDetailsOverlay.prototype.onRemove');*/
        this.div_.parentNode.removeChild(this.div_);
    }
   
    OtherOverlay.prototype.onAdd = function() {
        /*TryLog('Overlay onAdd()');*/
         
        // Create the DIV and set some basic attributes.
        var div = document.createElement('DIV');
        div.style.cssText="z-index:300000000000;";
        div.style.border = "none";
        div.style.borderWidth = "0px";
        div.style.position = "absolute";
        div.className = 'rideInfoWindow riw_' + this._did;
        
        var div_top = document.createElement('DIV');
        div_top.className = 'top';
        div.appendChild(div_top);
        
        var div_content = document.createElement('DIV');
        div_content.className  = 'content';
        //Close Icon
        var closeBox = document.createElement('P');
        closeBox.appendChild(document.createTextNode('x'));
        closeBox.className  = 'btn btn_close'; 
        div_content.appendChild(closeBox);
        
        var p = document.createElement('H4');
        p.appendChild(document.createTextNode(this._title));
        div_content.appendChild(p);
        
        p = document.createElement('P');
        p.appendChild(document.createTextNode(this._desc));
        p.className = 'desc';
        div_content.appendChild(p);

        if (this._website) {
            var link = document.createElement('a');
            link.setAttribute('href', this._website);
            link.setAttribute('target', '_blank');
            link.appendChild(document.createTextNode(this._website));
            p = document.createElement('P');
            p.appendChild(link);
            div_content.appendChild(p);
        }

        if (this._phone){
            p = document.createElement('P');
            p.appendChild(document.createTextNode(this._phone));
            div_content.appendChild(p);
        }
        
        div.appendChild(div_content);
        
        var div_bottom = document.createElement('DIV');
        div_bottom.className = 'bottom';
        div.appendChild(div_bottom);
        
        this.div_ = div;  
        var panes = this.getPanes();
        panes.floatPane.appendChild(div);
        
        google.maps.event.addDomListener(closeBox, 'click', this.removeThis);
            /*TryLog('Overlay onAdd() - EXIT');*/
    }
        
    OtherOverlay.prototype.draw = function() { 
        var overlayProjection = this.getProjection(); 
        var origin_pixel  = overlayProjection.fromLatLngToDivPixel(this._origin);  
        var div = this.div_;
        div.style.left = (origin_pixel.x - 117) + 'px';
        div.style.top = (origin_pixel.y-145) + 'px'; 
        var jDiv = $(div);  
        TryLog('position - ' + jDiv.css('position'));
    }

    // Explicitly call setMap() on this overlay
    this.setMap(map);
}
OtherOverlay.prototype = new google.maps.OverlayView();