import { useContext } from "react"
import { Toast, ToastContainer } from "react-bootstrap"
import { MessageContext } from "../../context/message.context"
import "./UserMessage.css"

const UserMessage = () => {
    const { show, setShow, messageInfo } = useContext(MessageContext)

    return (
        <ToastContainer className="p-4" position={"bottom-end"}>
            <Toast show={show} autohide delay={3000} onClose={() => setShow(false)}>
                <Toast.Header>
                    <img src="./../../images/vanIcon3.png" className="toastIcon rounded me-2" alt="" />
                    <strong className="me-auto">{messageInfo.title}</strong>
                </Toast.Header>
                <Toast.Body>{messageInfo.description}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default UserMessage
