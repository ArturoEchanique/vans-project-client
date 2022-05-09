import { Routes, Route } from "react-router-dom"
import ResultsPage from "../pages/ResultsPage/ResultsPage"
// import CoasterDetailsPage from "../pages/CoasterDetailsPage/CoasterDetailsPage"
// import CoastersPage from '../pages/CoastersPage/CoastersPage'
// import IndexPage from "../pages/HomePage/HomePage"
// import LoginPage from "../pages/LoginPage/LoginPage"
// import SignupPage from "../pages/SignupPage/SignupPage"
// import CoastersPage from '../pages/CoastersPage/CoastersPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/results" element={<ResultsPage />} />
        </Routes>
    )
}

export default AppRoutes