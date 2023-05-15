// 

import './Main.css'
import { Spin } from 'antd';
import Filter from '@cmp/Filter'
import { useState, useEffect, Suspense, useReducer } from 'react'
import { useEffectOnce } from '@lib/useEffectOnce'
import { mockData1, mockData2, normalizeDB } from '@lib/fetchApi'
import { reducer } from '@lib/reducer'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Main() {
  const [dataChart0, setDataChart0] = useState(mockData1)
  // const [dataChart, setDataChart] = useState(mockData2)
  const metaEnv = import.meta.env
  const currentMode = metaEnv.MODE

  const [state, dispatch] = useReducer(reducer, { dataChart: mockData2, currentOption: localStorage.getItem("filterValue") || 'setAllFactory' })

  useEffectOnce(() => {
    normalizeDB().then(result => dispatch({ type: 'setNDB', nDB: result }))//setDataChart(result))
    console.log('import.meta.env = ', metaEnv)
    console.log('MY EFFECTONCE IS RUNNING');
    return () => console.log('MY EFFECTONCE IS DESTROYING');
  }, []);

  return (
    <>
      <Filter {...{ dispatch }} activeValue={state.currentOption} />
      <h1>Bare Chart {state.e}</h1>
      <div className="card" style={{ width: '800px', height: '700px' }}>

        <ResponsiveContainer width="100%" height="100%">
          <Suspense fallback={<Spin />}>
            <BarChart
              width={800}
              height={500}
              data={dataChart0}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Suspense>
        </ResponsiveContainer>

      </div>

      <div className="card" style={{ width: '800px', height: '700px' }}>

        <ResponsiveContainer width="100%" height="100%">
          <Suspense fallback={<Spin />}>
            <BarChart
              width={800}
              height={500}
              data={state.dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="factory_id_1" fill="#8884d8" />
              <Bar dataKey="factory_id_2" fill="#82ca9d" name="Шива" textAnchor='Фабрика 2' label="d" textRendering="r" />
            </BarChart>
          </Suspense>
        </ResponsiveContainer>

      </div>

      <p>
        Mode is {currentMode}
      </p>

    </>
  )
}

export default Main
