import {useContext, useMemo} from "react";
import {Context} from "../context";
import Storage from '../handlers/storage'
import Firestore from "../handlers/firestore";
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

export const UploadForm = ({collapse}) => {
    const {state, dispatch} = useContext(Context)

    console.log('upload Form')
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
                Firestore.writeDoc({
                    ...state.input,
                    path
                }, 'stocks').then(() => {
                    dispatch({
                        type: 'setItem',
                        payload: {
                            path
                        }
                    })
                    collapse()
                })
            })
    }

    const isDisabled = useMemo(() => {
        return Object.values(state.input).some((value) => !value)
    },[state.input])

    return (
        state.isVisible &&   <>
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
    );
};




