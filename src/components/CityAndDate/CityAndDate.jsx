import "rsuite/dist/rsuite.css"
import "./CityAndDate.css"
import { Button, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "./../../services/van.service"
import VanCard from "../../components/VanCard/VanCard"
import { useEffect, useState, useContext } from "react"
import userService from "./../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import ReactMap from "../../components/ReactMap/ReactMap"
import InfiniteScroll from "react-infinite-scroll-component"
import DatePicker from "../../components/DatePicker/DatePicker"
import PriceSlider from "../../components/PriceSlider/PriceSlider"
import VanCardList from "../../components/VanCardList/VanCardList"
import { useNavigate } from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const CityAndDate = ({ startDate, endDate, handleDatesChange, reservedDays }) => {


    return (
        <div className="cityAndDate">
            <>
                <form>
                    <label>
                        <input className="cityAndDateElem" value={"Valencia"} />
                    </label>
                </form>
            </>
            <>
                <DatePicker />
            </>
            <Button
                className="searchButton"
                variant={"light"}
                id="search">
                <img className="searchIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                Search
            </Button>
        </div>
    )
}

export default CityAndDate



