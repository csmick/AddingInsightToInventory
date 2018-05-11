var mydata = {};
var grandTotal = 0;

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
			grandTotal = grandTotal + total;
			
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
	changeTotal();
}
function increaseItemQuant(id) {
	var new_quant = Number(sessionStorage.getItem(id)) + 1;
	sessionStorage.setItem(id, new_quant);
	grandTotal = grandTotal + Number(mydata[id].unit_price);
	updateCart(id, new_quant);
}

function decreaseItemQuant(id) {
	var new_quant = Number(sessionStorage.getItem(id)) - 1;
	sessionStorage.setItem(id, new_quant);
	grandTotal = grandTotal - Number(mydata[id].unit_price);
	updateCart(id, new_quant);
}

function updateCart(id, quant) {
	var item = mydata[id];
	var total = quant * item.unit_price;
	var itemRow = document.getElementById('cart-item-'+id);
	if(quant > 0) {
		itemRow.cells[4].innerHTML = "<input class=\"cart-quant\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+id+")\"><i class=\"fas fa-angle-up\"></i></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+id+")\"><i class=\"fas fa-angle-down\"></i></button>";
		itemRow.cells[6].innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
	} else {
		//if quantity gets to 0 remove the row from table and from cart dictionary
		itemRow.remove();
		delete cart[id];
		sessionStorage.removeItem(id);
	}
	changeTotal();
}
function changeTotal() {
	var totalElement = document.getElementById("total-text");
	totalElement.innerHTML = "$"+Number(grandTotal).toFixed(2)
}