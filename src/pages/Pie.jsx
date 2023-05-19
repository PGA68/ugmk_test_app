import { useEffect, useCallback, useMemo, useLayoutEffect, useState } from 'react';
import './Pie.css'
import { useEffectOnce } from '@lib/useEffectOnce'
import { useParams, useRouteLoaderData, useLoaderData, } from 'react-router-dom'
import { PieChart, Pie as Pi, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

function Pie() {
  console.log('PIE Meta = ', import.meta.env)
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const [ pieData, setPieData ] = useState([])
  const { dispatch, globalState, props } = useLoaderData()
  const { FactoryID = 0, MonthNumber = 0 } = props?.params
  const { normalizeDB: nDB, pieChart } = globalState

  if (FactoryID > 2 || FactoryID == 0 || MonthNumber > 12 || MonthNumber == 0)
    return (<><h2>Params Error</h2></>)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const modifyPie = useCallback((accProd) => {

    const mashData = [
      { name: 'Продукт 1', value: 0 },
      { name: 'Продукт 2', value: 0 },
      { name: 'Продукт 3', value: 0 }
  ]
  for (let [i, val] of accProd.entries()) {
      mashData[i].value = val
  }
    setPieData(mashData)
    console.log('In =====================')
  }, [MonthNumber, FactoryID])

const strTag = (strs, F, M) => {
  const nameFactory = ['0', 'A', 'B'][F]
  const month = 'январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь'.split(' ')[M]
  return `${nameFactory}${strs[1]}${month}`

}

  useEffectOnce(() => {
    console.log('PIE-------------\n################\nFactoryID = %o\nMonthNumber = %o\nDB = ', FactoryID, MonthNumber, nDB)
    if (Object.keys(nDB).length > 0) {
      const MonthN = 10 + Number(MonthNumber)
      let accProd = [0, 0, 0] // prod_1, prod_2, prod_3
      for (let day = 11; day < 23; day++) {
        const nodeData = nDB[`2022${MonthN}${day}`] ? nDB[`2022${MonthN}${day}`][[1, 'factory_1', 'factory_2'][FactoryID]] : false
        if (nodeData) {
          ['product_1', 'product_2', 'product_3'].forEach(
            (prod, ix) => {
              accProd[ix] += nodeData[prod]
            }
          )
          console.log('nodeData = %o\naccProd = %o', nodeData, accProd)
        }
      }
      modifyPie(accProd)
    }
  }, [])

  return (
    <>
      <h4>Статистика продукции фабрики {strTag`${FactoryID} за месяц ${MonthNumber}`}</h4>
      <div className="card" style={{ width: '800px', height: '600px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={800} height={600}>
            <Pi
              data={pieData}
              cx="50%"
              cy="50%"
              label
              labelLine={false}
              // label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pi>
            <Legend  style={{'margin':'50px', 'padding':'20px'}}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Pie