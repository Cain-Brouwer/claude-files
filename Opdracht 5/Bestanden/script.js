"use strict";

const chartElement = document.getElementById("grade-graph");

const data = {
    labels: ["p1", "p2", "p3", "p4"],
    datasets: [
        {
            label: "Frontend",
            data: [6, 7, 8, 9],
            borderColor: '#ff6384',
            backgroundColor: '#ff6384',
            tension: 0.4,
            pointRadius: 4
        },
        {
            label: "Backend",
            data: [9, 8, 7, 6],
            borderColor: '#36a2eb',
            backgroundColor: '#36a2eb',
            tension: 0.4,
            pointRadius: 4
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                ticks: { color: '#666' },
                grid: { color: '#333' },
                title: {
                    display: true,
                    text: 'Periodes',
                    color: '#666'
                }
            },
            y: {
                min: 0,
                max: 10,
                ticks: { color: '#666' },
                grid: { color: '#333' },
                title: {
                    display: true,
                    text: 'Scores',
                    color: '#666'
                }
            }
        },
        plugins: {
            legend: {
                labels: { color: '#666' }
            }
        }
    }
};

const myChart = new Chart(chartElement, config);