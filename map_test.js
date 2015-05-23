var JSONData = [
            {
                position: new google.maps.LatLng(40.74844,-73.985664),
                location: 'Manhattan',
                type: 'Skyscraper',
                info: '<h4>Empire State Building</h4><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/360px-Empire_State_Building_from_the_Top_of_the_Rock.jpg" /><br><br>The Empire State Building is a 102-story skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets.' + 
                        ''
            },
            {
                position: new google.maps.LatLng(40.702837,-74.010729),
                location: 'Manhattan',
                type: 'Skyscraper',
                info: '<h4>Daily News Building</h4><img src="http://upload.wikimedia.org/wikipedia/commons/7/7c/Daily_News_Building.jpg"><br><br>' +
                        'The Daily News Building, also known as The News Building, is a 476-foot (145 m) Art-Deco skyscraper located at 220 East 42nd Street between Second and Third Avenues in the Turtle Bay neighborhood of Midtown Manhattan, New York City'
            },
            {
                position: new google.maps.LatLng(40.706567,-74.003575),
                location: 'Manhattan',
                type: 'Ship',
                info: '<h4>Lightship Ambrose</h4><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/0/04/WTM_tony_0111.jpg/640px-WTM_tony_0111.jpg">' +
                    '<br><br>The United States Lightship LV-87 (Ambrose) is a lightship built 1907 and served at the Ambrose Channel station until 1932. She would be the first lightship to serve in the relocated position nearer the center of the channel.'
            },
            {
                position: new google.maps.LatLng(40.8582444,-73.9128808),
                location: 'Bronx',
                type: 'Building',
                info: '<h4>Bronx Community College</h4><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/NYU_library2_crop.jpg/640px-NYU_library2_crop.jpg">' +
                        'The Bronx Community College of The City University of New York (BCC) is a community college located in the University Heights neighborhood of The Bronx on a landmarked campus. It is part of the City University of New York system.'
            },
            {
                position: new google.maps.LatLng(40.8719633, -73.8053083),
                location: 'Bronx',
                type: 'Building',
                info: '<h4>Bartow-Pell Mansion Museum</h4><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Bartow-pell-mansion.jpg/640px-Bartow-pell-mansion.jpg">' +
                    '<br><br>The Bartow-Pell Mansion is a landmark and museum located in the northern portion of Pelham Bay Park in the Bronx, New York City.<br><br>Originally the Robert and Marie Lorillard Bartow House, the residence and estate date back to 1654. The Lords of the Manor of Pelham once owned the home which was later enlarged, renovated and remodeled in the Federal style.'
            }
        ];

var HIGHLIGHTED_ICON = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
var NORMAL_ICON = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

