
// gets the necessary modules for what is being displayed or created.
require(["esri/Map","esri/views/MapView","esri/layers/FeatureLayer","esri/renderers/SimpleRenderer", "esri/symbols/PictureMarkerSymbol", "esri/renderers/UniqueValueRenderer", "esri/widgets/Legend", "dojo/domReady!"],
        
      function(Map, MapView, FeatureLayer, SimpleRenderer, PictureMarkerSymbol, UniqueValueRenderer, Legend) {
        
    
    
    
    
        // Symbol for UCRCode 300
        var exSym = new PictureMarkerSymbol({
            url: "http://diysolarpanelsv.com/images/a-gun-clipart-37.jpg",
            width: "20px",
            height: "20px"
        });
    
        // Symbol for UCRCode 500
         var exSym2= new PictureMarkerSymbol({
            url: "http://images.clipartpanda.com/money-clipart-aTepRo6T4.jpeg",
            width: "20px",
            height: "20px"
        });   
    
        // Symbol for UCRCode 600
         var exSym3= new PictureMarkerSymbol({
            url: "http://vademecumitalia.com/wp-content/uploads/2015/03/Theft2-300x300.jpg",
            width: "20px",
            height: "20px"
        });    
      
    
       // Symbol for UCRCode 700
         var exSym4= new PictureMarkerSymbol({
            url: "http://worldartsme.com/images/car-thief-clipart-1.jpg",
            width: "20px",
            height: "20px"
        });      
    
        var phillyCrimeRenderer = new UniqueValueRenderer({
           field: "UCRHundred",
           uniqueValueInfos:[
               {
                   value:300,
                   label: "Robbery",
                   symbol:exSym
               },
               {
                  value:500,
                  label: "Burglary",
                  symbol:exSym2
               },
               {
                   value:600,
                   label: "Theft",
                   symbol:exSym3
               },
               {
                   value:700,
                   label: "Stolen Vehicle",
                   symbol:exSym4
               }
           ]
        });
             
        // This is the FeatureLayer for cities that is going to be rendered, rendered by the above SimpleRenderer
        var crimeLayer = new FeatureLayer({
        // url is the ARCGIS service to get the crime statistics for Philadelphia 2002 June
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/PhillyCrime/FeatureServer",
        renderer: phillyCrimeRenderer,
        outFields: ["*"], // allows use of {LOCATION}, etc from ARCGIS services URL
        // Popup creation
        popupTemplate:{
            expressionInfos: [{
                name:"type-of-crime",
                title: "Crime Committed",
                expression: "if($feature.UCRHundred == 100){return 'Homicide'} if($feature.UCRHundred == 200){return 'Sexual Assault'} if($feature.UCRHundred == 300){return 'Robbery'} if($feature.UCRHundred == 400){return 'Assault'} if($feature.UCRHundred == 500){return 'Burglary'} if($feature.UCRHundred == 600){return 'Theft'} else{return 'Stolen Vehicle'}"
            }],
            title: "{LOCATION}",
            content:
                "Crime Committed: {expression/type-of-crime} <br> Time: {HOUR_}:00 <br> Value of Property Stolen: {STOLEN_VALUE}$ <br> Value of Property Retrieved: {RECOVERED_VALUE}$"    
        }
        });   
    
    
        // Instantiates the map and adds the basemap type and layers that have been created
        var map = new Map({
          basemap: "hybrid",
          layers: [crimeLayer]
        });
        
        // Creates the view of the map, without it the map is not visible
        var view = new MapView({
          container: "viewDiv", // where the map should be held
          map: map, // variable for the map created above this var
          center: [-75.1652, 39.9526], // where the map should start
          zoom: 10 // zoom of the map
        });
    
        var legend = new Legend({
            view: view,
            layerInfos:[
                {
                   layer:crimeLayer,
                   title: "Property Crimes for June 2002"
                }
            ]
        });
    
        view.ui.add(legend,"bottom-right");
    
      });



