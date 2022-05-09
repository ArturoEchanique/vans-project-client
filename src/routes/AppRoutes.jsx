import { Routes, Route } from "react-router-dom"
// import CoasterDetailsPage from "../pages/CoasterDetailsPage/CoasterDetailsPage"
// import CoastersPage from '../pages/CoastersPage/CoastersPage'
// import IndexPage from "../pages/HomePage/HomePage"
// import LoginPage from "../pages/LoginPage/LoginPage"
// import SignupPage from "../pages/SignupPage/SignupPage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={"holiEstoyEnrutadio"} />
            {/* <Route path="/galeria" element={<CoastersPage />} />
            <Route path="/detalles/:coaster_id" element={<CoasterDetailsPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/inicio-sesion" element={<LoginPage />} />
            <Route path="*" element={<h1>Esto es un 404, melón</h1>} /> */}
        </Routes>
    )
}

export default AppRoutes