// Our main controller
var app = (function () {
    var that = {};

    // ----------- Private -----------
    var map = {};
    var filter = {};
    var markersOnMap = [];
    var currentlyDisplayedMarker;
    var MAX_ZOOM = 13;
    var NO_INFO = '<br><br><h5>Sorry, there is nothing to display.</h5>';

    that.markers = [];

    // Initialize our map
    var initGoogleMaps = function() {

        // Initialize with some random center point
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 3,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROAD_MAP,
            maxZoom: MAX_ZOOM
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };

    // Add click handlers to our filters
    var addEventsToFilters = function() {

        // Click handler function
        var handler = function(self, property) {
            return function () {
                $('#' + property).find('li').removeClass('active');
                $(self).addClass('active');
                filter[property] = $(self).text();
                updateMarkersOnMap();
            };
        };

        // Loop through each different filter
        $('.filter').each(function() {
            filterType = $(this);
            var defaultVal;

            // Add the new filter type
            property = filterType.attr('id');
            filter[property] = defaultVal;

            // Attach handlers
            filterType.find('li').each(function() {
                $(this).click(handler(this, property));
            })

        });

    };

    // Use lazy instatiation to get the css
    // values for the filter widgets
    var getCssValues = function() {

        // Lazy instantiation
        if (that.cssValues) {
            return that.cssValues;
        }

        var cssValues = {};

        cssValues.top = parseInt($('.widget').css('top').replace('px', ''));
        cssValues.leftOffset = parseInt($('.filter').css('left').replace('px', ''));
        cssValues.optionHeight = parseInt($('.filter').find('li').css('height').replace('px', ''));
        cssValues.titleHeight = parseInt($('.widget').find('.title').find('h3').css('line-height').replace('px', ''));

        that.cssValues = cssValues;

        return that.cssValues;
    };

    var initFilters = function() {
        var properties = Model.getDataProperties();
        var property, newFilter, newDiv;

        var cssValues = getCssValues();
        var topOffset = cssValues.top;

        // Add a filter for each different property
        for (property in properties) {
            console.log( property );

            newFilter = "<div id='newDiv' class='widget filter'><div class='title'><h3>Title</h3></div><div><ul><li class='active'>All</li></ul></div></div>"

            // Append it to the body
            $('body').append( newFilter );
            newDiv = $('#newDiv');

            var borderWidth = 2;
            var defaultOption = 1;      // We have a default 'All' option

            var height = cssValues.titleHeight + ((properties[property].length + defaultOption) * cssValues.optionHeight) + borderWidth;

            // Update some css values
            newDiv.css({
                'top': topOffset + 'px',
                'left': cssValues.leftOffset + 'px',
                'height':  height + 'px'
            });

            // Update our topOffset
            topOffset += height + cssValues.top;

            // Add in each option except for the last one
            var i, length;
            for (i = 0, length = properties[property].length - 1; i < length; i += 1) {
                newDiv.find('ul').append('<li>' + properties[property][i] + '</li>');
            }

            // Add the last option
            newDiv.find('ul').append("<li class='bottom'>" + properties[property][i] + '</li>');
            newDiv.find('h3').text(helper.capitalize(property));
            newDiv.attr('id', property);
        }

        $('#default-filter').remove();
    };

    var setMarkersOnMap = function(filter) {
        var filteredMarkers = Model.getMarkers(filter);
        var markersToPlace = filteredMarkers.filter( function(item) {
            return markersOnMap.indexOf(item) === -1;
        });

        var markersToRemove = markersOnMap.filter( function(item) {
            return filteredMarkers.indexOf(item) === -1;
        });

        // Remove all of the markers we need removed
        removeMarkers(markersToRemove);

        // Place all of the new markers
        for (var i = 0, length = markersToPlace.length; i < length; i += 1) {
            markersToPlace[i].setMap(map);
            markersToPlace[i].setAnimation( google.maps.Animation.DROP );
        }

        markersOnMap = filteredMarkers;
    };

    var removeMarkers = function(markers) {
        var i, length;
        for (i = 0, length = markers.length; i < length; i += 1) {
            markers[i].setMap(null);
        }

        resetIcons(markers);
    };

    var isMarkerOnMap = function(marker) {
        var i, length;
        var onMap = false;
        for (i = 0, length = markersOnMap.length; i < length && !onMap; i += 1) {
            if (marker === markersOnMap[i]) {
                onMap = true;
            }
        }

        return onMap;
    };

    var updateMarkersOnMap = function() {

        // Update the markers
        setMarkersOnMap(filter);

        if ( markersOnMap.length > 0 ) {

            // If the currently selected marker has just
            // been removed, we need to change the selected marker
            if (!isMarkerOnMap(currentlyDisplayedMarker)) {
                that.selectMarker(markersOnMap[0]);
            }
            
            // Resize the bounds so that they fit around all
            // of the available points
            fitBounds();

        } else {
            currentlyDisplayedMarker = null;
            that.updateInformation( NO_INFO );
        }
    };

    // Reset all the marker icons to normal
    var resetIcons = function(markers) {
        markers.forEach(function(marker) {
            marker.setIcon(NORMAL_ICON);
        });
    };

    // Fit the bounds of the map to fit all of the markers
    var fitBounds = function() {

        var bounds = new google.maps.LatLngBounds();

        for( i = 0; i < markersOnMap.length; i++ ) {
            bounds.extend( markersOnMap[i].getPosition() );
        }

        var northEast = bounds.getNorthEast();
        var southWest = bounds.getSouthWest();
        var center = bounds.getCenter();

        var latMultiplier = 1.5;
        var lngMultiplier = 3.0;

        // Increase the distance between the center and the NE and SW points
        var latDiff = (northEast.lat() - center.lat()) * latMultiplier;
        var lngDiff = (northEast.lng() - center.lng()) * lngMultiplier;

        var northEastLat = center.lat() + latDiff;
        var southWestLat = center.lat() - latDiff;

        var northEastLng = center.lng() + lngDiff;
        var southWestLng = center.lng() - lngDiff;

        var newNorthEast = new google.maps.LatLng( northEastLat, northEastLng );
        var newSouthWest = new google.maps.LatLng( southWestLat, southWestLng );

        var newBounds = new google.maps.LatLngBounds( newSouthWest, newNorthEast );
        map.fitBounds( newBounds );
    };

    // ---------------- Public -----------------

    // Main initialization function
    that.start = function() {

        // Setup the filters and their events
        initFilters();
        addEventsToFilters();

        // Load the map
        initGoogleMaps();

        // Load the initial markers
        updateMarkersOnMap();
    };
    
    that.updateInformation = function(info) {
        $('#info').html(info);
    };


    that.selectMarker = function(marker) {
        resetIcons(markersOnMap);
        marker.setIcon(HIGHLIGHTED_ICON);
        that.updateInformation(marker.info);
        currentlyDisplayedMarker = marker;
    };

    return that;

})();

