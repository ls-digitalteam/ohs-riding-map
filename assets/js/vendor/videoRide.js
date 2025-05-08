/*------------------- RIDE VIDEO ADMINISTRATION FUNCTIONS --------------------------*/
function InitVideoListing()
{
	$('img.btnToggleVideoStatus').click(function(){
		var itemid = $(this).attr('itemid');
		var curstatus = $(this).attr('status');
		ToggleItemStatus(itemid,'roadvideo',$(this));
	});
}
var _tracker_icons = ['../assets/img/map/tracker_helmet.png','../assets/img/map/tracker_helmet.png','../assets/img/map/tracker_helmet.png','../assets/img/map/tracker_helmet.png','../assets/img/map/tracker_helmet.png','../assets/img/map/tracker_helmet.png'];
// 	green, blue, red, orange, yellow
//var _route_colors = ['#39b54a','#65bdcd','#ea3118','#f59725','#edcd15'];

// new = green, blue, yellow, orange, red
var _route_colors = ['#449537', '#346bc0', '#f5d24a', '#f09a3c', '#e9402a'];
var _start_icons = ['/ohs-riding-map/assets/img/map/level_marker_1.png','/ohs-riding-map/assets/img/map/level_marker_2.png','/ohs-riding-map/assets/img/map/level_marker_5.png','/ohs-riding-map/assets/img/map/level_marker_4.png','/ohs-riding-map/assets/img/map/level_marker_3.png'];
//var _start_icons = ['/assets/img/map/level_marker_1.png','/assets/img/map/level_marker_2.png','/assets/img/map/level_marker_3.png','/assets/img/map/level_marker_4.png','/assets/img/map/level_marker_5.png'];
function mappedVideoRide(mapObj, leg_times, diffid, trackid, playerId, autoPlay, markLabel,route_title)
{ 
	route_title = typeof(route_title) == 'undefined' ? '' : route_title;
	/*TryLog('================== mappedVideoRide - Constructor');*/ 
	var mvr = new Object();
	mvr.title = '';
	mvr.description = '';
	mvr.videoUrl = '';
	/*mvr.start_icons = ['/_images/icons/level_marker_1.png','/_images/icons/level_marker_2.png','/_images/icons/level_marker_3.png','/_images/icons/level_marker_4.png','/_images/icons/level_marker_5.png'];
	mvr.route_colors = ['#39b54a','#65bdcd','#ea3118','#f59725','#edcd15'];
	mvr.tracker_icons = ['/_images/icons/tracker_0.gif','/_images/icons/tracker_1.gif','/_images/icons/tracker_2.gif','/_images/icons/tracker_3.gif','/_images/icons/tracker_4.gif','/_images/icons/tracker_5.gif'];*/
	mvr._trackerId = trackid;
	mvr._routeDifficultyId = diffid; 
	mvr._player_id = playerId;
	try{mvr._videoPlayer = _V_(playerId);}catch(e){mvr._videoPlayer = null;}
	mvr._map = mapObj;
	mvr._map_directionsService = null;
	mvr._map_directionsDisplay = null;
	mvr._map_route_overview = null;
	mvr._map_route_legs = null;
	mvr._map_hasPath = false;
	mvr._video_fulltime = 0;
	mvr._videoLocation_IsUpdating = false;
	mvr._videoLocation_LastUpdate = 0;
	mvr._videoLocation_UpdateLag = 2;
	mvr._video_LegTimes = leg_times;
	mvr._isTracking = false;
	mvr._startMarker = null;
	mvr._rideMarker = null;
	mvr._rideMarkerLabel = markLabel;
	mvr._startOverlay = null;
	mvr._scheduleAutoPlay = false;
	
	mvr.blowUpStartMarker = function()
	{
		/*TryLog('=================== Blowing Up Marker() ');*/		
		for (r = 0; r < VideoRider.PublicRider._ridesList.length; r++) {
			var mvr_check = VideoRider.PublicRider._ridesList[r][9];
			/*TryLog('Checking other MVRs');
			TryLog(mvr_check);*/
			if(mvr_check._startOverlay != null)
			{	mvr_check._startOverlay.removeThis();	}
		} 
		mvr._startOverlay = new RideDetailsOverlay(mvr._startMarker.position, mvr._map, mvr._routeDifficultyId, mvr.title,mvr.description,mvr);
		TryLog(mvr._video_LegTimes[0][1]);
		
		mapObj.setCenter(mvr._video_LegTimes[0][1]);
		/*TryLog('=================== Blowing Up Marker() - EXIT ');*/
	}
		
	mvr.drawRoute =  function(){
		/*TryLog('================== mappedVideoRide.drawRoute()');*/

		if( mvr._video_LegTimes.length > 0)
		{
			var start_point = mvr._video_LegTimes[0][1]; 
			if(mvr._startMarker == null && route_title != '')
			{ 
				/*TryLog('adding start marker - ' + route_title);*/
				mvr._startMarker = new google.maps.Marker({map: mvr._map,flat:true,draggable:false,title:route_title,zIndex:10000,
					  icon: new google.maps.MarkerImage(_start_icons[mvr._routeDifficultyId -1],new google.maps.Size(17,27),new google.maps.Point(0,0),new google.maps.Point(15,12))					  
				  });
				mvr._startMarker.setPosition(start_point);
				
				google.maps.event.addListener(mvr._startMarker,'click',function(){ mvr.blowUpStartMarker(); } );
				 
			} 
			var end_point = mvr._video_LegTimes[mvr._video_LegTimes.length - 1][1];
			var waypointItems = []; 
			
			for(var i = 1; i < mvr._video_LegTimes.length-1;i++)
			{	waypointItems.push({location:mvr._video_LegTimes[i][1],stopover:true});	}
			
			var pathRequest = {
				origin:start_point,
				destination:end_point,
				travelMode: google.maps.TravelMode.DRIVING,
				optimizeWaypoints: true,
				waypoints: waypointItems
			  }; 
			  var myself = mvr;
			  
			  //console.log(route_title + " = " + mvr._routeDifficultyId + "" + _route_colors[0]);

			  mvr._map_directionsService = new google.maps.DirectionsService();
			  mvr._map_directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true,preserveViewport:true,
			  																	polylineOptions: {strokeColor: _route_colors[mvr._routeDifficultyId-1]}
																				});
			  mvr._map_directionsDisplay.setMap(mvr._map);
			  
			  mvr._map_directionsService.route(pathRequest, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {				  
				  myself._map_directionsDisplay.setDirections(result);
				  myself._map_hasPath = true;
				}
				else{
					TryLog('!!!!! DirectionService Not OK: ');
					TryLog(result);
					TryLog(status);
				}
			  });
		}
	};
	mvr.loadRide = function( )
	{	
		/*TryLog('=========== loadRide()');*/
		//console.log("start new ride");
		$('.video-container').fadeIn();

		// set title in video container
		//console.log("Title: " + mvr.title);
		$('.video-container .video-info h2').text(mvr.title);
		$('.video-container .video-info p').text(mvr.description);

		if(mvr._isTracking){/*TryLog('EarlyExit');*/return;}
		for (r = 0; r < VideoRider.PublicRider._ridesList.length; r++) {
			/*TryLog('Checking Ride at index: ' + r);*/
			if(VideoRider.PublicRider._ridesList[r][9]._isTracking)
			{				
				if (VideoRider.PublicRider._ridesList[r][9]._rideMarker != null) {if (!confirm('Are you sure you want to switch to this route?')) { return false; }}
				VideoRider.PublicRider._ridesList[r][9].stop(true);
				VideoRider
			}
		} 
		var randid = Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17);
		mvr._player_id = 'plyr_dynamic_' + randid;
		var newVideoHtml = VideoRider.PublicRider.videoplayer_html
												 .replace('##SRCURL##',mvr.videoUrl)
												 .replace('##WEBMURL##',mvr.videoUrl.replace('.mp4','.webm'))
												 .replace('##OGVURL##',mvr.videoUrl.replace('.mp4','.ogv'))
												 .replace('##ID##',mvr._player_id);
		VideoRider.PublicRider.videoplayer_holder.empty();
		VideoRider.PublicRider.videoplayer_holder.append(newVideoHtml);//.append(newVideoHtml);
		
		VideoJS(mvr._player_id,{},function(){
			/*TryLog('*** dynamic ready ***');*/
			mvr._videoPlayer = _V_(mvr._player_id);
			mvr.initPlayer(true);
		}); 
		
		mvr._isTracking = true;
		/*TryLog('=========== loadRide() exit');*/
		return true;
	};
	mvr.updateTracker = function(currentSecond)
	{	/*TryLog('============= updateTracker');*/
		currentSecond = typeof(currentSecond) != 'undefined' ? currentSecond : -1;
		if(!mvr._videoLocation_IsUpdating)
		{ 
			mvr._videoLocation_IsUpdating = true;
			if(currentSecond < 0)
			{
				if(mvr.hasVideoPlayer())
				{/*get second from player object*/
					currentSecond = parseInt(mvr._videoPlayer.currentTime());
				}
			} 
			var currentLag = mvr._videoLocation_LastUpdate - currentSecond;
			currentLag = currentLag < 0 ? -currentLag:currentLag;

			if(currentSecond == 0 || currentLag >= mvr._videoLocation_UpdateLag)
			{	/*Do Update*/
				/*TryLog('Tracking Video Second: ' + currentSecond);*/
				mvr._videoLocation_LastUpdate = currentSecond;				
				if(typeof(mvr._rideMarker) == 'undefined' || mvr._rideMarker == null)
				{ 
					/*mvr.writeAllStepMarkers();*/		
					mvr.refreshAllStepMarkers();
					mvr._rideMarker = new google.maps.Marker({
					/*  position: mvr._base._gmap_route_path[0],//mvr.getCurrentPosition(),*/
					  map: mvr._map,flat:true,draggable:false,title:mvr._rideMarkerLabel,
					  icon: new google.maps.MarkerImage(_tracker_icons[0],new google.maps.Size(30,30),new google.maps.Point(0,0),new google.maps.Point(15,15))					  
				  });
				  mvr._rideMarker.setTitle($('span.username').html()); 
				}
				var newPosition = mvr.getCurrentPosition(currentSecond);
				/*TryLog('---- New Position ----');
				TryLog(newPosition);*/
				mvr._rideMarker.setPosition(newPosition);
				VideoRider.PublicRider.CurrentLocationSet(newPosition);
			}
			mvr._videoLocation_IsUpdating = false;
		}		
		/*TryLog('============= updateTracker EXIT');*/
	};
	
	mvr.getCurrentPosition = function(time_second){
		/*TryLog('================== getCurrentPosition');
		TryLog(mvr._video_LegTimes);*/
		for(l = 0; l < mvr._video_LegTimes.length; l++)
		{				
			if(mvr._video_LegTimes[l][0] == time_second)
			{	return mvr._video_LegTimes[l][1];	}
			var from_time = mvr._video_LegTimes[l][0];
			var to_time = (l+1) == mvr._video_LegTimes.length ? from_time : mvr._video_LegTimes[l+1][0];
			
			if(time_second > from_time && time_second < to_time)
			{
				var diff_time = to_time - from_time;	
				var progress = (time_second - from_time)/diff_time;
				if(l >= mvr._map_route_legs.length){					
					/*TryLog(mvr._map_route_legs);					
					TryLog('Early Exit: ' + l + ', ' + mvr._map_route_legs.length);*/
					return null;
				}				
				var leg_length = mvr._map_route_legs[l].length;
				var leg_index = parseInt(leg_length * progress);
				if(leg_index >= mvr._map_route_legs[l].length){leg_index = mvr._map_route_legs[l].length-1;}
				return mvr._map_route_legs[l][leg_index];
			}
		}
		return null;
	};
	
	mvr.refreshAllStepMarkers = function()
	{
		/*TryLog('================== refreshAllStepMarkers');*/		
		mvr._map_route_legs = [];
		var existingCount = 0;
		var addedCount = 0;
		var route_path_legs = mvr._map_directionsDisplay.directions.routes[0].legs;							
		for(var j = 0; j < route_path_legs.length;j++)
		{
			var leg_points = [];
			var route_path_steps = route_path_legs[j].steps; 							
			for(k = 0; k < route_path_steps.length;k++)
			{
				var route_path = route_path_steps[k].path;
				for(var i = 0; i < route_path.length;i++)
				{
					leg_points.push(route_path[i]);
					//addedCount = addedCount + mvr.addMissingSteps(mvr._base._gmap_route_path, mvr._base._gmap_route_path[mvr._base._gmap_route_path.length-1],route_path[i],.0001);
					//mvr._base._gmap_route_path.push(route_path[i]);
					existingCount++;
				}
			}
			mvr._map_route_legs.push(leg_points);
		}
		/*TryLog('Existing Steps: ' + existingCount);
		TryLog('Added Steps: ' + addedCount);*/
	};
	
	mvr.hasVideoPlayer = function(){return mvr._videoPlayer != null && mvr._videoPlayer != undefined;};
	
	mvr.updateDuration = function(){mvr._video_fulltime = parseInt(mvr._videoPlayer.duration()); };
	
	mvr.start = function(enableTracking)
	{
		/*TryLog('================== mappedVideoRide.start()');*/
		if(enableTracking != null || enableTracking != undefined )
		{mvr._isTracking = enableTracking}
		if(mvr.hasVideoPlayer())
		{ mvr._videoPlayer.play(); }
		else{mvr._scheduleAutoPlay = true;}
	};
	
	mvr.stop = function(stopTracking)
	{ 
	/*	TryLog('================== mappedVideoRide.stop()');*/
		var myself = mvr;
		if (mvr.hasVideoPlayer()) {
			/*TryLog('Player Paused');*/
			mvr._videoPlayer.pause();
		}
		if (stopTracking) {
			mvr._isTracking = false;
			if(mvr._rideMarker != null && typeof(mvr._rideMarker) != 'undefined')
			{
				mvr._rideMarker.setMap(null);
				mvr._rideMarker = null;
			}
			if (mvr.hasVideoPlayer()) {
				mvr._videoPlayer.destroy();
			}
		}
	/*	TryLog('-----stop() done');*/
	};
	mvr.initPlayer = function(autoPlay){
	/*	TryLog('========= initPlayer');*/			
		if(mvr._videoPlayer != null)
		{ 
			var myself = mvr;	
			mvr._isTracking = true;
			mvr._videoPlayer.ready(function(){		
				var thisPlayer = this;	
				thisPlayer.addEvent("durationchange",function(){ myself.updateDuration();});				
				thisPlayer.addEvent("timeupdate",function(){ if(myself._isTracking){ myself.updateTracker(); } }); 				
				if(autoPlay){myself.start();}
			});
		}
	};
	
	mvr.drawRoute();
	mvr.initPlayer();
	return mvr;
};


