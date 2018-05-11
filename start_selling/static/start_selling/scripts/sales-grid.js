var mydata = {};
var cart = {};

document.addEventListener("dragstart", function(event) {
	event.dataTransfer.setData("text/uri-list", imageurl);
	event.dataTransfer.setData("text/plain", imageurl);
	event.target.style.opacity = "0.4";
	console.log("dragging");
});

document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "3px dotted red";
		console.log("target reached");
    }
});

function displayDate() {
    var title = document.getElementById("session-title");
	var date = new Date();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear();
	var dateString = month + "/" + day + "/" + year;
	title.innerHTML = "Sales Session " + dateString;
}
function populateData(items) {
	if(sessionStorage.doClear == "true"){
		sessionStorage.clear();
		window.location.reload(true);
	}
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
	displayDate();
}

function populateModal(id) {
	var mod = document.getElementById("detailModal");
	var item = mydata[id];
	var details = document.getElementById("food-details");
	details.rows[0].cells[1].innerHTML = item.item_name;
	details.rows[1].cells[1].innerHTML = "$"+Number(item.unit_price).toFixed(2)+" per "+item.unit;
	var pic = document.getElementById("modal-pic")
	pic.src = item.img_src;
	document.getElementById("inputId").value = item.id;
	//console.log(cart);
	//console.log(id);
	if(id in cart) {
		details.rows[2].cells[1].innerHTML = "<input id=\"input-quant\" value=\""+cart[id]+"\">";
		document.getElementById("rmBtn").classList.remove("disabled");
	} else {
		details.rows[2].cells[1].innerHTML = "<input id=\"input-quant\" value=\"0\">";
		document.getElementById("rmBtn").classList.add("disabled");
	}
}

function increaseItemQuant(id) {
	var AlreadyInCart;
	if(!(id in cart)) {
		cart[id] = 1;
		sessionStorage.setItem(id, 1);
		AlreadyInCart = false;
	} else {
		cart[id] = cart[id] + 1;
		var new_quant = Number(sessionStorage.getItem(id)) + 1;
		sessionStorage.setItem(id, new_quant);
		AlreadyInCart = true;
	}
	updateCartTable(id, AlreadyInCart)
}

function decreaseItemQuant(id) {
	cart[id] = cart[id] - 1;
	var new_quant = Number(sessionStorage.getItem(id)) - 1;
	sessionStorage.setItem(id, new_quant);
	updateCartTable(id, true);
}

function changeTotal() {
	var totalElement = document.getElementById("total-num");
	var totalCost = 0;
	for (id in cart){
		var item = mydata[id];
		var quant = cart[id];
		var cost = quant * item.unit_price;
		totalCost = totalCost + cost;
	}
	totalElement.innerHTML = "$"+Number(totalCost).toFixed(2)
}
function updateCartTable(id, AlreadyInCart){
	var table = document.getElementById('cart-table');
	var item = mydata[id];
	//var quant = cart[id];
	var quant = sessionStorage[id];
	var total = quant * item.unit_price;
	if(AlreadyInCart) {
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
		c5.innerHTML = "<input class=\"cart-quant\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+id+")\"><i class=\"fas fa-angle-up\"></i></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+id+")\"><i class=\"fas fa-angle-down\"></i></button>";
		c6.innerHTML = "=";
		c7.innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
		
		var row_id = "cart-item-" + id;
		row.id = row_id;
	}
	changeTotal();
}

function removeFromModal() {
	var id = Number(document.getElementById("inputId").value);
	var cartTable = document.getElementById('cart-table');
	var itemRow = document.getElementById('cart-item-'+id);
	var i = itemRow.parentNode.parentNode.rowIndex;
	cartTable.deleteRow(i);
	delete cart[id];
	sessionStorage.removeItem(id);
}

function addFromModal() {
	var id = Number(document.getElementById("inputId").value);
	var quant = Number(document.getElementById('input-quant').value);
	var item = mydata[id];
	sessionStorage.setItem(id, quant);
	var total = quant * item.unit_price;
	if(id in cart) {
		cart[id] = quant;
		var itemRow = document.getElementById('cart-item-'+id);
		if(quant > 0) {
			itemRow.cells[4].innerHTML = "<input class=\"cart-quant\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+id+")\"><i class=\"fas fa-angle-up\"></i></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+id+")\"><i class=\"fas fa-angle-down\"></i></button>";
			itemRow.cells[6].innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
		}
	} else {
		var table = document.getElementById('cart-table');
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
		c5.innerHTML = "<input class=\"cart-quant\" value=\""+quant+"\"/><button class=\"btn btn-default up-btn\" onclick=\"increaseItemQuant("+id+")\"><i class=\"fas fa-angle-up\"></i></button><button class=\"btn btn-default down-btn\" onclick=\"decreaseItemQuant("+id+")\"><i class=\"fas fa-angle-down\"></i></button>";
		c6.innerHTML = "=";
		c7.innerHTML = "<b>$"+Number(total).toFixed(2)+"</b>";
		
		var row_id = "cart-item-" + id;
		row.id = row_id;
		cart[id] = quant;
	}
	changeTotal();
	
}
function removeItemfromCart(id){
	var cartTable = document.getElementById('cart-table');
	var itemRow = document.getElementById('cart-item-'+id);
	var i = itemRow.parentNode.parentNode.rowIndex;
	cartTable.deleteRow(i);
}
//dragula([document.getElementsByClassName("produce-img"), document.getElementById("cart-items")], {
//  copy: true
//});
/* dragula([document.getElementById("grid-area"), document.getElementById("cart-items")])
  .on('drop', function (el) {
    console.log("item dragged to cart");
	console.log(el);
	//el.remove()
	var itemId = el.id;
	console.log(itemId);
	//delete cart[id];
  });
dragula([document.getElementById("cart-table"), document.getElementById("trashcan")])
  .on('drop', function (el) {
    console.log("delete triggered");
	console.log(el);
	el.remove()
	var itemId = el.id;
	//delete cart[id];
  }); */
