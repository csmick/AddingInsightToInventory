var mydata = new Array;
var cart = {}
		
function populateGrid() {
	var title = document.getElementById("session-title");
	var date = new Date();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear();
	var dateString = month + "/" + day + "/" + year;
	title.innerHTML = "Sales Session " + dateString;
	$.get('./sample_data.csv', function(data) {
		var head = data.split("\n");
		for(var i = 1; i < head.length-1; i++){
			line = head[i].split(",");
			var obj = {
				id:line[0],
				item_name:line[1],
				unit:line[2],
				unit_price:line[3],
				type:line[4],
				qty:line[5],
				img_src:line[6]
			};
			mydata.push(obj);
		}
		console.log(mydata);
		continueSetup(mydata);
	});
};
function continueSetup(data){
	var grid = $("#grid-area")
	for(var i = 0; i < data.length-1; i++){
		var item = data[i];
		var new_div = "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\"><a onclick=\"increaseItemQuant("+item.id+")\" class=\"d-block mb-4 h-100 produce-card\"><img class=\"img-fluid img-thumbnail produce-img\" src=\""+item.img_src+"\"><p class=\"grid-text\">"+item.item_name+"</p></a></div>"
		grid.append(new_div);
	}
};
function increaseItemQuant(id) {
	var AlreadyInCart;
	if(!(id in cart)) {
		cart[id] = 1;
		AlreadyInCart = false;
	} else {
		cart[id] = cart[id] + 1;
		AlreadyInCart = true;
	}
	updateCartTable(id, AlreadyInCart)
}
function decreaseItemQuant(id) {
	if(cart[id] > 2) {
		cart[id] = cart[id] - 1;
		updateCartTable(id, true)
	}
	//if removing an element causes the quantity to be zero, remove the item from the cart
	else {
		removeItemfromCart(id);
	}	
}
function updateCartTable(id, AlreadyInCart){
	var table = document.getElementById('cart-table');
	var item = mydata[id];
	var quant = cart[id];
	var total = quant * item.unit_price;
	if(AlreadyInCart) {
		var itemRow = document.getElementById('cart-item-'+id);
		itemRow.cells[4].innerHTML = "<input class=\"cart-quant\" type=\"number\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+id+")\"><span class=\"glyphicon glyphicon-chevron-up\"></span></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+id+")\"><span class=\"glyphicon glyphicon-chevron-down\"></span></button>";
		itemRow.cells[6].innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
		
	} else {
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
		c5.innerHTML = "<input class=\"cart-quant\" type=\"number\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+id+")\"><span class=\"glyphicon glyphicon-chevron-up\"></span></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+id+")\"><span class=\"glyphicon glyphicon-chevron-down\"></span></button>";
		c6.innerHTML = "=";
		c7.innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
		
		var row_id = "cart-item-" + id;
		row.id = row_id;
	}
}
function removeItemfromCart(id){
	var cartTable = document.getElementById('cart-table');
	var itemRow = document.getElementById('cart-item-'+id);
	var i = itemRow.parentNode.parentNode.rowIndex;
	cartTable.deleteRow(i);
}