var VideoRider = {	
	_initialized: false,
	_gmap : null,
	_gmap_directionsService: null,
	_gmap_directionsDisplay : null,
	_gmap_markers : [],
	_gmap_marker_prefix : 'waypoint_',
	_gmap_route_path: null,
	_inRecursiveDrawCall : false,
	_initLatlng : null,		
	init: function(){
		_gmap_markers = [];
		_gmap_marker_prefix = 'waypoint_';
		_inRecursiveDrawCall = false;
		_initialized = true;
	},
	getTimeValue: function(inTime)
	{
		try
		{		
			if(inTime < 10){return "0:0" + inTime;}
			else if(inTime < 60){return "0:" + inTime;}
			else
			{
				var minutes = parseInt(inTime/60);
				var seconds = parseInt(inTime%60);
				if(seconds < 10){ seconds = '0' + seconds;}
				return minutes + ':' + seconds;
			}
		}catch(e){ alert('Invalid Time Entry Detected - ' + inTime);}
		return 'Invalid';
	},	
	setCheckTime: function(inTime)
	{
		try
		{
			inTime = $.trim(inTime);
			var splitTime = inTime.split(':');
			if(splitTime.length == 1)
			{	return parseInt(splitTime[0],10);}
			else
			{
				var minutes = parseInt(splitTime[0],10);
				var seconds = parseInt(splitTime[1],10);				 
				return minutes*60 + seconds;				
			}			
		}catch(e){ alert('Invalid Time Entry Detected - ' + inTime);}
		return 0;
	},
	calcLatLongDistance2: function(LL_1,LL_2,fixPoint)
	{
		if (!Number.toFixed) {Number.prototype.toFixed=function(n){return Math.round(this*Math.pow(10, n)) / Math.pow(10, n);}}
		var latDiff = (LL_1.lat().toFixed(fixPoint) - LL_2.lat().toFixed(fixPoint)).toFixed(fixPoint);
	/*	TryLog('ToFixed: ' + latDiff);*/
		if(latDiff < 0){latDiff = -latDiff;}
		
		var lngDiff = (LL_1.lng().toFixed(fixPoint) - LL_2.lng().toFixed(fixPoint)).toFixed(fixPoint);
	/*	TryLog('ToFixed: ' + lngDiff);*/
		if(lngDiff < 0){lngDiff = -lngDiff;}
		
		var newDiff = lngDiff + latDiff;		
		return newDiff;
	},	
	calcLatLongDistance: function(LL_1,LL_2)
	{
		var latDiff = (LL_1.lat() - LL_2.lat());
		if(latDiff < 0){latDiff = -latDiff;}
		
		var lonDiff = (LL_1.lng() - LL_2.lng());
		if(lonDiff < 0){lonDiff = -lonDiff;}
		
		var newDiff = lonDiff + latDiff;		
		return newDiff;
	},	
	LLFloatParse: function(LL)
	{ return LL;	},	
	findClosestPoint: function(LL_Val,LL_List)
	{
		this.LLFloatParse(LL_Val);
		var LL_Ret = LL_Val;
		var lastDiff = 100000000000;
		for(var i = 0; i < LL_List.length;i++)
		{
			this.LLFloatParse(LL_List[i]);
			var newDiff = this.calcLatLongDistance(LL_Val,LL_List[i]);
			if(newDiff == 0){return LL_List[i];}
			else if(newDiff < lastDiff){LL_Ret = LL_List[i];lastDiff = newDiff; }			
		}
		/*LL_Ret = this.LLFloatParse(LL_Ret);*/
		return this.LLFloatParse(LL_Ret);
	},
	refreshRouteArray: function(){
		this._gmap_route_path = [];
		/*TryLog(this._gmap_directionsDisplay.directions.routes[0]);*/
	},
	AdminEditor: {
		_mappedVideoRide:null,
		_base : VideoRider,
		_inputCenterLatitude : null,/*$('#inputCenterLatitude'),*/
		_inputCenterLongitude : null,/*$('#inputCenterLongitude'),*/
		_inputMapZoom : null,/*$('#inputMapZoom'),*/
		_inputMapVideoFilename : null,/*$('#inputMapVideoFilename'),*/
		_dfltMapZoom : null,/*$('#dfltMapZoom').val(),*/
		_dfltLatitude : null,/*$('#dfltLatitude').val(),*/
		_dfltLongitude : null,/*$('#dfltLongitude').val(),*/
		_waypoint_list : null,/*$('tbody.waypoint_list'),*/
		_waypoint_maxIndex : null,/*$('#waypoint_maxIndex'),*/
		init : function(map_canvas_id,centerLatitude,centerLongitude,mapzoom,videoId){
			this._base = VideoRider;
			this._base.init();
			/*************************BIND CONTROLS***************************************************/
			this._inputCenterLatitude = $('#inputCenterLatitude');
			this._inputCenterLongitude = $('#inputCenterLongitude');
			this._inputMapZoom = $('#inputMapZoom'); 
			this._inputMapVideoFilename = $('#inputMapVideoFilename');
			this._dfltMapZoom = $('#dfltMapZoom').val();
			this._dfltLatitude = $('#dfltLatitude').val();
			this._dfltLongitude = $('#dfltLongitude').val();
			this._waypoint_list = $('tbody.waypoint_list');
			this._waypoint_maxIndex = $('#waypoint_maxIndex');
			
			/******* INITIALIZE GoogleMap **********/
			var initLatlng = new google.maps.LatLng(centerLatitude, centerLongitude);
			var initMapOptions = {zoom: mapzoom,center: initLatlng,disableDefaultUI: true,mapTypeId: google.maps.MapTypeId.ROADMAP}			
			this._base._gmap = new google.maps.Map(document.getElementById(map_canvas_id), initMapOptions);
			
			var editObject = this;
			google.maps.event.addListener(this._base._gmap,'center_changed',function(){	editObject.updateLatLongZoomInputs();} );
			google.maps.event.addListener(this._base._gmap, 'zoom_changed', function(){	editObject.updateLatLongZoomInputs();	});
			this._base._gmap_directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport:true,suppressMarkers: true });
			this._base._gmap_directionsDisplay.setMap(this._base._gmap);
			this.refreshWaypoints();			
			
			/******* INITIALIZE VidePlayer **********/
			var timeLegs = []; 
			this._waypoint_list.find('tr.waypoint_row').each(function(){				
				var mrkPos = new google.maps.LatLng($(this).find('input.waypoint_latitude').val(), $(this).find('input.waypoint_longitude').val())
				var waypointTime = $(this).find('input.waypoint_time').val();
				timeLegs.push([waypointTime,mrkPos]);
			});
			this._mappedVideoRide = new mappedVideoRide(this._base._gmap, timeLegs, 2, 2, 'admin_videoFilePlayer', false,'Admin Rider');
			this._mappedVideoRide._videoPlayer.addEvent("durationchange",function(){ $('#videoDurationText').html('Video Time: ' + editObject._base.getTimeValue(editObject.fullRideTime()));});			
		},
		fullRideTime: function(){return this._mappedVideoRide == null? 0 : this._mappedVideoRide._video_fulltime;},
		refreshWaypoints: function()
		{
			this.reorderWaypoints();
			$('img.waypoint_delete').unbind('click');
			$('img.waypoint_delete').click(function(){VideoRider.AdminEditor.deleteWaypointRow($(this).parent().parent());});
			$('input.waypoint_time').unbind('change');
			$('input.waypoint_time').change(function(){$(this).val(VideoRider.setCheckTime($(this).val())); VideoRider.AdminEditor.refreshWaypoints(); });
			this._waypoint_list.find('tr.waypoint_row').each(function(){VideoRider.AdminEditor.addUpdateWaypointRow($(this)); });
			this.drawVideoRoute();
		},	
		updateMarkerPositionInputs: function(mrk,rowSrc)
		{
			/*TryLog('entering - updateMarkerPositionInputs');*/
			rowSrc.find('input.waypoint_latitude').val(mrk.position.lat());
			rowSrc.find('input.waypoint_longitude').val(mrk.position.lng());
			this.drawVideoRoute();
		},	
		findMarkerInArray: function(mid)
		{
			for(var j = 0; j < this._base._gmap_markers.length; j++)
			{	if(this._base._gmap_markers[j][0] == mid){return this._base._gmap_markers[j][1];}	}
			return null;
		},
		selectMarker: function(mrk,row){
				row.addClass('marker_row_selected');
				mrk.setIcon(icon_selected);
			},
		blurMarker: function(mrk,row){
				row.removeClass('marker_row_selected');
				var waypointTime = row.find('input.waypoint_time').val();
				if(waypointTime == this.fullRideTime())
				{ mrk.setIcon(icon_finish);	}
				else if(waypointTime == 0){mrk.setIcon(icon_start);}
				else{mrk.setIcon(icon_default);}
			},	
		addUpdateWaypointRow: function(addUpdateRowSrc)
		{		
			var markerId = this._base._gmap_marker_prefix + addUpdateRowSrc.attr('rowDex'); 
			var mrk = this.findMarkerInArray(markerId);
			var mrkPos = new google.maps.LatLng(addUpdateRowSrc.find('input.waypoint_latitude').val(), addUpdateRowSrc.find('input.waypoint_longitude').val())
			var waypointTime = addUpdateRowSrc.find('input.waypoint_time').val();
			var mrkLabel = this._base.getTimeValue(waypointTime);
			
			if(mrk == null)
			{ 
				mrk = new google.maps.Marker({
					  position: mrkPos,
					  map: this._base._gmap,
					  draggable:true,
					  title:mrkLabel,
					  icon: icon_default
				  });
				this._base._gmap_markers.push([markerId,mrk]);
				var adminObj = this;
				google.maps.event.addListener(mrk,'mouseup',function(){adminObj.updateMarkerPositionInputs(mrk,addUpdateRowSrc);} );
				google.maps.event.addListener(mrk,'mouseover',function(){adminObj.selectMarker(mrk,addUpdateRowSrc); } );
				google.maps.event.addListener(mrk,'mouseout',function(){adminObj.blurMarker(mrk,addUpdateRowSrc); } );
				addUpdateRowSrc.hover(function(){this.selectMarker(mrk,addUpdateRowSrc);},function(){adminObj.blurMarker(mrk,addUpdateRowSrc)});
			}
			else
			{
				mrk.setPosition(mrkPos);
				mrk.setTitle(mrkLabel); 	
			}
			
			if(waypointTime == 0){mrk.setIcon(icon_start);}
			else if(waypointTime == this.fullRideTime()){ mrk.setIcon(icon_finish);	}
			else{mrk.setIcon(icon_default);}
			
		},
		deleteWaypointRow: function(deleteRowSrc)
		{
			if(confirm('Remove this waypoint from the video?'))
			{
				if(deleteRowSrc.hasClass('waypoint_row'))
				{	
					var markerId = _gmap_marker_prefix + deleteRowSrc.attr('rowDex'); 
					var mrk = this.findMarkerInArray(markerId);
					if(mrk != null){mrk.setMap(null);}
				/*	else{TryLog('No Map Marker Found to Remove - ' + markerId);}*/				
					deleteRowSrc.remove();	
					this.refreshWaypoints();
				}/*else{TryLog('Requested delete not a waypoint row.');}*/
				
			}
		},		
		 updateLatLongZoomInputs: function()
		{ 
			this._inputCenterLatitude.val(this._base._gmap.center.lat());
			this._inputCenterLongitude.val(this._base._gmap.center.lng());
			this._inputMapZoom.val(this._base._gmap.zoom);
		},		
		reorderWaypoints: function()
		{
			try{
				var didMove = true;
				var maxLoops = 10;
				var currentLoopcount = 0;
				while(didMove && currentLoopcount < maxLoops)
				{	
					currentLoopcount++;
					var wayRows = this._waypoint_list.find('tr.waypoint_row');
					/*TryLog('Looping rows - ' + wayRows.length);*/
					didMove = false;
					for(var j = 1; j < wayRows.length;j++)
					{
						/*TryLog('CheckMove Row Index: ' + j);*/
						
						var curRow = this._waypoint_list.find('tr.waypoint_row:eq(' + (j-1) + ')');
						var myTime = parseInt(curRow.find('input.waypoint_time').val(),10);
						var mySibling = this._waypoint_list.find('tr.waypoint_row:eq(' + j + ')');
						/*TryLog(mySibling);*/
						if(mySibling)
						{
							var mySiblingTime = parseInt(mySibling.find('input.waypoint_time').val(),10);
							/*TryLog('doing time check - ' + mySiblingTime + ' < ' + myTime );*/
							if(mySiblingTime < myTime)
							{
								/*TryLog('Moving Current Row Down'); */
								curRow.remove();
								mySibling.after(curRow);
								didMove = true;
							}
						}
						else{TryLog('skipping time check');}
					}
				}
			}catch(e){alert('Failed To Order Waypoints. Please Check your time values');TryLog(e);}
		},
		snapWayPointsToRoute: function(route)
		{   
			var movedWaypoints = false;	
			var waypointCount = this._waypoint_list.find('tr.waypoint_row').length;
			for(var i = 0; i < waypointCount;i++)
			{					
				var pointRow = this._waypoint_list.find('tr.waypoint_row:eq(' + i + ')');
				var pointLatLong = new google.maps.LatLng(pointRow.find('input.waypoint_latitude').val(),pointRow.find('input.waypoint_longitude').val());
				var snapPoint = this._base.findClosestPoint(pointLatLong,route.overview_path);
				if(pointLatLong.lat() != snapPoint.lat() || pointLatLong.lng() != snapPoint.lng())
				{
					pointRow.find('input.waypoint_latitude').val(snapPoint.lat());
					pointRow.find('input.waypoint_longitude').val(snapPoint.lng());
					movedWaypoints = true;
				}
			}
			
			if(false && movedWaypoints && !this._base._inRecursiveDrawCall)
			{ 
				this._base._inRecursiveDrawCall = true;
				this.refreshWaypoints();
				this._base._inRecursiveDrawCall = false;			
			} 	
		},		
		drawVideoRoute: function()
		{
			var waypointCount = this._waypoint_list.find('tr.waypoint_row').length;
			if( waypointCount > 0)
			{
				var startRow = this._waypoint_list.find('tr.waypoint_row:eq(0)');
				var startLatLong = new google.maps.LatLng(startRow.find('input.waypoint_latitude').val(),startRow.find('input.waypoint_longitude').val());
				var endRow = this._waypoint_list.find('tr.waypoint_row:eq(' + (waypointCount-1) + ')');
				var endLatLong = new google.maps.LatLng(endRow.find('input.waypoint_latitude').val(),endRow.find('input.waypoint_longitude').val());
				var waypointItems = [];
				
				for(var i = 1; i < waypointCount-1;i++)
				{					
					var pointRow = this._waypoint_list.find('tr.waypoint_row:eq(' + i + ')');
					var pointLatLong = new google.maps.LatLng(pointRow.find('input.waypoint_latitude').val(),pointRow.find('input.waypoint_longitude').val());
					waypointItems.push({location:pointLatLong,stopover:true});
				}
				
				var pathRequest = {
					origin:startLatLong,
					destination:endLatLong,
					travelMode: google.maps.TravelMode.DRIVING,
					optimizeWaypoints: true,
					waypoints: waypointItems
				  }; 
				  var vrObject = this._base;
				  	
				  this._base._gmap_directionsService = new google.maps.DirectionsService();
				  this._base._gmap_directionsService.route(pathRequest, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {				  
					  vrObject._gmap_directionsDisplay.setDirections(result); 
					  vrObject.AdminEditor.snapWayPointsToRoute(result.routes[0]);
					  vrObject.refreshRouteArray();
					}
					/*else{TryLog(result);TryLog(status);}*/
				  });
			}
		}
	},
	PublicRider: {
		_ridesList : [],
		_videoPlayerId : '',
		_currenLocation: '',
		parent : VideoRider,				
		initLatlng : null,
		initMapOptions : {},
		videoplayer_holder: null,
		videoplayer_html: '<video id="##ID##" class="video-js vjs-default-skin" controls preload="auto" poster="/assets/img/map/poster.jpg" ><source src="##SRCURL##" type="video/mp4"><source src="##WEBMURL##" type="video/webm"><source src="##OGVURL##" type="video/vorbis"></video>',
		CurrentLocationGet: function(){return this._currentLocation;},
		CurrentLocationSet: function(LatLng){this._currentLocation = LatLng.lat() + '|' + LatLng.lng();},
		init: function(rides, videoId, map_canvas_id,username){
			/*TryLog('================== PublicRider Constructor');*/
			this.videoplayer_holder = $('#video_player');
			this._ridesList = rides;
			this._videoPlayerId = videoId;
			this.parent = VideoRider; 		
			this.initLatlng = new google.maps.LatLng(44.0933398011803, -102.99249085449219);/*new google.maps.LatLng(rides[0][4], rides[0][5]);*/
			this.initMapOptions = {zoom: 8,center: this.initLatlng,mapTypeId: google.maps.MapTypeId.ROADMAP,streetViewControl: false,panControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},zoomControl: true,zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER}}/*{zoom: parseInt(rides[0][6])}*/
			this.parent._gmap = new google.maps.Map(document.getElementById(map_canvas_id), this.initMapOptions);
			
			for(i = 0; i < this._ridesList.length; i++)
			{
				var mvr = mappedVideoRide(this.parent._gmap, this._ridesList[i][8], this._ridesList[i][3], 1, videoId, false, username,this._ridesList[i][1]);
				mvr.title = this._ridesList[i][1];
				mvr.description = this._ridesList[i][2];
				mvr.videoUrl = this._ridesList[i][7];
				mvr._isTracking = false;

				this._ridesList[i].push(mvr); 
			} 
		}
	}
}

