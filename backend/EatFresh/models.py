from django.db import models

# Create your models here.

class Produce(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    season = models.CharField(max_length=200)
    region = models.CharField(max_length=300)
    description = models.TextField()

    def __str__(self):
        return self.name

