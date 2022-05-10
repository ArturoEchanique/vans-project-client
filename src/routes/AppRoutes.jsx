import SignupPage from '../pages/SingupPage/SingupPage';
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import LoginPage from '../pages/loginPage/loginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import NewVanPage from '../pages/NewVanPage/NewVanPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/singup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/newvan" element={<NewVanPage />} />


        </Routes>
    );
};

export default AppRoutes;
