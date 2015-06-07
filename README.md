# Google-Maps-Filter

This program will take any JSON data and automatically create a map with custom filters based on the properties of the JSON objects. It also will take any HTML content and display it in a sidebar. All that is needed are geographical coordinates, and some properties to filter on. The map will also automatically zoom and pan to fit the locations that are currently being displayed.

It is easily customizable by modifying the `config` object and CSS classes.

Written in vanilla Javascript plus a bit of jQuery.

For example, we have the JSON data:

```
[
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
]
```


This gives us filters on 'Type' as well as 'Location', as in the following screenshots:
<br><br>
<img src="https://github.com/michaelnthiessen/Google-Maps-Filter/blob/master/screen1.png">
<img src="https://github.com/michaelnthiessen/Google-Maps-Filter/blob/master/screen2.png">
