import { useState } from 'react';
import { nanoid } from "nanoid";
import './App.css'
import TodoItem from './components/TodoItem'
import AddTaskForm from './components/AddTaskForm';
import Modal from './components/Modal';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

const INITIAL_TASK_LIST: Task[] = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

function App() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASK_LIST);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function toggleTaskCompleted(id: string) {
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id: string) {
        const remainingTasks = tasks.filter(task => task.id !== id);
        setTasks(remainingTasks);
    }

    const taskList = tasks?.map((task) => (
        <TodoItem 
            key={task.id}
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
            onToggle={toggleTaskCompleted}
            onDelete={deleteTask}
        />
    ));

    function addTask(name: string) {
        const newTask = {
            id: `todo-${nanoid()}`,
            name: name,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setIsModalOpen(false);
    }

    return (
        <main className="m-4"> 
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium px-4 py-2 mb-4 rounded transition-colors cursor-pointer"
            >
                Add Task
            </button>
            <Modal 
                headerLabel="Add New Task" 
                isOpen={isModalOpen}
                onCloseRequested={() => setIsModalOpen(false)}
            >
                <AddTaskForm onNewTask={addTask} />
            </Modal>
            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul>
                    {taskList}
                </ul>
            </section>
        </main>
    );
}

export default App;