// 

import './Main.css'
import { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import { fetchAPI } from '@lib/fetchApi'
import { useEffectOnce } from '@lib/useEffectOnce'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Main() {

  const date2string = date => date.toLocaleString("ru", { month: "long", year: "numeric" })
  const date2hash = date => Number(`${date.getFullYear()}${date.getMonth() + 11}${date.getDate() + 10}`)
  const filterValue = localStorage.getItem("filterValue") || 'All'

  const [filterCase, setFilterCase] = useState()
  const [baseDate, setBaseDate] = useState()
  const [dataChart0, setDataChart0] = useState([
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ])

  const [dataChart, setDataChart] = useState([
    {
      date: 'Март 2004',
      factory_id_1: 200,
      factory_id_2: 400
    },
    {
      date: 'Апрель 2004',
      factory_id_1: 400,
      factory_id_2: 200
    },
    {
      date: 'Май 2004',
      factory_id_1: 100,
      factory_id_2: 100
    },
  ])

  useEffectOnce(() => {
    fetchAPI(import.meta.env.VITE_API_HOST, { headers: { "Content-Type": "application/json" } })
      .then(({ status, statusText, jsonData }) => {
        console.log('Status = %s \tStatusText = %s \nJsonData = %o', status, statusText, jsonData)

        let acc = jsonData.reduce(
          (a, b) => {

            const factory = ['factory_1', 'factory_2'][b.factory_id - 1]
            const milliSec = new Date(b.date)
            const hashDate = date2hash(milliSec)

            a[hashDate] ??= Object.create({
              localeDate: date2string(milliSec),
              factory_1: {
                product_1: 0,
                product_2: 0,
                product_3: 0
              },
              factory_2: {
                product_1: 0,
                product_2: 0,
                product_3: 0
              }
            })

            if (b.product1) a[hashDate][factory].product_1 += b.product1
            if (b.product2) a[hashDate][factory].product_2 += b.product2
            if (b.product3) a[hashDate][factory].product_3 += b.product3
            // console.log('a = %o\nb = %o', a, b)
            return a
          }, {},
        )
        console.log('acc = ', acc)
        setBaseDate(acc)
      })


    console.log('import.meta.env = ', import.meta.env)
    console.log('my effectOnce is running');
    return () => console.log('my effectOnce is destroying');
  }, []);

  const currentMode = import.meta.env.MODE

  // const handlerFilter = (evt) => {
  //   console.log(evt.target.value);
  // }

  return (
    <>
      {/* <div>
        <select name="filter" onChange={handlerFilter}>
          <option value="All">Всё</option>
          <option value="First">Первый</option>
          <option value="Second">Второй</option>
          <option value="Third">Третий</option>
        </select>
      </div> */}
      <Space wrap>
        <Select
        />
      </Space>
      <h1>Bare Chart</h1>
      <div className="card" style={{ width: '800px', height: '700px' }}>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
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
        </ResponsiveContainer>

      </div>

      <div className="card" style={{ width: '800px', height: '700px' }}>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dataChart}
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
            <Bar dataKey="factory_id_2" fill="#82ca9d" name="ываыва" textAnchor='Фабрика 2' label="d" textRendering="r" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <p>
        Mode is {currentMode}
      </p>

    </>
  )
}

export default Main
