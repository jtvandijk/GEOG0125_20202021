// set up map in the map.js file
var smap = L.map('simple_map').setView([51.505, -0.09], 12);

// create tile layer, add to map
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    {attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL',
     maxZoom: 18,
}).addTo(smap);

// create marker
var marker = L.marker([51.5, -0.09]);

// add to map
marker.addTo(smap);

// create circle
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
});

// add to map
circle.addTo(smap);

// create polygon
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]);

// add to map
polygon.addTo(smap);

// add popups
marker.bindPopup("<b>Hello world!</b><br>I am a marker.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
