import { lazy, memo, useEffect, useState } from 'react'
import { Select, Space } from 'antd'

const Filter = memo(({ dispatch, activeValue }) => {

  // const [filterValueActive, setFilterValue] = useState(localStorage.getItem("filterValue") || 'setAllProducts')

  const handleChange = filterValue => {
    localStorage.setItem("filterValue", filterValue)
    // setFilterValue(filterValue)
    dispatch({ type: filterValue })
  }

  return (
    <Space wrap direction="horizontal" style={{
      width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '8px',
      border: '1px solid #777', borderRadius: '8px'
    }}>
      {/* <h4>{activeValue}</h4> */}
      <label style={{padding:'4px'}}>
        Фильтр по типу продукции :
        <Select
          defaultValue={activeValue}
          style={{ width: 180, margin: '0 0 0 20px ', }}
          onChange={handleChange}
          options={[
            { value: 'setAllProducts', label: 'Все продукты' },
            { value: 'setProduct_1', label: 'Продукт 1' },
            { value: 'setProduct_2', label: 'Продукт 2' },
            { value: 'setProduct_3', label: 'Продукт 3' },
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
