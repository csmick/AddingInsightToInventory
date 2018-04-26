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
		populateTable(mydata);
		populateGraph(mydata);
//	});
};

//thank you stack overflow
function populateTable(data) {
	var html = '';
	for(var i in data) {
		console.log(i);
		html +='<tr>';
		html += '<td>'+data[i].produce_name + '</td><td>'+data[i].quantity+'</td><td>'+data[i].unit_price+'</td>';
		html +='</tr>'; 
	}
	var table = document.getElementById("tBody");
	table.innerHTML = html;
}

function populateGraph(data) {
	/*var chartData[];
	for(var i = 1; i < head.length-1; i++) {
		line = head[i].split(",");
		
	}*/
	//var chartData = getChartData(data);

	var dataPoints = getChartData(data);

	var chart = new CanvasJS.Chart("chartContainer",{ 
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "04/19/2018 - 04/26/2018"
		},
		axisY: {
			title: "Quantity"
		},
		data: [{
			type: "column",
			showInLegend: false,
			dataPoints: dataPoints
		}]
	});
	chart.render();
}

function getChartData(data) {
	var obj = [];
	for (var i in data) {
		obj.push({
			label: data[i].produce_name,
			y: parseInt(data[i].quantity)
		});
	}

	return obj;
}

$.ajax({
  url:  './sample_sales.csv',
  dataType:  'text',
  beforeSend:  function(xhr) {
                 xhr.overrideMimeType("text/plain");
               }
}).done(populateGrid);


/*function updateCartTable(id){
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

