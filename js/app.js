// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

"use strict";

$(document).ready(function() {
	var mapElem = document.getElementById('map');
	var center = {
		lat: 47.6,
    	lng: -122.3
	};

	var map = new google.maps.Map(mapElem, {
		center: center,
		zoom: 12
	});

	var infoWindow = new google.maps.InfoWindow();

	var lights;
	var markers = [];


	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			lights = data;

			data.forEach(function(light) {
				var marker = new google.maps.Marker({
					position: {
						lat: Number(light.location.latitude),
						lng: Number(light.location.longitude)
					},
					map: map
					// Attempt for filtering markers by search	
					/*
					$('search').bind('search keyup', function() {
						if (this.contains(light.cameralabel)) {
							setMap(map);
						} else {
							setMap(null);
						}
					});
					*/
				});
				markers.push(marker);

				google.maps.event.addListener(marker, 'click', function() {
					var html = '<h2>' + light.cameralabel + '</h2>';
					html += '<img src=' + light.imageurl.url + '>';
		
					infoWindow.setContent(html);
					infoWindow.open(map, this);
					map.setCenter(marker.position);

				});
			});
		})
		.fail(function(error) {
			console.log('error');
		})
});