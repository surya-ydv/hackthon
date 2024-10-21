import { useState } from 'react';
import axios from 'axios';
import GanttChart from './components/GanttChart';
import './App.css'; // Ensure you have the CSS file for styles

function App() {
    const [processes, setProcesses] = useState([]);
    const [algorithm, setAlgorithm] = useState('FCFS');
    const [results, setResults] = useState([]);

    // Function to add a new process
    const addProcess = () => {
        setProcesses([...processes, { id: processes.length + 1, arrivalTime: 0, burstTime: 0, priority: 1 }]);
    };

    // Function to handle submission of processes for scheduling
    const handleSubmit = async () => {
        if (processes.length === 0) {
            alert("Please add at least one process.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/schedule', { processes, algorithm });
            setResults(response.data);
        } catch (error) {
            console.error('Error calculating schedule:', error);
        }
    };

    // Function to update process details
    const updateProcess = (index, field, value) => {
        const updatedProcesses = [...processes];
        updatedProcesses[index][field] = Number(value);
        setProcesses(updatedProcesses);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6">CPU Scheduling Simulator</h1>

                <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Add Processes</h2>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex flex-col w-full sm:w-1/3">
                            <label className="text-white mb-1">Arrival Time</label>
                            {processes.map((process, index) => (
                                <input
                                    key={`arrival-${index}`}
                                    type="number"
                                    value={process.arrivalTime}
                                    onChange={(e) => updateProcess(index, 'arrivalTime', e.target.value)}
                                    className="custom-input mb-2 w-20 sm:w-full" // Smaller width on small screens
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col w-full sm:w-1/3">
                            <label className="text-white mb-1">Burst Time</label>
                            {processes.map((process, index) => (
                                <input
                                    key={`burst-${index}`}
                                    type="number"
                                    value={process.burstTime}
                                    onChange={(e) => updateProcess(index, 'burstTime', e.target.value)}
                                    className="custom-input mb-2 w-20 sm:w-full" // Smaller width on small screens
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col w-full sm:w-1/3">
                            <label className="text-white mb-1">Priority (1-5)</label>
                            {processes.map((process, index) => (
                                <input
                                    key={`priority-${index}`}
                                    type="number"
                                    value={process.priority}
                                    onChange={(e) => updateProcess(index, 'priority', e.target.value)}
                                    className="custom-input mb-2 w-20 sm:w-full" // Smaller width on small screens
                                    placeholder="1"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                        <button onClick={addProcess} className="custom-button mb-2 sm:mb-0">Add Process</button>
                        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="custom-select mb-2 sm:mb-0">
                            <option value="FCFS">FCFS</option>
                            <option value="SJF">SJF</option>
                            <option value="Priority">Priority</option>
                        </select>
                        <button onClick={handleSubmit} className="custom-button">Calculate</button>
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mt-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Scheduling Results</h2>
                        <GanttChart results={results} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
