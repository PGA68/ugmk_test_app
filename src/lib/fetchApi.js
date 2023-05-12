
/**
 * Requests data from the specified API. 
 * @param {string} apiURL - The URL to request data from
 * @param {object} params - An optional
*/
export async function fetchAPI(apiURL, params = {}) {
    const response = await fetch(apiURL, params)
    const jsonData = await response.json()
    const { status, statusText } = response
    return { jsonData, status, statusText }
}

export async function normalizeDB() {
    const date2string = date => date.toLocaleString("ru", { month: "long", year: "numeric" })
    const date2hash = date => Number(`${date.getFullYear()}${date.getMonth() + 11}${date.getDate() + 10}`)
    let acc

    return await fetchAPI(import.meta.env.VITE_API_HOST, { headers: { "Content-Type": "application/json" } })
        .then(({ status, statusText, jsonData }) => {
            console.log('Status = %s \tStatusText = %s \nJsonData = %o', status, statusText, jsonData)
            acc = jsonData.reduce(
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
            console.log('acc intu = ', acc)
            return acc
        })
}


export const mockData1 = [
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
]

export const mockData2 = [
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
]