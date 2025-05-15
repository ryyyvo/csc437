import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <div> {/* Unfortunately comments in JSX have to be done like this */}
                <input placeholder="New task name"/>
                <button>Add task</button>
            </div>

            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul>
                    <li>
                        <label>
                            <input type="checkbox"/> Eat
                        </label>
                        <button>Delete</button>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/> Sleep
                        </label>
                        <button>Delete</button>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"/> Repeat
                        </label>
                        <button>Delete</button>
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default App;