// Create our data model
var Model = (function() {
    var that = {};

    data = JSONData;

    var allMarkers;

    // Turn the data into Maps Markers
    // For each marker we add a new function
    // that will display the info
    var createMarkers = function() {

        var helper = function(marker) {
            return function() {
                app.selectMarker(marker);
            };
        };

        allMarkers = [];

        var i, length;
        for (i = 0, length = data.length; i < length; i++) {
            data[i]['animation'] = google.maps.Animation.DROP;
            var newMarker = new google.maps.Marker(data[i]);
            newMarker.setIcon(NORMAL_ICON);
            google.maps.event.addListener(newMarker, 'click', helper(newMarker));
            allMarkers.push(newMarker);
        }
    };

    var filterMarkersOnPropertyValue = function(markers, property, value) {

        if (value === 'All') {
            return markers;
        }

        // If the marker does not have the correct property,
        // remove it from the list
        var markersToPlace = [];
        var i, length;
        for (i = 0, length = markers.length; i < length; i += 1) {
            if (value === markers[i][property]) {
                markersToPlace.push(markers[i]);
            }
        }

        return markersToPlace;
    }

    var valueInArray = function(value, array) {
        var i, length;
        var inArray = false;

        for (i = 0, length = array.length; i < length && !inArray; i += 1) {
            if (array[i] === value) {
                inArray = true;
            }
        }

        return inArray;
    }

    that.getMarkers = function(filterObject) {

        var markersToPlace;

        // Create markers from the data if we haven't already
        if (!allMarkers) {
            createMarkers();
        }

        // Fill with all markers initially
        markersToPlace = allMarkers;

        // Filters
        for ( property in filterObject ) {
            var filterValue = filterObject[property] || 'All';
            markersToPlace = filterMarkersOnPropertyValue( markersToPlace, property, filterValue );
        }

        return markersToPlace;
    };

    // Returns a list of the extra properties that the data has
    // this excludes lat, long, and info
    that.getDataProperties = function() {

        var property;
        var dataProperties = [];
        var i, j;
        var value;

        for (i = 0; i < data.length; i += 1) {
            for (property in data[i]) {
                value = data[i][property];

                // Add the new property if we don't have it already
                if (property !== 'position' &&
                    property !== 'info' &&
                    property !== 'clickable' &&
                    property !== 'visible' &&
                    dataProperties[property] === undefined) {
                    dataProperties[property] = [value];
                }
                // Add in the new value
                else if (dataProperties[property] !== undefined && !valueInArray(value, dataProperties[property])) {
                    dataProperties[property].push(data[i][property]);
                }
            }
        }

        return dataProperties;
    };

    return that;
})();

var helper = (function() {
    that = {};

    // Capitalize the first letter of each word
    that.capitalize = function(string) {
        string = string.toLowerCase();

        words = string.split(' ');

        var i, length, result = '';
        for (i = 0, length = words.length - 1; i < length; i += 1) {
            result += words[i].charAt(0).toUpperCase() + words[i].slice(1) + ' ';
        }

        result += words[i].charAt(0).toUpperCase() + words[i].slice(1);

        return result;
    }

    return that;
})();

// Launch the app
$(document).ready(function() {
    app.start();
});
























