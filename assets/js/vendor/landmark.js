
function InitLandmarkListing()
{
	$('img.btnToggleLandmarkStatus').click(function(){
		/*TryLog('------------ ENTERING btnToggleLandmarkStatus ---------------');*/
		var itemid = $(this).attr('itemid');
		var curstatus = $(this).attr('status');
		ToggleItemStatus(itemid,'landmark',$(this));
		/*TryLog('------------ EXITING btnToggleLandmarkStatus ---------------');*/
	});
}

function InitLandmarkEdit(map_canvas_id, initLatitude,initLongitude)
{
	var inputLatitude = $('#inputLatitude');
	var inputLongitude = $('#inputLongitude');
	var inputTitle = $('#inputTitle');
	var inputImageFilename = $('#inputImageFilename');	
	function updateLatLongInputs()
	{
		/*TryLog(landmark.position);*/
		inputLatitude.val(landmark.position.lat());
		inputLongitude.val(landmark.position.lng());
	}
	
	var _initLatlng = new google.maps.LatLng(initLatitude, initLongitude);
	var myOptions = {
		zoom: 8,
		center: _initLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var _gmap = new google.maps.Map(document.getElementById(map_canvas_id), myOptions);
	
  var landmark = new google.maps.Marker({
      position: _gmap.center,
      map: _gmap,
      draggable:true,
      title:inputTitle.val()
  }); 
	google.maps.event.addListener(landmark,'position_changed',function(){updateLatLongInputs()} );
}

var landmark_marker = '/assets/img/map/landmark_marker.png';
var _landMarkers = [];
var _otherMarkers = [];

function landMarker (landmarkArray,gmap)
{
	this._title = landmarkArray[0];
	this._desc = landmarkArray[1];
	this._imgSrc = landmarkArray[2];
	this._position = landmarkArray[3];	
	this._mapMarker  = new google.maps.Marker({					
						map: gmap,position:this._position,flat:true,draggable:false,title:this._title,
						icon: new google.maps.MarkerImage(landmark_marker,new google.maps.Size(12,17),new google.maps.Point(0,0),new google.maps.Point(5,5))					  
				  });
	this._landmarkBlowUp = null;
	
	this.BlowUpShow = function () {
		
		/*TryLog('BlowUpShow(): ' + this._title);*/
		for (mdex = 0; mdex < _landMarkers.length; mdex++) {
			var mrk_check = _landMarkers[mdex];
			if(mrk_check != this)
			{	mrk_check.BlowUpHide();	}
			else{TryLog('skipping hide self');if(mrk_check._landmarkBlowUp != null){return;}}
		} 
		this._landmarkBlowUp = new LandmarkOverlay(this._position, gmap, this._title,this._desc,this._imgSrc);
		/*TryLog('BlowUpShow() EXIT');*/
	}
	
	this.BlowUpHide = function()
	{
		/*TryLog('BlowUpHide(): ' + this._title); */
		if(this._landmarkBlowUp == null){return;}
		this._landmarkBlowUp.removeThis();
		this._landmarkBlowUp = null;
	}
	var me = this;
	google.maps.event.addListener(this._mapMarker,'click',function(){ me.BlowUpShow(); } );
}

function otherMarker(landmarkArray,gmap) {
    this._title = landmarkArray[0];
    this._desc = landmarkArray[1];
    this._type = landmarkArray[2];
    this._icon = '/assets/img/map/' + landmarkArray[2].replace(new RegExp(' ', 'g'), '') + '.png';
    this._position = landmarkArray[3];  
    this._phone = landmarkArray[4];
    this._website = landmarkArray[5];
    this._mapMarker  = new google.maps.Marker({                 
                        map: gmap,position:this._position,flat:true,draggable:false,title:this._title,
                        icon: new google.maps.MarkerImage(this._icon,new google.maps.Size(20,20),new google.maps.Point(0,0),new google.maps.Point(5,5))                      
                  });
    this._landmarkBlowUp = null;
    
    this.BlowUpShow = function (){
        /*TryLog('BlowUpShow(): ' + this._title);*/
        for (mdex = 0; mdex < _otherMarkers.length; mdex++) {
            var mrk_check = _otherMarkers[mdex];
            if(mrk_check != this)
            {   mrk_check.BlowUpHide(); }
            else{TryLog('skipping hide self');if(mrk_check._landmarkBlowUp != null){return;}}
        } 
        this._landmarkBlowUp = new OtherOverlay(this._position, gmap, this._title,this._desc,this._type,this._icon,this._phone,this._website);
        /*TryLog('BlowUpShow() EXIT');*/
    }
    
    this.BlowUpHide = function()
    {
        /*TryLog('BlowUpHide(): ' + this._title); */
        if(this._landmarkBlowUp == null){return;}
        this._landmarkBlowUp.removeThis();
        this._landmarkBlowUp = null;
    }
    var me = this;
    google.maps.event.addListener(this._mapMarker,'click',function(){ me.BlowUpShow(); } );
}


function DisplayLandmarks(gmap,landmarkList)
{
	/*TryLog('DisplayLandmarks()');*/
	for(lmrk = 0; lmrk < landmarkList.length;lmrk++)
	{
		var landMrk = landmarkList[lmrk];
		_landMarkers.push(new landMarker(landMrk,gmap));
	}
/*	TryLog(_landMarkers);
	TryLog('DisplayLandmarks() EXIT');	*/
}

function DisplayOtherPins(gmap,otherlist) {
    for(other = 0; other < otherlist.length;other++){
        var otherMrk = otherlist[other];
        _otherMarkers.push(new otherMarker(otherMrk,gmap));
    }
}