import {memo, useContext, useMemo} from "react";
import {Context} from "../context";
import Storage from '../handlers/storage'
import { addImage, getImages } from "../handlers/firestore";
const Preview = ({path}) => {
    return (
        <div
            className="rounded p-1 m-5"
            style={{
                width: "30%",
                height: "300px",
                backgroundImage: `url(${path}`,
                backgroundSize: "cover",
            }}
        ></div>
    );
};

const UploadForm = ({ userId }) => {
    const {state, dispatch} = useContext(Context)

    const collapse = () => dispatch({
        type: 'setIsVisible'
    })
    const handleInputChange = (event) => {
        return dispatch({
            type: 'setInput',
            payload: {
                event
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        Storage.uploadFile(state.input)
            .then(Storage.downloadFile)
            .then(path => {
                addImage({
                    ...state.input,
                    path,
                    userId
                }, 'stocks').then(() => {
                    dispatch({ type: 'setInput' })
                    getImages().then((items) => {
                        dispatch({ type: 'setItems', payload: { items } })
                    })
                    collapse()
                })
            })
    }

    const isDisabled = useMemo(() => {
        return Object.values(state.input).some((value) => !value)
    },[state.input])

    return (
        <>
            <button className="btn btn-primary" onClick={ collapse }>{state.isVisible ? 'Close': 'Upload'}</button>
            {
                state.isVisible &&  <>
                    <p className="display-6 text-center mb-3">Upload Stock Image</p>

                    <div style={{display: 'flex'}}>
                        <Preview path={state.input.path}/>
                        <div className="mb-5 d-flex align-items-center justify-content-center">
                            <form className="mb-2" style={{ textAlign: "left" }}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="title"
                                        aria-describedby="text"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input  type="file" className="form-control" name="file" onChange={handleInputChange}/>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success float-end"
                                    onClick={handleSubmit}
                                    disabled={isDisabled}
                                >
                                    Save changes and upload
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    );
};


const MemoizedUploadForm = memo(UploadForm)

export default MemoizedUploadForm



