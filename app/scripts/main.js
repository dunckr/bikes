$(function() {

  var map = L.map('map').setView([55.858, -4.259], 12);
	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
		id: 'examples.map-20v6611k'
	}).addTo(map);

  var bikeMarker = L.icon({
      iconUrl: '/images/blackdot.png',
      iconSize: [8, 8]
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

  $.getJSON('mock/bike-thefts.json', function(data) {

    _.each(data, function(theft) {
        var current = theft.stats['12'];
        var icon = 'blue_circle';
        var size = [64, 64]
        if (current > 150) {
            icon = 'red_circle';
            size = [96,96];
        } else if (current > 100) {
            icon = 'orange_circle';
        } else if (current > 50) {
            icon = 'yellow_circle';
        } else {
          size = [32,32];
        }
        console.log(icon);

        var theftMarker = L.icon({
            iconUrl: '/images/' + icon + '.png',
            iconSize: size
        });

        L.marker(theft.coords, {icon: theftMarker}).addTo(map);

        $('.leaflet-marker-icon').css('opacity', 0.5);
    });

  });


  // $.getJSON('mock/wards.geojson', function(data) {
  //   console.log(data);
  //   L.geoJson(data).addTo(map);
  //
  //   // _.each(data.features, function(point) {
  //   //
  //   //   var points = point.geometry.coordinates;
  //   //   L.layerGroup(points)
  //   //       // .addLayer(polyline)
  //   //       .addTo(map);
  //   //
  //   // });
  //
  //
  // });

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
