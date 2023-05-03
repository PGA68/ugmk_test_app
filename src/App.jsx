import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './pages/Main.jsx'
import Pie from './pages/Pie.jsx'
import { Spin } from 'antd'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

// import Root, { rootLoader } from "./routes/root";
// import Team, { teamLoader } from "./routes/team"

const router = createBrowserRouter([{
  path: "/",
  element: <Main />,
  children: [
    {
      path: "pie/:id",
      element: <Pie />
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <p className="read-the-docs">
      Error top messages
    </p>

    <Main />

    <Spin />
  </React.StrictMode>
)
