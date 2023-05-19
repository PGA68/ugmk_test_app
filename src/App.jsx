import React, { useState, useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { normalizeDB } from '@lib/fetchApi'
import { useEffectOnce } from '@lib/useEffectOnce'
import { reducer } from '@lib/reducer'
import Main from './pages/Main.jsx'
import Pie from './pages/Pie.jsx'
import { Spin } from 'antd'
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

  useEffectOnce(
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
      id: 'root',
      loader: async props => { console.log("props = ", props); return { props, dispatch, globalState } },
    }, {
      path: "/detail/:FactoryID/:MonthNumber",
      element: <Pie />,
      loader: async props => {
        console.log('LOADER PIE SEND = ', props);
        return {props, dispatch, globalState}
        errorElement: <>ERROR</>
      }
    }
  ])

  return (
    <React.StrictMode>
      <p className="read-the-docs">
        Error top messages
      </p>
      <RouterProvider router={schemrouter} />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
