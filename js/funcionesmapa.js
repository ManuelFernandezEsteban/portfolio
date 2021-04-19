var map;
var mostrar_direcciones;
var servicios_rutas = new google.maps.DirectionsService();

function cargarMapa() {
    mostrar_direcciones = new google.maps.DirectionsRenderer();
    var punto = new google.maps.LatLng(36.741118, -4.489761);

    var opciones = {
        zoom: 16,
        center: punto,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": "-8"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#acacac"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#484848"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ff0000"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "-3"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "72"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": "23"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "30"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "-19"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": "2"
                    },
                    {
                        "gamma": "1.21"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "saturation": "15"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": "-43"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "22"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "weight": "0.12"
                    },
                    {
                        "lightness": "-23"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "lightness": "71"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 30
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 40
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "5"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "5"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": "-24"
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-88"
                    },
                    {
                        "lightness": "-23"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "weight": "0.01"
                    },
                    {
                        "lightness": "9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-32"
                    },
                    {
                        "gamma": "2.99"
                    }
                ]
            }
        ]

    };
    map = new google.maps.Map(document.getElementById("mapa"), opciones);

    var marca = new google.maps.Marker({
        position: punto,
        map: map,
        icon: "ico/map-pin.svg"

    });
    var caja = new google.maps.InfoWindow({
        content: 'Oficina: <b>Manuel Fernández Esteban</b><br>Teléfono:677 230 977</br>Dirección: Avenida Arquitecto Luís Bono, 7 <br> Málaga 29190</br>'
    });
    google.maps.event.addListener(marca, 'click', function () {
        caja.open(map, marca);
    });
    mostrar_direcciones.setMap(map);
    mostrar_direcciones.setPanel(document.getElementById("ruta"));
    var opciones_fotos = {
        position: punto,
        pov: {
            heading: 34,
            pitch: 0,
            zoom: 1
        }
    };
}
function geolocalizar() {

    var geocoder = new google.maps.Geocoder();

    var direccion = $("#direccion").val();
    geocoder.geocode({ 'address': direccion }, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('No se ha podido localizar la dirección. ' + status);
        }
    });
}

function calcularRuta() {
    let partida = $("#partida").val();
    let destino = $("#destino").val();

    if ((partida != "") && (destino != "")) {
        console.log(partida + "," + destino);
        let opciones = {
            origin: partida,
            destination: destino,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        servicios_rutas.route(opciones, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                mostrar_direcciones.setDirections(response);
            }
        })
    }

}