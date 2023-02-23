
anychart.onDocumentReady(function() {
    // create map
    var map = anychart.map();
  
    // create data set
    var dataSet = anychart.data.set(
        [{"id":"NL.NH","value":0},
              {"id":"NL.ZH","value":1},
              {"id":"NL.LI","value":2},
              {"id":"NL.GE","value":3},
              {"id":"NL.NB","value":4},
              {"id":"NL.OV","value":5},
              {"id":"NL.UT","value":6},
              {"id":"NL.DR","value":7},
              {"id":"NL.FL","value":8},
              {"id":"NL.GR","value":9},
              {"id":"NL.ZE","value":10},
              {"id":"NL.FR","value":11}]
    );
  
    // create choropleth series
    series = map.choropleth(dataSet);
  
    // set geoIdField to 'id', this field contains in geo data meta properties
    series.geoIdField('id');
  
    // set map color settings
    // series.colorScale(anychart.scales.linearColor('#deebf7', '#3182bd'));
    // series.hovered().fill('#addd8e');
  
    // set geo data, you can find this map in our geo maps collection
    // https://cdn.anychart.com/#maps-collection
    map.geoData(anychart.maps['netherlands']);
  
    //set map container id (div)
    map.container('container');
  
    //initiate map drawing
    map.draw();
  });