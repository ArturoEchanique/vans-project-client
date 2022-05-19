import "./BecomeHostPage.css"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Card } from "react-bootstrap"

const BecomeHostPage = () => {
    return (
        <>
            <Container id="section1">

                {/* <Row   >
                        <Col lg={{ span: 12 }}  >
                            <Card className="bg-dark text-white">
                                <Card.Img src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905931/vans_project/photo-1557854457-8476b8551eed_gm999g.jpg" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title>
                                        <h1>BECOME A HOST </h1>
                                    </Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                    <Button variant="dark">
                                        <Link to="/newvan">Add a van</Link>
                                    </Button>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    </Row> */}
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

                {/* <BarChart data={[10, 20, 30]} /> */}
            </Container>
        </>
    )
}

export default BecomeHostPage
