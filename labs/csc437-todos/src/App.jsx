import { useState } from 'react';
import { nanoid } from "nanoid";
import './App.css'
import TodoItem from './components/TodoItem'
import AddTaskForm from './components/AddTaskForm';
import Modal from './components/Modal';

const INITIAL_TASK_LIST = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

function App() {
    const [tasks, setTasks] = useState(INITIAL_TASK_LIST);

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
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

    function addTask(name) {
        const newTask = {
            id: `todo-${nanoid()}`,
            name: name,
            completed: false
        };
        setTasks([...tasks, newTask]);
    }

    return (
        <main className="m-4"> 
            <Modal headerLabel="Add New Task">
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