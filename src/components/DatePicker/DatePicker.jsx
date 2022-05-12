import { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

const DatePicker = ({ setFilterDates }) => {
    const handleChange = (data) => {
        const filterData = {
            startDate: data[0],
            endDate: data[1],
        };
        setFilterDates(filterData);
    };

    return (
        <>
            <h1>selected a range of dates</h1>

            <DateRangePicker onChange={handleChange} />
        </>
    );
};

export default DatePicker;
