const csvInput = document.getElementById("csv-input");
const chartCanvas = document.getElementById("chart");
const xAxisLabelInput = document.getElementById("x-axis-label");
const yAxisLabelInput = document.getElementById("y-axis-label");
const generateChartButton = document.getElementById("generate-chart");

generateChartButton.addEventListener("click", generateCustomChart);

function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        parseCSV(file);
    }
}

function parseCSV(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
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
    const selectedDatasetColor = document.getElementById("dataset-color").value;
    
    const file = csvInput.files[0];
    if (file) {
        parseCSV(file, selectedChartType, selectedDatasetColor);
    }
}

function processData(csvData) {
    const lines = csvData.split("\n");
    if (lines.length < 2) {
        alert("El archivo CSV debe contener al menos dos líneas.");
        return null;
    }

    const labels = lines[0].split(",");
    const data = lines.slice(1).map(line => line.split(",").map(parseFloat));

    return { labels, data };
}

function createChart(dataObj) {
    const ctx = chartCanvas.getContext("2d");

    const xAxisLabel = xAxisLabelInput.value || "Eje X";
    const yAxisLabel = yAxisLabelInput.value || "Eje Y";
    const selectedChartType = document.getElementById("chart-type").value;
    const selectedDatasetColor = document.getElementById("dataset-color").value;

    const datasetColors = dataObj.data.map(() => selectedDatasetColor);

    new Chart(ctx, {
        type: selectedChartType,
        data: {
            labels: dataObj.labels,
            datasets: dataObj.data.map((rowData, index) => ({
                label: `Edad `,
                data: rowData,
                borderColor: datasetColors[index],
                backgroundColor: datasetColors[index],
                fill: true
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "category",
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: xAxisLabel
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            }
        }
    });
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},1)`;
}

const chartContainer = document.getElementById("chart-container");

chartContainer.style.display = "block";
chartContainer.style.maxWidth = "80%";
chartContainer.style.margin = "0 auto";