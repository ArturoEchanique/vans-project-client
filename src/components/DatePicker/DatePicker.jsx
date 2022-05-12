import { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

const DatePicker = ({ setFilterDates, reloadFilterVans }) => {
    const handleChange = (data) => {
        const filterDates = {
            startDate: data[0],
            endDate: data[1],
        };
        setFilterDates(filterDates);
        reloadFilterVans(filterDates);
    };

    return (
        <>
            <h1>selected a range of dates</h1>

            <DateRangePicker onChange={handleChange} />
        </>
    );
};

export default DatePicker;
