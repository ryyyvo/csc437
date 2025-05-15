import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function App() {
    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <div className="flex mb-4"> {/* Unfortunately comments in JSX have to be done like this */}
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
                    <li>
                        <label className="mr-1">
                            <input type="checkbox" /> Eat
                        </label>
                        <button className="text-gray-500 hover:text-red-500 p-1 rounded cursor-pointer">
                          <FontAwesomeIcon icon={faTrash} title="Delete task" />
                        </button>
                    </li>
                    <li>
                        <label className="mr-1">
                            <input type="checkbox"/> Sleep
                        </label>
                        <button className="text-gray-500 hover:text-red-500 p-1 rounded cursor-pointer">
                          <FontAwesomeIcon icon={faTrash} title="Delete task" />
                        </button>
                    </li>
                    <li>
                        <label className="mr-1">
                            <input type="checkbox" /> Repeat
                        </label>
                        <button className="text-gray-500 hover:text-red-500 p-1 rounded cursor-pointer">
                          <FontAwesomeIcon icon={faTrash} title="Delete task" />
                        </button>
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default App;