// 
import './Main.css'
import { Spin } from 'antd';
import Filter from '@cmp/Filter'
import { useEffect, Suspense, useReducer } from 'react'
import { useEffectOnce } from '@lib/useEffectOnce'
import { mockData2, normalizeDB } from '@lib/fetchApi'
import { reducer } from '@lib/reducer'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Main() {

  const metaEnv = import.meta.env
  const currentMode = metaEnv.MODE
  const [state, dispatch] = useReducer(reducer, { dataChart: mockData2, currentOption: localStorage.getItem("filterValue") || 'setAllProducts' })

  useEffectOnce(() => {
    normalizeDB().then(result => dispatch({ type: 'setNDB', nDB: result }))//setDataChart(result))
    console.log('import.meta.env = ', metaEnv)
    console.log('MY EFFECTONCE IS RUNNING');
    return () => console.log('MY EFFECTONCE IS DESTROYING');
  }, []);

  return (
    <>
      <Filter {...{ dispatch }} activeValue={state.currentOption} />

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
              <YAxis unit=' Тн' width={70} tickCount={10} />
              <Tooltip />
              <Legend />
              <Bar dataKey="factory_id_1" fill="#fc0000" name="Производство 1" />
              <Bar dataKey="factory_id_2" fill="#0000fe" name="Производство 2" />
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
