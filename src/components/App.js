import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import AppRoutes from "../routes/AppRoutes"
import Navigation from "./Navigation/Navigation"
import UserMessage from "./UserMessage/UserMessage"

const App = () => {
    return (
        <>
            <Navigation />
            <AppRoutes />
            <UserMessage />
            {/* <Footer /> */}
        </>
    )
}

export default App
