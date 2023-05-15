//

export const reducer = (state, action) => {
    console.log('Reducer --->\nstate = %o\naction = %o', state, action)
    return ({
        'setAllFactory': () => {
            console.log(action)
            console.log(state)
            return {
                ...state,
                currentOption: action.type,
                dataChart: fix(action)
            }
        },
        'setFactory_1': () => {
            console.log(action)
            console.log(state)
            return {
                ...state,
                currentOption: action.type,
                dataChart: fix(action)
            }
        },
        'setFactory_2': () => {
            console.log(action)
            console.log(state)
            return {
                ...state,
                currentOption: action.type,
                dataChart: fix(action)
            }
        },
        'setFactory_3': () => {
            console.log(action)
            console.log(state)
            return {
                ...state,
                currentOption: action.type,
                dataChart: fix(action)
            }
        },
        'setNDB': () => {
            console.log(action)
            console.log(state)
            return {
                ...state,
                normalizeDB: action.nDB,
                dataChart: rechartData(state.currentOption, action.nDB)
            }
        }
    })[action.type]()
}

const fix = (act) => console.log('RUN FIX = ', act)

const rechartData = (actionName, nDB) => {
    return []
}