/********************************************** PUBLIC METHODS ********************************************************/
function InitPublicRidingMaps(riding_maps,player_canvas_Id,map_canvas_Id)
{
	VideoRider.PublicRider.init(riding_maps,player_canvas_Id,map_canvas_Id);
}

function InitVideoItemEdit(map_canvas_id,centerLatitude,centerLongitude,mapzoom,videoId)
{	
	VideoRider.AdminEditor.init(map_canvas_id,centerLatitude,centerLongitude,mapzoom,videoId);
	
	$('a.resetGmap').click(function(){
		VideoRider._gmap.setZoom(parseInt(VideoRider.AdminEditor._dfltMapZoom));
		VideoRider._gmap.setCenter(new google.maps.LatLng(VideoRider.AdminEditor._dfltLatitude, VideoRider.AdminEditor._dfltLongitude));		
	});		
	
	$('img#addWaypoint').click(function(){
		VideoRider.AdminEditor._waypoint_maxIndex.val(parseInt(VideoRider.AdminEditor._waypoint_maxIndex.val())+1);
		var id_index = "_" + VideoRider.AdminEditor._waypoint_maxIndex.val();
		
		var newWaypointRow = "<tr class='waypoint_row' rowDex='" + id_index + "'><input type='hidden' id='waypoint_id" + id_index  + "' name='waypoint_id" + id_index  + "' value='0'><td class='waypoint_time'><input maxlength='10' style='width:46px;' class='waypoint_time' id='waypoint_time" + id_index  + "' name='waypoint_time" + id_index  + "' value='0'></td><td class='waypoint_latitude'><input readonly='true' maxlength='20' style='width:66px;' class='waypoint_latitude' id='waypoint_latitude" + id_index  + "' name='waypoint_latitude" + id_index  + "' value='" + VideoRider.AdminEditor._dfltLatitude + "'></td><td class='waypoint_longitude'><input readonly='true' maxlength='20' style='width:66px;' class='waypoint_longitude' id='waypoint_longitude" + id_index  + "' name='waypoint_longitude" + id_index  + "' value='" + VideoRider.AdminEditor._dfltLongitude + "'></td><td class='waypoint_options'><img src='/_ls/images/icons/delete.png' class='waypoint_delete' alt='delete waypoint' title='delete waypoint'/> </td></tr>";		
		VideoRider.AdminEditor._waypoint_list.append(newWaypointRow);
		VideoRider.AdminEditor.refreshWaypoints();
	});
	
	$('#chkTrackVideo').change(function(){
		VideoRider.VideoTracker._isTracking = 	$('#chkTrackVideo').is(':checked');
	});
	
}