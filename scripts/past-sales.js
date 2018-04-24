var mydata = new Array;
//var cart = {}

		
function populateGrid(data) {
//	$.get('./sample_sales.csv', function(data) {
		var head = data.split("\n");
		for(var i = 1; i < head.length-1; i++){
			line = head[i].split(",");
			var obj = {
				id:line[0],
				date:line[1],
				produce_name:line[2],
				unit_price:line[3],
				quantity:line[4],
			};
			mydata.push(obj);
		}
		console.log(mydata);
//	});
};

$.ajax({
  url:  './sample_sales.csv',
  dataType:  'text',
  beforeSend:  function(xhr) {
                 xhr.overrideMimeType("text/plain");
               }
}).done(populateGrid);

//var tmp = {id:0, date:041918 };
//mydata.push(tmp);

//console.log(mydata);



//populateGrid();

/*function continueSetup(data){
	var grid = $("#grid-area")
	for(var i = 0; i < data.length-1; i++){
		var item = data[i];
		var new_div = "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\"><a onclick=\"addItemToCart("+item.id+")\" class=\"d-block mb-4 h-100 produce-card\"><img class=\"img-fluid img-thumbnail produce-img\" src=\""+item.img_src+"\"></a></div>"
		grid.append(new_div);
	}
};
function addItemToCart(id) {
	if(!(id in cart)) {
		cart[id] = 1;
	} else {
		cart[id] = cart[id] + 1;
	}
	updateCartTable(id)
}
function updateCartTable(id){
	var table = document.getElementById('cart-table');
	var row = table.insertRow(-1);
	var c1 = row.insertCell(0); //img
	var c2 = row.insertCell(1); //produce name
	var c3 = row.insertCell(2); //unit price
	var c4 = row.insertCell(3); //times
	var c5 = row.insertCell(4); //quantity
	var c6 = row.insertCell(5); //equals
	var c7 = row.insertCell(6); //total price
	
	var item = mydata[id];
	var quant = cart[id];
	var total = quant * item.unit_price;
	
	c1.innerHTML = "img";
	c2.innerHTML = item.item_name;
	c3.innerHTML = item.unit_price;
	c4.innerHTML = "x";
	c5.innerHTML = quant;
	c6.innerHTML = "=";
	c7.innerHTML = "<b>"+total+"</b>";
}*/

