import { Navbar, Container, Nav, Modal, Button, Card } from "react-bootstrap";

import { Link, NavLink } from "react-router-dom";

const VanDetailsCard = ({ imageUrl, dayPrice, name, description }) => {
    return (
        <>
            <h1>Van name: {name}</h1>
            <hr />
            <img src={imageUrl} alt={name} />
            <section>
                <p>day price:{dayPrice}</p>
                <p>description: {description}</p>
            </section>
        </>
    );
};

export default VanDetailsCard;
