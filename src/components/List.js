import Card from "./ui/Card";

function List({ items }) {
    return (
        <>
            <div className="row">
                {
                    items.map( (item, index) => {
                        return (
                            <Card item={item} key={index}/>
                        );
                    })
                }
            </div>
        </>
    )
}

export default List