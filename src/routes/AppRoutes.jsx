import SignupPage from "../pages/SingupPage/SingupPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import ErrorPage from '../pages/ErrorPage/ErrorPage';
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
        endDate: new Date(),
        name: "",
        solarPower: false,
        
    });

    const setFilterState = ((data) => {

        setFilterData(data);

    })

    return (
        <Routes>
            <Route path="/" element={<HomePage setFilterState={setFilterState} />} />
            <Route path="/singup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/results" element={<ResultsPage setFilterState={setFilterState} filterData = {filterData}/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/became-host" element={<BecameHostPage />} />
            <Route path="/newvan" element={<NewVanPage />} />
            <Route path="/:van_id/edit" element={<EditVanPage />} />
            <Route path="/*" element={<ErrorPage />} />

        </Routes>
    );
};

export default AppRoutes;
