import { createContext, useReducer } from "react";

const initialState = {
    input: {
        file: null,
        path: null,
        title: null,
    },
    items: [],
    userItems: [],
    isVisible: false
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
            const items = action.payload.items
            return {
                ...state,
                items,
                count: items.length,
            }
        case 'setUserItems':
            const userItems = action.payload.items
            return {
                ...state,
                userItems
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