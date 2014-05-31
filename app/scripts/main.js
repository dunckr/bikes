$(function() {

  var map = L.map('map').setView([55.858, -4.259], 12);

  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(map);
		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-20v6611k'
		}).addTo(map);


  var bikeMarker = L.icon({
      iconUrl: '/images/bikeMarker.png',
      iconSize: [16, 16]
  });

  function addMarker(geojsonFeature, icon) {
    L.geoJson(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng,
              {icon: bikeMarker});
        }
    }).addTo(map);
  }

  $('#racks').click(function() {
    $.getJSON('mock/cycle-racks.geojson', function(data) {
      _.each(data.features, function(point) {
        addMarker(point, bikeMarker);
      });
    });
  });

  $('#routes').click(function() {
    $.getJSON('mock/cycling-routes.geojson', function(data) {
      _.each(data.features, function(points) {
        L.geoJson(points, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng);
            }
        }).addTo(map);

      });
    });
  });

  $.getJSON('mock/wards.geojson', function(data) {
    console.log(data);
    L.geoJson(data).addTo(map);

    // _.each(data.features, function(point) {
    //
    //   var points = point.geometry.coordinates;
    //   L.layerGroup(points)
    //       // .addLayer(polyline)
    //       .addTo(map);
    //
    // });


  });

  // $.getJSON('mock/strava-stats.json', function(data) {
  //   console.log(data[0]);
  //   _.each(data, function(street) {
  //     // console.log(street);
  //     // if (street.OSM_META !== '') {
  //         // console.log(street.OSM_META);
  //     // }
  //   });
  // });

});
