import './App.css'
import TodoItem from './components/TodoItem'
import AddTaskForm from './components/AddTaskForm';


function App(props) {
    const taskList = props.tasks?.map((task) => (
        <TodoItem 
            key={task.id}
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
        />
    ));

    return (
        <main className="m-4"> 
            <AddTaskForm />
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