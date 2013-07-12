import json
from vivos.models import NacidosVivos
from django.shortcuts import render_to_response
from django.http import HttpResponse, Http404
from django.template import RequestContext

def all(request):
	if request.is_ajax:
		nacidos = NacidosVivos.objects.all()
		data = list()
		for nacido in nacidos:
			data.append({'departamento':nacido.departamento,'municipio':nacido.municipio,'year':nacido.year,
				'hombres_rural':nacido.hombres_rural,'hombres_urbano':nacido.hombres_urbano,
				'muejeres_rural':nacido.mujeres_rural,'mujeres_urbano':nacido.mujeres_urbano})

		response = HttpResponse(
			json.dumps({'data':data}),
				content_type="application/json; charset=utf8"
			)
		response["Access-Control-Allow-Origin"] = "*"  
		response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"  
		response["Access-Control-Max-Age"] = "1000"  
		response["Access-Control-Allow-Headers"] = "*"  
		return response
	else:
		raise Http404