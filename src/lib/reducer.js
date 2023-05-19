//

export const reducer = (globalState, action) => {
    console.log('Reducer --->\nglobalState = %o\naction = %o', globalState, action)
    return ({
        'setAllProducts': () => {
            console.log(action)
            console.log(globalState)
            return {
                ...globalState,
                currentOption: action.type,
                dataChart: rechartData(action.type, globalState.normalizeDB)
            }
        },
        'setProduct_1': () => {
            console.log(action)
            console.log(globalState)
            return {
                ...globalState,
                currentOption: action.type,
                dataChart: rechartData(action.type, globalState.normalizeDB)
            }
        },
        'setProduct_2': () => {
            console.log(action)
            console.log(globalState)
            return {
                ...globalState,
                currentOption: action.type,
                dataChart: rechartData(action.type, globalState.normalizeDB)
            }
        },
        'setProduct_3': () => {
            console.log(action)
            console.log(globalState)
            return {
                ...globalState,
                currentOption: action.type,
                dataChart: rechartData(action.type, globalState.normalizeDB)
            }
        },
        'setNDB': () => {
            console.log(action)
            console.log(globalState)
            return {
                ...globalState,
                normalizeDB: action.nDB,
                dataChart: rechartData(globalState.currentOption, action.nDB)
            }
        }
    })[action.type]()
}

const rechartData = (actionName, nDB) => {

    const resultData = Object.values(Object.values(nDB).reduce((a, b) => {
        if (b.localeDate !== 'Invalid Date' && b.localeDate !== 'январь 1970 г.') {
            let oldState
            switch (actionName) {
                case 'setAllProducts':
                    oldState = a[b.localeDate] || { factory_id_1: 0, factory_id_2: 0, date: b.localeDate }
                    oldState.factory_id_1 += b.factory_1.product_1 + b.factory_1.product_2 + b.factory_1.product_3
                    oldState.factory_id_2 += b.factory_2.product_1 + b.factory_2.product_2 + b.factory_2.product_3
                    break
                case 'setProduct_1':
                    oldState = a[b.localeDate] || { factory_id_1: 0, factory_id_2: 0, date: b.localeDate }
                    oldState.factory_id_1 += b.factory_1.product_1
                    oldState.factory_id_2 += b.factory_2.product_1
                    break
                case 'setProduct_2':
                    oldState = a[b.localeDate] || { factory_id_1: 0, factory_id_2: 0, date: b.localeDate }
                    oldState.factory_id_1 += b.factory_1.product_2
                    oldState.factory_id_2 += b.factory_2.product_2
                    break
                case 'setProduct_3':
                    oldState = a[b.localeDate] || { factory_id_1: 0, factory_id_2: 0, date: b.localeDate }
                    oldState.factory_id_1 += b.factory_1.product_3
                    oldState.factory_id_2 += b.factory_2.product_3
                    break
                default:
                    console.log('Default Switch case')
            }
            // console.log('a = %o\nb = %o\nc = %o', a, b, c)
            oldState.factory_id_1 = parseFloat((oldState.factory_id_1 / 1000).toFixed(6))
            oldState.factory_id_2 = parseFloat((oldState.factory_id_2 / 1000).toFixed(6))
            a[b.localeDate] = oldState
        }

        return a
    }, {}))
    console.log('resultData = ', resultData)
    return resultData
}