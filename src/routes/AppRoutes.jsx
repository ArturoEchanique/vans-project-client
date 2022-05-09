import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            {/* <Route path="/galeria" element={<CoastersPage />} />
            <Route path="/detalles/:coaster_id" element={<CoasterDetailsPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/inicio-sesion" element={<LoginPage />} />
            <Route path="*" element={<h1>Esto es un 404, melón</h1>} /> */}
        </Routes>
    );
}

export default AppRoutes