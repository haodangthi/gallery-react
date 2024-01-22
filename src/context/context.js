import { createContext, useReducer } from "react";

const initialState = {
    input: {
        file: null,
        path: null,
        title: null,
    },
    items: [],
    shownItems: [],
    userItems: [],
    isVisible: false,
    searchFilter: ''
}

const setInputs = (event, input) => {
    if (!event || !input) {
        return {
            title: null,
            file: null,
            path: null
        }
    }

    event.preventDefault()

    if (event.target.name === 'file') {
        const newFile = event.target.files[0];

        return {
            ...input,
            file: newFile,
            path: URL.createObjectURL(newFile)
        }
    } else {
        return {
            ...input,
            title: event.target.value
        }
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setItems':
            const filteredItems = (action.payload?.items || state.items).filter(item => item.title.includes(state.searchFilter))

            return {
                ...state,
                items: action.payload?.items || state.items,
                shownItems: filteredItems
            }
        case 'setSearchFilter':
            const searchFilter = action.payload.filter

            return {
                ...state,
                searchFilter,
            }
        case 'setUserItems':
            const filteredUserItems = (action.payload?.items || state.userItems).filter(item => item.title.includes(state.searchFilter))

            return {
                ...state,
                userItems: action.payload?.items || state.userItems,
                shownItems: filteredUserItems
            }
        case 'setItem':
            return {
                ...state,
                items: [{
                    ...state.inputs,
                    path: action.payload.path
                }, ...state.items],
                count: state.items.length + 1,
                input: { title: null, file: null, path: null}
            }
        case 'setIsVisible':
            return {
                ...state,
                isVisible: !state.isVisible
            }
        case 'setInput':
            return {
                ...state,
                input: setInputs(action?.payload?.event, state.input)
            }
    }
}

export const Context = createContext(initialState)

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (<Context.Provider value={{ state, dispatch }}> { children }</Context.Provider>)
}

export default Provider