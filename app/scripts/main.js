$(function() {

  var map = L.map('map').setView([55.858, -4.259], 12);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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

  $.getJSON('mock/cycle-racks.geojson', function(data) {
    _.each(data.features, function(point) {
      addMarker(point, bikeMarker);
    });
  });

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
