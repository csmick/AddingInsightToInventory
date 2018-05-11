var mydata = {};

function populateData(items){
	console.log(sessionStorage);
	
    items.forEach(function(item) {
        //console.log(item)
        var obj = {
            id:item.pk,
            item_name:item.fields.name,
            unit:item.fields.unit,
            unit_price:item.fields.unit_price,
            qty:item.fields.inventory,
            img_src:"/static/"+item.fields.image,
        }
        mydata[item.pk] = obj;
    });
	populateCart();
}

function populateCart(){
	var table = document.getElementById("item-list");
	
	for(thing in sessionStorage){
		try {
			var item = mydata[thing];
		} catch (err) {
			continue;
		}
		if(item){
			console.log(item);
			var quant = sessionStorage[item.id];
			var total = quant * item.unit_price;
			
			var row = table.insertRow(-1);
			var c1 = row.insertCell(0); //img
			var c2 = row.insertCell(1); //produce name
			var c3 = row.insertCell(2); //unit price
			var c4 = row.insertCell(3); //times
			var c5 = row.insertCell(4); //quantity
			var c6 = row.insertCell(5); //equals
			var c7 = row.insertCell(6); //total price
				
			c1.innerHTML = "<img class=\"cart-item-img\" src=\""+item.img_src+"\">";
			c2.innerHTML = item.item_name;
			c3.innerHTML = "$"+Number(item.unit_price).toFixed(2);
			c4.innerHTML = "x";
			c5.innerHTML = "<input class=\"cart-quant\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+item.id+")\"><i class=\"fas fa-angle-up\"></i></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+item.id+")\"><i class=\"fas fa-angle-down\"></i></button>";
			c6.innerHTML = "=";
			c7.innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
				
			var row_id = "cart-item-" + item.id;
			row.id = row_id;
		} else {
			console.log("not a produce item");
		}
	}
}