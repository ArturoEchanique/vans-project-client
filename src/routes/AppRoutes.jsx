import SignupPage from "../pages/SingupPage/SingupPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import LoginPage from "../pages/loginPage/loginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NewVanPage from "../pages/NewVanPage/NewVanPage";
import EditVanPage from "../pages/EditVanPage/EditVanPage";
import { useState } from "react";
import BecameHostPage from "../pages/BecameHostPage/BecameHostPage";



const AppRoutes = () => {

    // const [bookingDates, setBookingDates] = useState()
    const [filterData, setFilterData] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const setFilterState = ((data) => {

        setFilterData(data);
       
    })
    
    return (
        <Routes>
            <Route path="/" element={<HomePage setFilterState={setFilterState} />} />
            <Route path="/singup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/became-host" element={<BecameHostPage />} />
            <Route path="/newvan" element={<NewVanPage />} />
            <Route path="/:van_id/edit" element={<EditVanPage />} />
        </Routes>
    );
};

export default AppRoutes;
