from django.db import models

class NacidosVivos(models.Model):
	departamento = models.CharField(max_length=100)
	municipio = models.CharField(max_length=100)
	year = models.CharField(max_length=4)
	hombres_rural = models.IntegerField()
	hombres_urbano = models.IntegerField()
	mujeres_rural = models.IntegerField()
	mujeres_urbano = models.IntegerField()

	def __unicode__(self):
		return self.departamento