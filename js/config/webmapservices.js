define([], function(){
        return {
            bases:{
                
                
                b1:{
                        type:'OSM',
                        label:'Open Street Map',
                        img:'osm.png'
                },
                
                b2:{
                        type:'WMS',
                        label:'Base Vector',
                        path:'http://187.188.96.133:800/cgi-bin/mapserv.exe?map=D:/ms4w/Apache/htdocs/PROBOSQUE/maps/probosque_google.map',
                        img:'vectorial.png',
                        data:{
                                layers:'base_estado_probosque_google',
                                format:'png'
                        }
                        
                        
                },
                b3:{
                        type:'Bing',
                        label:'Bing Maps',
                        img:'bing.png',
                        key:'At-Y-dJe-yHOoSMPmSuTJD5rRE_oltqeTmSYpMrLLYv-ni4moE-Fe1y8OWiNwZVT',
                        data:{
                                type: "Aerial"
                        }
                },
                
                b4:{
                        type:'Google',
                        label:'Google maps',
                        img:'google.png',
                        data:{
                                type: "google.maps.MapTypeId.SATELLITE"
                        }
                }
            },
     
            overlays:{
                g1:{
                        label:'Capas de Referencia',
                        path:'http://187.188.96.133:800/cgi-bin/mapserv.exe?map=D:/ms4w/Apache/htdocs/PROBOSQUE/maps/probosque_google.map',
                        type:'WMS',
                        projection:'EPSG:3857',
                        layers:{
                                estado_probosque_google:{
                                        label:'Estado de M&eacute;xico',
                                        active:true
                                },
                                textosestatal_probosque_google:{
                                        label:'Estado de M&eacute;xico (etiquetas)',
                                        active:true
                                },
                                municipios_probosque_google:{
                                        label:'Municipios',
                                        active:true
                                },
                                textosmunicipal_probosque_google:{
                                        label:'Municipios (etiquetas)',
                                        active:true
                                },
                                localidadesurbanas_probosque_google:{
                                        label:'Localidades urbanas',
                                        active:true
                                },
                                regiones_probosque_google:{
                                        label:'Regiones Forestales',
                                        active:true
                                },
                                textosregiones_probosque_google:{
                                        label:'Regiones Forestales (etiquetas)',
                                        active:true
                                }
                        }
                        
                }
            },
            colorOverlays:['#e53935','#b71c1c','#f06292','#d81b60','#880e4f','#ce93d8','#7b1fa2','#4a148c','#c5cae9','#5c6bc0','#283593','#bbdefb','#42a5f5','#1565c0','#66bb6a','#7cb342','#004d40','#ffeb3b','#ff8f00','#e65100','#4e342e','#607d8b']
        }
});