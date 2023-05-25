
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

    return await fetchAPI(import.meta.env.VITE_API_HOST, { headers: { "Content-Type": "application/json", "cache": "force-cache" } })
        .then(({ status, statusText, jsonData }) => {
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
                    return a
                }, {},
            )
            return acc
        })
}

