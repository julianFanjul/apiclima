
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Api clima',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
    {
      path: '/pronostico/',
      url: 'pronostico.html',
    },
  ], autocomplete: {
    openIn: 'popup',
    animate: false,
  }
  // ... other parameters
});
var mainView = app.views.create('.view-main');


var LasCiudades = [""];
var autocompleteDropdownAll = app.autocomplete.create({
  inputEl: '#autocomplete-dropdown-all',
  openIn: 'dropdown',
  source: function (query, render) {
    var results = [];
    // Find matched items
    for (var i = 0; i < LasCiudades.length; i++) {
      if (LasCiudades[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(LasCiudades[i].normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    }
    // Render items by passing array with result items
    render(results);
  }
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  url = "https://ws.smn.gob.ar/map_items/forecast/1";
  app.request.json(url, function (datosRecibidos) {
    for (let i = 0; i < datosRecibidos.length; i++) {
      LasCiudades = [];

      // Find matched items
      for (var t = 0; t < datosRecibidos.length; t++) {
        LasCiudades.push(datosRecibidos[t].name);
      }
      return (LasCiudades).normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
    }
  })
})
$$("#verPronostico").on('click', function () {
  $$("#logoInicial").removeClass("displayBlock");
  $$("#logoInicial").addClass("displayNone");
  var ciudad = "";
  var noEncontrado = false;
  var ciudad = $$('#autocomplete-dropdown-all').val();
  if (ciudad.toLowerCase() == "caba") { ciudad = "Capital Federal"; }

  url = "https://ws.smn.gob.ar/map_items/forecast/1";
  app.request.json(url, function (datosRecibidos) {
    for (let i = 0; i < datosRecibidos.length; i++) {
      noEncontrado = true;
      if ((datosRecibidos[i].name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() == ciudad.toLowerCase().trim()) {
        $$("#BusquedaFalse").addClass("displayNone");
        $$("#BusquedaTrue").removeClass("displayNone");
        localidad = datosRecibidos[i].name;
        provincia = datosRecibidos[i].province;
        img_m = datosRecibidos[i].weather.morning_id;
        temp_m = datosRecibidos[i].weather.morning_temp;
        temp_m += "°C";
        desc_m = datosRecibidos[i].weather.morning_desc;
        img_t = datosRecibidos[i].weather.afternoon_id;
        temp_t = datosRecibidos[i].weather.afternoon_temp;
        temp_t += "°C";
        desc_t = datosRecibidos[i].weather.afternoon_desc;
        datosRecibidos = i;
        noEncontrado = false;
      }
      //si no fue encontrada retornara ciudad no encontrada
    } if (noEncontrado == true) {
      $$("#logoInicial").addClass("displayBlock");
      $$("#BusquedaTrue").addClass("displayNone");
      $$("#BusquedaFalse").removeClass("displayNone");
    }
    $$('#localidad').html(localidad);
    $$('#provincia').html(provincia);
    $$('#temp_m').html(temp_m);
    $$('#desc_m').html(desc_m);
    $$('#temp_t').html(temp_t);
    $$('#desc_t').html(desc_t);
    //        $$('#img_m').attr('src','http://openweathermap.org/img/wn/'+img_m+'d@2x.png');
    //        $$('#img_t').attr('src','http://openweathermap.org/img/wn/'+img_t+'n@2x.png');
    $$('#img_m').attr('src', 'http://l.yimg.com/a/i/us/we/52/' + img_m + '.gif');
    $$('#img_t').attr('src', 'http://l.yimg.com/a/i/us/we/52/' + img_t + '.gif');
  });
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="pronostico"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
})