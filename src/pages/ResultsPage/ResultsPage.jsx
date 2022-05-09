import { Container, Modal, Button } from 'react-bootstrap'
// import CoastersList from '../../components/CoastersList/CoastersList'
import { useContext, useEffect, useState } from "react"
// import NewCoasterForm from './../../components/NewCoasterForm/NewCoasterForm'
import vanService from './../../services/van.service'
import { AuthContext } from '../../context/auth.context'

const ResultsPage = () => {

    const [fetched, setFetched] = useState(false)
    const [Vans, setVans] = useState([])

    // const openModal = () => setShowModal(true)
    // const closeModal = () => setShowModal(false)

    useEffect(() => loadVans(), 
    [])

    const loadVans = () => {
        console.log("holi")
        vanService
            .getVans()
            .then(({ data }) => {
                console.log(data)
                setFetched(true)
                setVans(data)
            })
            .then(err => console.log(err))
    }

    // const fireFinalActions = () => {
    //     closeModal()
    //     loadVans()
    // }

    // const { isLoggedIn } = useContext(AuthContext)

    return (
        <>
            {/* <Container>
                <h1>Listado de montañas rusas</h1>
                {isLoggedIn && <Button onClick={openModal}>Crear nueva</Button>}
                <hr />
                <CoastersList coasters={coasters} />
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva montaña rusa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCoasterForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal> */}
            {Vans[0]?.description}
            {Vans.map(van => {
                return van.description
            })}

            
        </>
    )
}

export default ResultsPage