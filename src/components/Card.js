import {Link, useNavigate} from "react-router-dom";

function Card({ item }) {
    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate(`/image/${item.id}`, { state : item })
    }

    return (
        <div className="col mb-5" onClick={handleOnClick}>
            <div className="card gallery-card">
                <div className="gallery-card__container">
                    <img src={item.path} className="card-img-top" alt='gallery-item'/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <Link
                        className="btn btn-primary"
                        to={`image/${item.id}`} userData={item} >Go to Image page</Link>
                </div>
            </div>
        </div>
    );
}

export default Card;