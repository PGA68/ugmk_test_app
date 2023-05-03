import './Main.css'

function Main() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <select name="filter">
          <option value="All">Всё</option>
        </select>
      </div>
      <h1>Bare Chart</h1>
      <div className="card">
        <p>
          Chart Fabrics A & B
        </p>
      </div>
    </>
  )
}

export default Main