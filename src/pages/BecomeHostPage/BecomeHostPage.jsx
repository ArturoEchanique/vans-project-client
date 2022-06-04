import "./BecomeHostPage.css"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap"
import NewVanForm from "../../components/NewVanForm/NewVanForm"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import Loginform from "../../components/LoginForm/LoginForm"
import Image from "react-bootstrap/Image"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            label: "Jon",
            data: [600, 2000, 1000, 1500, 600, 1200, 2000, 1500, 1350, 1600, 1300, 2050],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Olivia",
            data: [800, 1500, 1300, 600, 1300, 1400, 3000, 1500, 1350, 1800, 1200, 1400],

            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
}
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Typical Earnings of our hosts",
        },
    },
}

const BecomeHostPage = () => {
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [showModals, setShowModals] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const showLoginModal = () => setShowModals(true)
    const closeLoginModal = () => setShowModals(false)

    const fireFinalActions = () => {
        closeModal()
    }

    return (
        <>
            <section id="section1">
                <Container fluid>
                    <Row>
                        <Col id="title" lg={{ span: 6 }} md={{ span: 12 }} style={{ padding: "0px 60px" }}>
                            <h1>This wouldn't be possible without you.</h1>
                            {isLoggedIn ? (
                                <button style={{ width: "250px" }} onClick={openModal} className="vanmeupButton mb-4" variant="light">
                                    <strong>Add your Van now</strong>
                                </button>
                            ) : (
                                <button style={{ width: "250px" }} onClick={showLoginModal} className="vanmeupButton mb-4" variant="light">
                                    <strong>Add your Van now</strong>
                                </button>
                            )}
                        </Col>

                        <Col id="ib" lg={{ span: 6 }} md={{ span: 12 }}></Col>
                    </Row>
                </Container>
            </section>

            <Container fluid>
                <section id="section2">
                    <h2>Book anything, book anywhere</h2>
                    <Row>
                        <Col lg={{ span: 6 }} style={{ padding: "0px" }}>
                            <Image id="im" src="https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652905911/vans_project/photo-1610851252127-85442ca5528e_qn0rcn.jpg" />
                        </Col>
                        <Col lg={{ span: 6 }} style={{ padding: "0px" }}>
                            <Image
                                id="im"
                                src="https://img.freepik.com/free-photo/one-man-sitting-relaxing-inside-camper-van-motor-home-dinette-vanlife-lifestyle-travel-modern-people-holiday-vacation-with-van-alternative-tourist-explorers-beach-view_425263-5074.jpg?w=996"
                            />
                        </Col>
                        <Col lg={{ span: 6 }} style={{ padding: "0px" }}>
                            <Image
                                id="im"
                                src="https://img.freepik.com/foto-gratis/pareja-sonriente-mujeres-caucasicas-sentadas-dentro-casa-rodante-camper-van-relajandose-te-hierbas_465191-3902.jpg"
                            />
                        </Col>
                        <Col id="sect3text" lg={{ span: 6 }} style={{ padding: "0px" }}>
                            <h3>After two years renting our van we decided to quit our jobs and start our own business of campervan renting, it's been a long journey but are happy and free now</h3>
                            <p>Petter an jule</p>
                        </Col>
                    </Row>
                </section>
            </Container>

            <section id="section3">
                <Container>
                    <Row>
                        <h2>How much can you earn with one vehicle?</h2>

                        <Col lg={{ span: 12 }}>
                            <Bar options={options} data={data1} />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section id="section5">
                <Container fluid>
                    <Row>
                        <Col id="ib2" lg={{ span: 6 }} md={{ span: 12 }}></Col>

                        <Col id="title" lg={{ span: 6 }} md={{ span: 12 }} style={{ padding: "0px 60px" }}>
                            <h1>Not Sure yet? Please leave us any question</h1>
                            {isLoggedIn ? (
                                <button style={{ width: "250px" }} className="bookVanButton mb-4" variant="light">
                                    <strong>Leave us a Message</strong>
                                </button>
                            ) : (
                                <button style={{ width: "250px" }} className="bookVanButton mb-4" variant="light">
                                    <strong>Leave us a Message</strong>
                                </button>
                            )}
                        </Col>

                        <Modal show={showModal} onHide={closeModal}>
                            <div className="modal1">
                                <Modal.Header closeButton>
                                    <Modal.Title>Add a new van</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewVanForm fireFinalActions={fireFinalActions} />
                                </Modal.Body>
                            </div>
                        </Modal>

                        <Modal show={showModals} onHide={closeLoginModal}>
                            <div className="modal1">
                                <Modal.Header closeButton>
                                    <Modal.Title>Please Log in </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Loginform closeModal={closeLoginModal} />
                                </Modal.Body>
                            </div>
                        </Modal>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default BecomeHostPage
