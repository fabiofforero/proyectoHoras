google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initialize);

var currentChart = null;

function initialize() {
	var graficarButton = document.getElementById('graficarButton');
	var eliminarButton = document.getElementById('eliminarButton');
	graficarButton.addEventListener('click', graficar);
	eliminarButton.addEventListener('click', eliminarGrafico);
}

function graficar() {
	if (currentChart !== null) {
		currentChart.clearChart();
	}

	var cantidad = parseInt(document.getElementById("cantidad").value);
	var nombres = document.getElementById("nombres").value.split(",");
	var edades = document.getElementById("edades").value.split(",");
	var tituloX = document.getElementById("tituloX").value;
	var tituloY = document.getElementById("tituloY").value;
	var tipoGrafico = document.getElementById("tipoGrafico").value;
	var colorFondo = document.getElementById("colorFondo").value;
	var colorGrafico = document.getElementById("colorGrafico").value;

	var data = new google.visualization.DataTable();
	data.addColumn('string', tituloX);
	data.addColumn('number', tituloY);

	if (nombres.length !== cantidad || edades.length !== cantidad) {
		alert("Por favor, ingrese la cantidad de nombres y edades adecuada.");
		return;
	}

	for (var i = 0; i < cantidad; i++) {
		data.addRow([nombres[i], parseInt(edades[i])]);
	}

	var options = {
		title: 'Nombres y Edades',
		backgroundColor: colorFondo,
		series: {
			0: { color: colorGrafico }
		}
	};

	var chartContainer = document.getElementById('chart_div');

	switch (tipoGrafico) {
		case 'ScatterChart':
			options.hAxis = {title: tituloX, titleTextStyle: {color: 'ed'}};
			options.vAxis = {title: tituloY, titleTextStyle: {color: 'blue'}};
			currentChart = new google.visualization.ScatterChart(chartContainer);
			break;
		case 'LineChart':
			options.hAxis = {title: tituloX, titleTextStyle: {color: 'ed'}};
			options.vAxis = {title: tituloY, titleTextStyle: {color: 'blue'}};
			currentChart = new google.visualization.LineChart(chartContainer);
			break;
		case 'BarChart':
			options.hAxis = {title: tituloX, titleTextStyle: {color: 'ed'}};
			options.vAxis = {title: tituloY, titleTextStyle: {color: 'blue'}};
			currentChart = new google.visualization.BarChart(chartContainer);
			break;
		case 'AreaChart':
			options.hAxis = {title: tituloX, titleTextStyle: {color: 'ed'}};
			options.vAxis = {title: tituloY, titleTextStyle: {color: 'blue'}};
			currentChart = new google.visualization.AreaChart(chartContainer);
			break;
		case 'PieChart':
			currentChart = new google.visualization.PieChart(chartContainer);
			break;
		default:
			break;
	}

	currentChart.draw(data, options);
}

function eliminarGrafico() {
	if (currentChart !== null) {
		currentChart.clearChart();
	}
}