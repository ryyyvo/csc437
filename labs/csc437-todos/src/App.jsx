import './App.css'
import TodoItem from './components/TodoItem'


function App(props) {
    const taskList = props.tasks?.map((task) => (
        <TodoItem id={task.id} name={task.name} completed={task.completed} />
    ));

    return (
        <main className="m-4"> 
            <div className="flex mb-4">
                <input 
                  placeholder="New task name"
                  className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors cursor-pointer">
                  Add task
                </button>
            </div>

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