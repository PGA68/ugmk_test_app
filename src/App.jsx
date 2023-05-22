import React, { useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { normalizeDB } from '@lib/fetchApi'
import { reducer } from '@lib/reducer'
import Main from './pages/Main.jsx'
import Pie from './pages/Pie.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

function App() {

  const [globalState, dispatch] = useReducer(reducer, {
    dataChart: {},
    pieChart: [],
    normalizeDB: {},
    currentOption: localStorage.getItem("filterValue") || 'setAllProducts'
  })

  useEffect(
    () => {
      let ignore = false
      normalizeDB().then(result => {
        !ignore && dispatch({ type: 'setNDB', nDB: result })
      })
      return () => ignore = true
    }, []
  )

  const schemrouter = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <>ERROR ROOT PAGE</>,
      id: 'root',
      loader: async props => { return { props, dispatch, globalState } }
    }, {
      path: "/detail/:FactoryID/:MonthNumber",
      element: <Pie />,
      errorElement: <>ERROR PIE PAGE</>,
      loader: async props => { return { props, dispatch, globalState } }
    }
  ])

  return (
    <React.StrictMode>
      <p className="read-the-docs"></p>
      <RouterProvider router={schemrouter} />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
