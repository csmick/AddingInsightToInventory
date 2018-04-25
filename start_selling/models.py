from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=20)
    unit = models.CharField(max_length=10)
    unit_price = models.DecimalField(max_digits=4, decimal_places=2)
    inventory = models.PositiveIntegerField()
    image = models.ImageField(upload_to='items')

    def __str__(self):
        return '\'name\':{}, \'unit\':{}, \'unit_price\':{}, \'inventory\':{}'.format(self.name, self.unit, self.unit_price, self.inventory)

class Transaction(models.Model):
    total_cost = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateTimeField()

    def __str__(self):
        return '\'total_cost\':{}, \'date\':{}\''.format(self.total_cost, str(self.date))

class SoldItem(models.Model):
    name = models.CharField(max_length=20)
    quantity = models.PositiveIntegerField()
    total_cost = models.DecimalField(max_digits=5, decimal_places=2)
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    transaction = models.ForeignKey(Transaction, on_delete=models.PROTECT)

    def __str__(self):
        return '\'name\':{}, \'quantity\':{}, \'total_cost\':{}, \'item\':{}, \'transaction\':{}'.format(self.name, self.quantity, self.total_cost, self.item, self.transaction)
    
