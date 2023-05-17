// 
import './Main.css'
import { Spin } from 'antd';
import Filter from '@cmp/Filter'
import { useEffect, Suspense, useReducer } from 'react'
import { useNavigate } from "react-router-dom"
import { useEffectOnce } from '@lib/useEffectOnce'
import { mockData2, normalizeDB } from '@lib/fetchApi'
import { reducer } from '@lib/reducer'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Main() {

  const metaEnv = import.meta.env
  const currentMode = metaEnv.MODE
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, { dataChart: mockData2, currentOption: localStorage.getItem("filterValue") || 'setAllProducts' })
  const clickOnGride = (evt) => {
    console.log('Gride = ', evt)
  }
  const clickOnBare = (evt) => {
    console.log('Bare = ', evt)
  }
  const clickOnFactory = (evt) => {
    const factory_id = evt.tooltipPayload[0].dataKey.slice(-1)
    const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'].indexOf(evt.date.slice(0, 3))
    // console.log('Factory = %o\nURI = %s', evt, `/detail/${factory_id}/${month}`)
    navigate(`/detail/${factory_id}/${month}`)
  }

  useEffectOnce(() => {
    normalizeDB().then(result => dispatch({ type: 'setNDB', nDB: result }))//setDataChart(result))
    // console.log('import.meta.env = ', metaEnv)
    console.log('MY EFFECTONCE IS RUNNING')
    return () => console.log('MY EFFECTONCE IS DESTROYING')
  }, [])

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
              onClick={clickOnBare}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" onClick={clickOnGride} />
              <XAxis dataKey="date" />
              <YAxis unit=' т' width={70} tickCount={10} />
              <Tooltip />
              <Legend />
              <Bar style={{ cursor: 'pointer' }} dataKey="factory_id_1" onClick={clickOnFactory} fill="#fc0000" name="Производство 1" />
              <Bar style={{ cursor: 'pointer' }} dataKey="factory_id_2" onClick={clickOnFactory} fill="#0000fe" name="Производство 2" />
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
