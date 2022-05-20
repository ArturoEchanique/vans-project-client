

const VanDetailsCard = ({ imageUrl, dayPrice, name, description }) => {
    const imageList = imageUrl?.map((img) => {
        return (
            <div style={{ width: "15rem" }}>
                <img src={img} />
            </div>
        )
    })
    return (
        <>
            <h1>Van name: {name}</h1>
            <section>{imageList}</section>
            <section>
                <p>day price:{dayPrice}€</p>
                <p>description: {description}</p>
            </section>
        </>
    )
}

export default VanDetailsCard
