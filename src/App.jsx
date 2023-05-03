// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <p className="read-the-docs">
        Error top messages
      </p>
      <div>
        <select name="filter">
          <option value="All">Всё</option>
        </select>
      </div>
      <h1>Bare Chart</h1>
      <div className="card">
        <p>
          Chart Fabrics
        </p>
      </div>
    </>
  )
}

export default App
