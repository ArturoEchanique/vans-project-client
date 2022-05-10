import { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

const DatePicker = () => {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState(new Date());

    const handleChange = (data) => {

        setDateStart(data[0]);
        setDateEnd(data[1]);
    };
 
    return (
        <>
            <h1>selected a range of dates</h1>

            <DateRangePicker onChange={handleChange} />
            
        </>
    );
};

export default DatePicker;
