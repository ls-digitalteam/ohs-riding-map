var icon_default = "http://www.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png";
var icon_start = "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png";
var icon_finish = "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png";
var icon_selected = "http://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png";
var icon_waypoint = "http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";

var icon_start_1 = "/ohs-riding-map/assets/img/map/level_marker_1.png";
var icon_start_2 = "/ohs-riding-map/assets/img/map/level_marker_2.png";
var icon_start_3 = "/ohs-riding-map/assets/img/map/level_marker_3.png";
var icon_start_4 = "/ohs-riding-map/assets/img/map/level_marker_4.png";
var icon_start_5 = "/ohs-riding-map/assets/img/map/level_marker_5.png";
var start_icons = ['/ohs-riding-map/assets/img/map/level_marker_1.png','/ohs-riding-map/assets/img/map/level_marker_2.png','/ohs-riding-map/assets/img/map/level_marker_3.png','/ohs-riding-map/assets/img/map/level_marker_4.png','/ohs-riding-map/assets/img/map/level_marker_5.png'];

var icon_tracker_1 = "/_images/icons/tracker_blue.gif";
var icon_tracker_2 = "/_images/icons/tracker_green.gif";
var icon_tracker_3 = "/_images/icons/tracker_orange.gif";
var icon_tracker_4 = "/_images/icons/tracker_purple.gif";
var icon_tracker_5 = "/_images/icons/tracker_red.gif";
var tracker_icons = ['/_images/icons/tracker_blue.gif','/_images/icons/tracker_green.gif','/_images/icons/tracker_orange.gif','/_images/icons/tracker_purple.gif','/_images/icons/tracker_red.gif'];

$(function(){
	$("#ride_MapHolder #rideMapPicker a").click(function(e) {
		e.preventDefault();
		switchToMap($(this).hasClass("traffic"));
	});
	$('#btn_start_the_ride').click(function(e) {
		$('#ride_map_alert_box').hide();
		switchToMap();
		
	});
	$('#btn_view_traffic_map').click(function(e) {
		e.preventDefault();
		$('#ride_map_alert_box').hide();
		switchToMap(true);
	});
	$('.video_btn_close').click(function (e) {
		$("video").each(function() {
			$(this).get(0).pause();
		});
		$('.video-container').fadeOut();
	});

	/*
	var mapParam = location.search.split('map=')[1];
	if (mapParam === 'traffic') {
		console.log('traffic');
		$('#ride_map_alert_box').hide();
		switchToMap(true);
	}
	else {
		console.log('interactive');
	}
	*/
});

function switchToMap(isTraffic) {
	$("#ride_MapHolder #rideMapPicker a").removeClass("active");
	if (isTraffic) {
		$("#ride_MapHolder #rideMapPicker a.traffic").addClass("active");
		$("#ride_map_container").hide();
		$("#traffic_map_container").show();
		$("#rideMapTopper").addClass("traffic");
		$(".interactive-legend").slideUp();
		$(".traffic-legend").slideDown();
		$('.video-container').hide();
	} else {
		$("#ride_MapHolder #rideMapPicker a.interactive").addClass("active");
		$("#traffic_map_container").hide();
		$("#ride_map_container").show();
		$("#rideMapTopper").removeClass("traffic");
		$(".interactive-legend").slideDown();
		$(".traffic-legend").slideUp();
		$('.video-container').hide();
	}
}

function TryLog(msg,forceAlert)
{
	//try{console.log(msg);}	
	//catch(e){if(forceAlert){alert(msg);}}
}


function ToggleItemStatus(id,item_type,imgSrc)
{
	$.ajax({
			type: 'GET',
			url: '/classlibrary/InformationTypes/VideoMapRide/generalHandler.cfm',
			data: {
				ID:id,
				A:'ActiveToggle',
				T:item_type
				},
				error: function(xhr, ajaxOptions, thrownError)
				{	alert('There was an error during submission please re-try.');	},
			success: function(result){
				
				if(result.substr(0,1) == '0')
				{	
					imgSrc.attr('src',imgSrc.attr('src').replace('accept.png','cancel.png'));	
					imgSrc.attr('status','0');
				}
				else if (result.substr(0,1) == '1')
				{	
					imgSrc.attr('src',imgSrc.attr('src').replace('cancel.png','accept.png'));
					imgSrc.attr('status','1');
				}
				else{alert('There was an error processing your request, please re-try.');TryLog(result,true);}
			}
		});
}