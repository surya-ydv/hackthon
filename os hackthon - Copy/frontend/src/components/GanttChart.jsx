import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const GanttChart = ({ results }) => {
    const processIds = results.map(r => `P${r.processId}`);
    const startTimes = results.map(r => r.startTime);
    const burstTimes = results.map(r => r.burstTime);
    const waitingTimes = results.map(r => r.waitingTime);
    const turnaroundTimes = results.map(r => r.turnaroundTime);

    const data = {
        labels: processIds,
        datasets: [
            {
                label: 'Waiting Time',
                data: waitingTimes,
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
            },
            {
                label: 'Start Time',
                data: startTimes,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
            {
                label: 'Execution (Burst Time)',
                data: burstTimes,
                backgroundColor: 'rgba(255, 159, 64, 0.8)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
            },
            {
                label: 'Turnaround Time',
                data: turnaroundTimes,
                backgroundColor: 'rgba(255, 0, 0, 0.8)', 
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Time (ms)',
                    color: '#fff',
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    color: '#444',
                    lineWidth: 1,
                },
                ticks: {
                    color: '#fff',
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#fff',
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const label = tooltipItem.dataset.label;
                        const value = tooltipItem.raw;
                        return `${label}: ${value} ms`; // Display detailed info in tooltips
                    },
                },
            },
        },
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-white text-center">Gantt Chart</h2>
            <div className="relative h-72">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default GanttChart;
