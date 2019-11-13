from django.db import models
from django.contrib.postgres.fields import JSONField
# Create your models here.

class Produce(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    seasonAndRegion = JSONField(default=dict)
    description = models.TextField()

    def __str__(self):
        return self.name

