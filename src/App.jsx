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

const schemrouter = createBrowserRouter([{
  path: "/",
  element: <Main />,
  // loader: async (nope2) => { console.log("nope2 = ", nope2); return nope2 },
}, {
  path: "/detail/:FactoryID?/:MonthNumber?",
  element: <Pie />,
  loader: async ({ params: a }) => {
    console.log(a);
    return a
  }
}
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <p className="read-the-docs">
      Error top messages
    </p>
    <RouterProvider router={schemrouter} />
  </React.StrictMode>
)
