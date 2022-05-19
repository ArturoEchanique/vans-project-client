import "./BecomeHostPage.css"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap"
import NewVanForm from "../../components/NewVanForm/NewVanForm";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from "react";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
    datasets: [
        {
            label: 'Jon',
            data: [600, 2000, 1000, 500, 600, 200, 2000, 500, 350, 600, 300, 2050],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Olivia',
            data: [800, 1500, 1300, 600, 300, 400, 3000, 1500, 1350, 800, 1200, 400],

            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Typical Earnings of our Hosts',
        },
    },
};



const BecomeHostPage = () => {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
    }


    return (
        <>
            <section id="section1">
                <Container fluid >
                    <Row  >
                        <Col lg={{ span: 12 }}  >
                            <Card className="bg-dark text-white">
                                <Card.Img src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905872/vans_project/photo-1629906771435-d0f397a1c910_gu6qby.jpg" alt="Card image" />
                                <Card.ImgOverlay id="sectiontext">
                                    <Card.Title>
                                        <h1>BECOME A HOST </h1>
                                    </Card.Title>
                                    <Card.Text>
                                        Start making an income from your camper home while doing <strong>nothing</strong>
                                    </Card.Text>
                                    <Button variant="dark" onClick={openModal}>
                                        Add a New Van
                                        {/* <Link to="/newvan">Add Your Van</Link> */}
                                    </Button>

                                </Card.ImgOverlay>
                            </Card>
                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add a New Van</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewVanForm fireFinalActions={fireFinalActions} />
                                </Modal.Body>
                            </Modal>
                        </Col>
                        {/* <Col lg={{ span: 12 }}  >
                            <Card className="bg-dark text-white">
                                <Card.Img src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905872/vans_project/photo-1629906771435-d0f397a1c910_gu6qby.jpg" alt="Card image" />
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
                        </Col> */}

                    </Row>
                </Container>
            </section>
            <section id="section2">
                <Container >
                    <h3>HOST STORIES</h3>
                    <Row xs={1} md={2} className="g-4">
                        <Col lg={{ span: 6 }}>
                            <Card id="card1">
                                <Card.Img variant="top" src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905911/vans_project/photo-1610851252127-85442ca5528e_qn0rcn.jpg" />
                                <Card.Body>
                                    <Card.Title>Jon</Card.Title>
                                    <Card.Text>
                                        After two years of renting my van i decided to quit my job and start my own business of camper van renting, it's been a long journey but i'm so happy now
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col lg={{ span: 6 }}>
                            <Card id="card2">
                                <Card.Img variant="top" src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905911/vans_project/photo-1610851252127-85442ca5528e_qn0rcn.jpg" />
                                <Card.Body>
                                    <Card.Title>Petter an jule</Card.Title>
                                    <Card.Text>
                                        We would highly recommend to start renting in Vanmeup it has completely changed or lifes
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={{ span: 6 }}>
                            <Card d="card4">
                                <Card.Img variant="top" src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905931/vans_project/photo-1557854457-8476b8551eed_gm999g.jpg" />

                            </Card>
                        </Col>

                        <Col lg={{ span: 6 }}>
                            <Card id="card3">
                                <Card.Body >
                                    <Card.Title>Olivia</Card.Title>
                                    <Card.Text >
                                        Thanks to vanmeup I can finally live my dream life and make money while traveling and enjoying my dream!!
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </section >
            <section id="section3">
                <Container>
                    <Row>
                        <Col lg={{ span: 10 }}>

                            <Bar options={options} data={data1} />

                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}

export default BecomeHostPage
