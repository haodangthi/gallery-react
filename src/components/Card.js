function Card(props) {
    console.log('Card')
    return (
        <div className="col mb-5">
            <div className="card" style={{width: "18rem"}}>
                <img src={props.src.path} className="card-img-top" alt={props.key}/>
            </div>
        </div>
    );
}

export default Card;