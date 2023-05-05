// 

import './Main.css'
import { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import { fetchAPI } from '@lib/fetchApi'
import { useEffectOnce } from '@lib/useEffectOnce'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Main() {
  const [dataChart, setDataChart] = useState([
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

  useEffect(() => {
    fetchAPI(import.meta.env.VITE_API_HOST, { headers: { "Content-Type": "application/json" } })
      .then(resume => {
        console.log('Status = %s \nStatusText = %s \nJsonData = %o', resume.status, resume.statusText, resume.jsonData)
        // setDataChart(resume.jsonData)
      })


    console.log(import.meta.env)
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
      <div className="card" style={{'width':'800px', 'height':'700px'}}>
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
        <p>
          Mode is {currentMode}
        </p>
      </div>
    </>
  )
}

export default Main
