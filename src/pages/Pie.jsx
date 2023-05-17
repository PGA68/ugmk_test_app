import './Pie.css'
import { useParams, useRouteLoaderData, useLoaderData, } from 'react-router-dom'
import { PieChart, Pie as Pi, Sector, Cell, ResponsiveContainer } from 'recharts';


function Pie() {
  // const [count, setCount] = useState(0)
  console.log(import.meta.env)
  const user = useRouteLoaderData("root");
  const albome = useLoaderData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
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

  console.log('USER = %o/nALBOME = %o', user, albome)

  return (
    <>
      <h1>Pie Chart</h1>
      <div className="card" style={{ width: '800px', height: '700px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pi
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pi>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Pie