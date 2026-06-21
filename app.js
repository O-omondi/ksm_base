// 1. Initialize the map
var map = L.map('map').setView([-0.0917, 34.7680], 10);
// Base layer - OpenStreetMap
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

// Base layer - Esri Satellite
var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
});

// Base layer - Satellite Labels
var satelliteLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels © Esri'
});

// Group satellite + labels together
var satelliteWithLabels = L.layerGroup([satellite, satelliteLabels]);

// Add default base layer to map
osm.addTo(map);

// Base layers object for control
var baseLayers = {
    "Street Map": osm,
    "Satellite": satelliteWithLabels
};

// Add layer control
L.control.layers(baseLayers).addTo(map);

// 3. Load county boundary
fetch('app_data/county_boundary.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#ff0000',
                weight: 3,
                fillColor: '#ff0000',
                fillOpacity: 0.1
            }
        }).addTo(map);
    });
    // 4. Load subcounties
fetch('app_data/sub_counties.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#0000ff',
                weight: 2,
                fillColor: '#0000ff',
                fillOpacity: 0.1
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Subcounty: </b>' + feature.properties.Name
                );
            }
        }).addTo(map);
    });
    // 5. Load wards
fetch('app_data/ksm_wards.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#008000',
                weight: 1,
                fillColor: '#008000',
                fillOpacity: 0.1
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Ward: </b>' + feature.properties.Kenya_Ward
                );
            }
        }).addTo(map);
    });
        // 7. Load parks
fetch('app_data/parks.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#006600',
                weight: 1,
                fillColor: '#90EE90',
                fillOpacity: 0.5
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Park: </b>' + feature.properties.NAME
                );
            }
        }).addTo(map);
    });
    // 6. Load rivers
fetch('app_data/rivers.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#0066cc',
                weight: 1.5,
            }
        }).addTo(map);
    });
    // 8. Load SGR
fetch('app_data/sgr.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#8B4513',
                weight: 2,
            }
        }).addTo(map);
    });
    // 9. Load towns
fetch('app_data/towns.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: '#ff7800',
                    color: '#000',
                    weight: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Town: </b>' + feature.properties.TName
                );
            }
        }).addTo(map);
    });
    // 10. Load primary schools
fetch('app_data/primary_schools.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: '#ffff00',
                    color: '#000',
                    weight: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Primary School: </b>' + feature.properties.NAME
                );
            }
        }).addTo(map);
    });
    // 11. Load secondary schools
fetch('app_data/secondary_schools.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: '#ff0000',
                    color: '#000',
                    weight: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Secondary School: </b>' + feature.properties.NAME
                );
            }
        }).addTo(map);
    });
    // 12. Load colleges
fetch('app_data/collages.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: '#800080',
                    color: '#000',
                    weight: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>College: </b>' + feature.properties.NAME_OF_SC
                );
            }
        }).addTo(map);
    });
    // 13. Load facilities
fetch('app_data/facilities.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: '#00ffff',
                    color: '#000',
                    weight: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Facility: </b>' + feature.properties.Name
                );
            }
        }).addTo(map);
    });
