import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Calculate metrics for FCFS scheduling
const calculateFCFS = (processes) => {
    let currentTime = 0;
    return processes.map((process) => {
        // Start time is the max of current time and arrival time
        const startTime = Math.max(currentTime, process.arrivalTime);
        currentTime = startTime + process.burstTime; // Update current time after the process finishes
        const turnaroundTime = currentTime - process.arrivalTime;
        const waitingTime = startTime - process.arrivalTime; // Calculate waiting time as the difference

        return {
            processId: process.id,
            arrivalTime: process.arrivalTime,
            burstTime: process.burstTime,
            startTime,
            turnaroundTime,
            waitingTime: Math.max(0, waitingTime), // Ensure waiting time is not negative
        };
    });
};

// Shortest Job First (SJF) Algorithm
const calculateSJF = (processes) => {
    processes.sort((a, b) => a.burstTime - b.burstTime);
    return calculateFCFS(processes);
};

// Priority Scheduling Algorithm
const calculatePriority = (processes) => {
    processes.sort((a, b) => a.priority - b.priority);
    return calculateFCFS(processes);
};

// API endpoint for scheduling
app.post('/api/schedule', (req, res) => {
    const { processes, algorithm } = req.body;
    let results;

    switch (algorithm) {
        case 'FCFS':
            results = calculateFCFS(processes);
            break;
        case 'SJF':
            results = calculateSJF(processes);
            break;
        case 'Priority':
            results = calculatePriority(processes);
            break;
        default:
            return res.status(400).send('Unknown algorithm');
    }

    res.json(results);
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
