const csvInput = document.getElementById("csv-input");
const chartCanvas = document.getElementById("chart");
const xAxisLabelInput = document.getElementById("x-axis-label");
const yAxisLabelInput = document.getElementById("y-axis-label");
const generateChartButton = document.getElementById("generate-chart");
const deleteChartButton = document.getElementById("delete-chart");

let myChart = null;


generateChartButton.addEventListener("click", generateCustomChart);
deleteChartButton.addEventListener("click", deleteChart);


function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        parseCSV(file);
    }
}


function parseCSV(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const csvData = event.target.result;
        const parsedData = processData(csvData);
        if (parsedData) {
            createChart(parsedData);
        }
    };
    reader.readAsText(file);
}

function generateCustomChart() {
    const selectedChartType = document.getElementById("chart-type").value;
    const selectedDatasetColor = document.getElementById("dataset-color");
    const file = csvInput.files[0];


    if (selectedChartType === "pie") {
        selectedDatasetColor.value = "#ff0000";
        selectedDatasetColor.disabled = true;
    } else {
        selectedDatasetColor.disabled = false;
    }

    if (file) {
        parseCSV(file);
    }
}


function deleteChart() {
    if (myChart) {
        myChart.destroy();
        chartCanvas.style.display = "none";
        myChart = null;
    }
}


function processData(csvData) {
    const lines = csvData.split("\n");
    if (lines.length < 2) {
        alert("El archivo CSV debe contener al menos dos líneas.");
        return null;
    }

    const labels = lines[0].split(",");
    const data = lines.slice(1).map(line => line.split(",").map(value => {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }));

    return { labels, data };
}

function createChart(dataObj) {
    deleteChart();
    const ctx = chartCanvas.getContext("2d");

    const selectedChartType = document.getElementById("chart-type").value;


    let datasetColors = [];
    if (selectedChartType === "pie") {
        datasetColors = generateRandomColors(dataObj.labels.length);
    } else {
        const selectedDatasetColor = document.getElementById("dataset-color").value;
        datasetColors = Array(dataObj.labels.length).fill(selectedDatasetColor);
    }

    const yAxisLabel = yAxisLabelInput.value || "Eje Y"; // Obtén el valor del campo de entrada


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: selectedChartType !== "pie",
            },
        },
        scales: {
            x: {
                display: selectedChartType !== "pie",
                title: {
                    display: true,
                    text: xAxisLabelInput.value || "Eje X",
                },
            },
            y: {
                display: selectedChartType !== "pie",
                title: {
                    display: true,
                    text: yAxisLabel,
                },
            },
        },
    };


    if (selectedChartType !== "pie") {
        chartOptions.plugins.legend.labels = {
            generateLabels: function (chart) {
                const originalLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                originalLabels[0].text = yAxisLabel;
                return originalLabels;
            },
        };
    }

    if (selectedChartType === "pie") {
        chartOptions.plugins.legend = {
            display: true,
        };



        chartOptions.scales.y.display = false;
    }

    myChart = new Chart(ctx, {
        type: selectedChartType,
        data: {
            labels: dataObj.labels,
            datasets: [{
                data: dataObj.data[0],
                backgroundColor: datasetColors,
            }]
        },
        options: chartOptions
    });

    chartCanvas.style.display = "block";
}

function generateRandomColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colors.push(`rgba(${r},${g},${b},1)`);
    }
    return colors;
}