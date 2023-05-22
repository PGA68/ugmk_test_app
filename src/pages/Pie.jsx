//
import { useEffect, useCallback, useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import { PieChart, Pie as Pi, Cell, ResponsiveContainer, Legend } from 'recharts';

function Pie() {
  const [pieData, setPieData] = useState([])
  const { globalState, props } = useLoaderData()
  const { FactoryID = 0, MonthNumber = 0 } = props?.params
  const { normalizeDB: nDB } = globalState

  if (FactoryID > 2 || FactoryID == 0 || MonthNumber > 12 || MonthNumber == 0)
    return (<><h2>Params Error</h2></>)

  const COLORS = ['#008001', '#fea500', '#c864bd']
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
  }, [MonthNumber, FactoryID])

  const strTag = (strs, F, M) => {
    const nameFactory = ['0', 'А', 'Б'][F]
    const month = 'январь февраль март апрель май июнь июль август сентябрь октябрь ноябрь декабрь'.split(' ')[M-1]
    return `${nameFactory}${strs[1]}${month}`
  }

  useEffect(() => {
    if (Object.keys(nDB).length > 0) {
      const MonthN = 10 + Number(MonthNumber)
      let accProd = [0, 0, 0]
      for (let day = 11; day < 23; day++) {
        const nodeData = nDB[`2022${MonthN}${day}`] ? nDB[`2022${MonthN}${day}`][[1, 'factory_1', 'factory_2'][FactoryID]] : false
        if (nodeData) {
          ['product_1', 'product_2', 'product_3'].forEach(
            (prod, ix) => {
              accProd[ix] += nodeData[prod]
            }
          )
        }
      }
      modifyPie(accProd)
    }
  }, [])

  return (
    <>
      <h3>Статистика продукции фабрики {strTag`${FactoryID} за ${MonthNumber}`}</h3>
      <div className="card">
        <ResponsiveContainer width="100%" height="100%" aspect={1.2}>
          <PieChart>
            <Pi
              data={pieData}

              label
              labelLine={false}

              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pi>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Pie
