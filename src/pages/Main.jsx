// 
import './Main.css'
import { Spin } from 'antd';
import Filter from '@cmp/Filter'
import { useEffect, Suspense } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { useEffectOnce } from '@lib/useEffectOnce'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Main() {

  const album = useLoaderData();
  const { dispatch, globalState } = album
  const metaEnv = import.meta.env
  const currentMode = metaEnv.MODE
  const navigate = useNavigate()

  const clickOnFactory = (evt) => {
    const factory_id = evt.tooltipPayload[0].dataKey.slice(-1)
    const month = 1 + ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'].indexOf(evt.date.slice(0, 3))
    // console.log('Factory = %o\nURI = %s', evt, `/detail/${factory_id}/${month}`)
    navigate(`/detail/${factory_id}/${month}`)
  }

  useEffectOnce(() => {
    console.log('globalState = ', globalState)
    // console.log('import.meta.env = ', metaEnv)
    console.log('MY EFFECTONCE IS RUNNING = ', album)
    return () => console.log('MY EFFECTONCE IS DESTROYING')
  }, [])

  return (
    <>
      <Filter {...{ dispatch }} activeValue={globalState.currentOption} />
      <div className="card" style={{ width: '800px', height: '700px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <Suspense fallback={<Spin />}>
            <BarChart
              width={800}
              height={500}
              data={globalState.dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit=' т' width={70} tickCount={10} />
              <Tooltip />
              <Legend  style={{'margin':'50px', 'padding':'20px'}}/>
              <Bar style={{ cursor: 'pointer' }} dataKey="factory_id_1" onClick={clickOnFactory} fill="#fc0000" name="Фабрика 1" />
              <Bar style={{ cursor: 'pointer' }} dataKey="factory_id_2" onClick={clickOnFactory} fill="#0000fe" name="Фабрика 2" />
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
