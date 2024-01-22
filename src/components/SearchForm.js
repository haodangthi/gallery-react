import {useContext, useEffect, useState} from "react";
import {Context} from "../context";
import {useDebounce} from "../hooks/useDebounce";

export function SearchForm() {
    const { dispatch } = useContext(Context)
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue)

    const handleOnChange = (event) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        dispatch({ type: 'setSearchFilter', payload: { filter: debouncedValue } })
        dispatch({ type: 'setItems' })
        dispatch({ type: 'setUserItems' })
    }, [debouncedValue])

    return (
        <form className="d-flex" role="search">
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleOnChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
}