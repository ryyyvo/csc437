import { useState } from 'react';

function AddTaskForm({ onNewTask }) {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = () => {
        if (taskName.trim() !== "") {
            onNewTask(taskName);
            setTaskName("");
        }
    };

    return (
        <div className="flex mb-4">
            <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="New task name"
                className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors cursor-pointer"
            >
                Add task
            </button>
        </div>
    );
}

export default AddTaskForm;