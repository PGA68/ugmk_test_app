import { lazy, memo, useState } from 'react'
import { Select, Space } from 'antd'
import LocaleProvider from 'antd/es/locale'

const Filter = memo(({ art, qwer, dispatch }) => {

  const [filterValueActive, setFilterValue] = useState(localStorage.getItem("filterValue") || 'setAllFactory')
  const [a, setA] = useState(art)
  const handleChange = filterValue => {
    localStorage.setItem("filterValue", filterValue)
    setFilterValue(filterValue)
    dispatch({ type: filterValue })
  }


  setTimeout(() => setA('down'), 5000)

  return (
    <Space wrap direction="horizontal" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      {/* <h4>{a}</h4> */}
      <label>
        Агрегация данных: {`${a} - - - `}
        <Select
          defaultValue={filterValueActive}
          style={{ width: 180, marginLeft: 'auto' }}
          onChange={handleChange}
          options={[
            { value: 'setAllFactory', label: 'Все производства' },
            { value: 'setFactory_1', label: 'Производство 1' },
            { value: 'setFactory_2', label: 'Производство 2' },
            { value: 'setFactory_3', label: 'Производство 3' },
          ]}
        />
      </label>
    </Space>
  )
}, (a, b) => {
  console.log('a = %o\nb = %o', a, b)
  return true
})

export default Filter
