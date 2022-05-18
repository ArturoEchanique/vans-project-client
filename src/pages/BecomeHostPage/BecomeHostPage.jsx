import "./BecomeHostPage.css"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

const BecomeHostPage = () => {
    return (
        <>
            <Container>
                <section className=" section firstSection alignCenter ">
                    <Row>
                        <Col className="">
                            <h1>BECOME A HOST </h1>
                        </Col>
                        <Col>
                            <Button variant="dark">
                                <Link to="/newvan">Add a van</Link>
                            </Button>
                        </Col>
                    </Row>
                </section>
                <section className="section ">
                    <h3>why you shoud be a host </h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolores cum similique, iste ullam commodi impedit excepturi velit suscipit dolorum saepe exercitationem,
                        dicta cumque ratione optio voluptatem quod, obcaecati alias!
                    </p>
                </section>
                <section className="section">
                    <h3>This coud be your van</h3>

                    <p>here we put our best vans or something like this </p>
                </section>
            </Container>
        </>
    )
}

export default BecomeHostPage
