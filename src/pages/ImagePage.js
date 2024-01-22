import { useLocation, useNavigate } from "react-router-dom";

function ImagePage() {
    const { state: item } = useLocation()
    const navigate = useNavigate()

    return (
        item && <>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/', { replace: true })}>Go back</button>

            <div className="card gallery-card">
                <img className="card-img-top" src={item.path} alt="Card image cap"/>
                    <div className="card-body">
                        <h1 className="card-text">{item.title}</h1>
                    </div>
            </div>
        </>
    )
}


export default ImagePage;