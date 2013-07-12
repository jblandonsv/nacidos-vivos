$(document).ready(inicio);

var nacidos;

var coordenadas = 
	[
		{depto: '11 -  U S U L U T A N',latitud:13.347533,longitud:-88.429298,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '12- SAN MIGUEL',latitud:13.473103,longitud:-88.176956,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '13- MORAZÁN',latitud:13.756726,longitud:-88.134384,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '14- L A    U N I O N',latitud:13.331916,longitud:-87.845306,hrural:0,hurbano:0,mrural:0,murbano:0},

		{depto: '03 - S O N S O N A T E',latitud:13.71137,longitud:-89.723969,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '02 - S A N T A     A N A',latitud:13.996038,longitud:-89.552479,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '01 - A H U A C H A P A N',latitud:13.920738,longitud:-89.847393,hrural:0,hurbano:0,mrural:0,murbano:0},

		{depto: '06 - S A N    S A L V A D O R',latitud:13.706867,longitud:-89.201775,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '05 - L A     L I B E R T A D',latitud:13.682016,longitud:-89.360733,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '08 - LA PAZ',latitud:13.495137,longitud:-88.979645,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '10 - S A N    V I C E N T E',latitud:13.641191,longitud:-88.78541,hrural:0,hurbano:0,mrural:0,murbano:0},
		
		{depto: '04 - CHALATENANGO',latitud:14.033345,longitud:-88.933339,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '07 - C U S C A T L A N',latitud:13.86608,longitud:-89.056206,hrural:0,hurbano:0,mrural:0,murbano:0},
		{depto: '09 - C A B A Ñ A S',latitud:13.864747,longitud:-88.749275,hrural:0,hurbano:0,mrural:0,murbano:0},

	];
var map = L.map('map').setView([13.736717, -88.748545], 9);
var marker;
var marcas = [];

function inicio()
{

	
	cargarDatos();
	$('#dimensionar').click(efectoToggle);
	$("input[name=nacidos]").change(filtrarDatos);
	$("input[name=year]").change(filtrarDatos);

	
	console.log(coordenadas);

    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map)


    colocandoCirculos(map);


}

function colocandoCirculos(map)
{

	for(var i = 0;i<coordenadas.length;i++){


		var densidad = L.circle([coordenadas[i].latitud,coordenadas[i].longitud],5500,
		{
			color:'red',
			fillColor:'#f05',
			fillOpacity:0.5
		});//.addTo(map);

		densidad.bindPopup("<b>" + coordenadas[i].depto+"</b>")
		marcas[i]=densidad;
		
	}
	L.layerGroup(marcas).addTo(map);

}

function cargarDatos()
{
	$.getJSON('http://localhost:8000/vivos/all',function(datos){
		nacidos = datos.data;
	});
}

function filtrarDatos()
{

	resetCantidades();
	var genero = $('input[name=nacidos]:checked').attr('id');
	var year = $('input[name=year]:checked').attr('id');
	$('#annio').html(year);
	//console.log(nacidos);

	for(var i = 0; i<nacidos.length;i++)
	{
		//console.log('año nacidos = ' +nacidos[i].year );
		//console.log('año = ' +year );
		if(nacidos[i].year==year)
		{
			//console.log('COINCIDEN AÑOS !');
			//Es el año que se está filtrando, se buscará el departamento para sumarle la población
			for(var j = 0;j<coordenadas.length;j++){
			//	console.log('DEPARTAMENTO NACIDOS = ' + nacidos[i].departamento);
			//	console.log('DEPARTAMENTO= ' + coordenadas[j].depto);
				
				if(nacidos[i].departamento == coordenadas[j].depto){
			//		console.log('COINCIDEN DEPTO');
					//el departamento coincide, se procede a totalizar

					coordenadas[j].hrural = coordenadas[j].hrural + nacidos[i].hombres_rural;
					coordenadas[j].hurbano = coordenadas[j].hurbano + nacidos[i].hombres_urbano;
					coordenadas[j].mrural = coordenadas[j].mrural + nacidos[i].muejeres_rural;
					coordenadas[j].murbano = coordenadas[j].murbano + nacidos[i].mujeres_urbano;
				}
			}
		}
	}
	limpiarMapa();
	colocandoMarcas(genero);

}

function limpiarMapa()
{
	for( var i = 0;i<marcas.length;i++)
	{
		map.removeLayer(marcas[i]);
		//marcas = [];
	}
}

function resetCantidades()
{
	for(var j = 0;j<coordenadas.length;j++){
				
					//el departamento coincide, se procede a totalizar
					coordenadas[j].hrural = 0;
					coordenadas[j].hurbano = 0;
					coordenadas[j].mrural = 0;
					coordenadas[j].murbano = 0;

			}
}






function colocandoMarcas(genero)
{

	console.log('genero = ' + genero);

	for(var i = 0;i<coordenadas.length;i++){

		var metros = 0;
		var colores = '';
		var relleno = '';
		if(genero=='hrural')
		{
			metros = coordenadas[i].hrural;
			colores = 'blue';
			relleno = '#05f';
		}
		if(genero=='hurbano')
		{
			console.log('HOMBRE URBANO !!');
			metros = coordenadas[i].hurbano;
			colores = 'green';
			relleno = '#5f0';
		}
		if(genero=='mrural')
		{
			metros = coordenadas[i].mrural;
			colores = 'red';
			relleno = '#f05';
		}
		if(genero=='murbano')
		{
			metros = coordenadas[i].murbano;
			colores = 'yellow';
			relleno = '#000';
		}
		var metros2 = metros * 1.4;
		var densidad = L.circle([coordenadas[i].latitud,coordenadas[i].longitud],metros2,
		{
			color:colores,
			fillColor:relleno,
			fillOpacity:0.5
		});//.addTo(map);

		densidad.bindPopup("<p><b>" + coordenadas[i].depto+"</b></p>" + '<p><b>Nacid@s:'+metros+'</b></p>')
		marcas[i] = densidad;
		
	}
	L.layerGroup(marcas).addTo(map);

}


function verTotales()
{
	for(var j = 0;j<coordenadas.length;j++){
		console.log('DEPARTAMENTO = ' + coordenadas[j].depto);
		console.log('Hurbanos = ' + coordenadas[j].hurbano);
		console.log('hrural = ' + coordenadas[j].hrural);
		console.log('murbano = ' + coordenadas[j].murbano);
		console.log('mrural = ' + coordenadas[j].mrural);
	}
}