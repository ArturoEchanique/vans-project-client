import SignupPage from '../pages/SingUpPage/SingUpPage'
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/singup" element={<SignupPage />} />
            <Route path="/results" element={<ResultsPage />} />
        </Routes>
    );
};

export default AppRoutes;
