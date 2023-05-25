// 
import './Main.css'
import Filter from '@cmp/Filter'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Main() {
  const album = useLoaderData();
  const { dispatch, globalState } = album
  const navigate = useNavigate()
  const monthArrayShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  const clickOnFactory = (evt) => {
    const factory_id = evt.tooltipPayload[0].dataKey.slice(-1)
    const month = 1 + monthArrayShort.indexOf(evt.date.slice(0, 3))
    navigate(`/detail/${factory_id}/${month}`)
  }

  return (
    <div className="card">
      <Filter {...{ dispatch }} activeValue={globalState.currentOption} />
      <ResponsiveContainer className="respBarCont" width="100%" height="100%" aspect={1.6}>
        <BarChart className="barBox"
          data={globalState.dataChart}
          margin={{
            top: 25,
            right: 70,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=' т' width={70} tickCount={10} />
          <Tooltip />
          <Legend width={'100%'} />
          <Bar style={{ cursor: 'pointer' }} dataKey="factory_id_1" onClick={clickOnFactory} fill="#fc0000" name="Фабрика А " />
          <Bar style={{ cursor: 'pointer' }} dataKey="factory_id_2" onClick={clickOnFactory} fill="#0000fe" name="Фабрика Б" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Main
