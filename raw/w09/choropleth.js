// set up map in the map.js file
var cmap = L.map('choropleth').setView([51.505, -0.09], 10);

// create tile layer, add to map
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    {attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL',
     maxZoom: 18,
}).addTo(cmap);

// colour function
function getColour(d) {
    return d > 20000 ? '#b30000' :
           d > 15000 ? '#e34a33' :
           d > 10000 ? '#fc8d59' :
           d > 5000  ? '#fdcc8a' :
                       '#fef0d9' ;
};

// style function
function style(feature) {
    return {
        fillColor: getColour(feature.properties.POPDENS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};

// define variable
var geojson;

// event listener
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
};

// reset layout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
};

// zoom to feature function
function zoomToFeature(e) {
    cmap.fitBounds(e.target.getBounds());
};

// apply listeners on each polygon
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
};

// add London boroughs
geojson = L.geoJson(boroughs, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(cmap);

// define legend
var legend = L.control({position: 'bottomright'});

// create legend function
legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5000, 10000, 15000, 20000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = '<b class="title">Population density</b><br/>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColour(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

// add to map
legend.addTo(cmap);
