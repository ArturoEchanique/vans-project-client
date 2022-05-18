
// import { DateRangePicker } from "rsuite";
import { useEffect, useState } from "react";
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import "rsuite/dist/rsuite.css";

const DatePicker = ({ startDate, endDate, handleDatesChange, reservedDays }) => {

    // useEffect(() => {
    //     if (chats.length > 0) loadChatMessages()
    // }, [])

    const today = new Date()
    let tomorrow = new Date(today)
    tomorrow = tomorrow.setDate(today.getDate() + 1)
    const endDateMoment = endDate ? moment(endDate) : null

    const [dates, setDates] = useState({
        startDate: moment(startDate),
        endDate: endDateMoment
    });

    const [focusedInput, setFocusedInput] = useState()

    const handleChange = ({ startDate, endDate }) => {
        let datesCollision = false
        let computedEndDate = endDate
        reservedDays?.forEach(day => {
            if ((day.getTime() <= endDate) && (startDate <= day.getTime())) {
                datesCollision = true
            }
        })
        if (!datesCollision) {
            computedEndDate = endDate
        }
        else {
            computedEndDate = null
        }
        setDates({ startDate, endDate: computedEndDate })
        const filterDates = {
            startDate: startDate?.toDate(),
            endDate: computedEndDate?.toDate()
        };
        handleDatesChange(filterDates);
    };

    const dayAlreadyReserved = (day) => {

        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        return moment(day).toDate() == today
    }

    const isBlocked = day => {
        const availableDates = ["2022-05-19", "2022-05-20", "2019-05-21", "2019-02-06", "2019-02-07", "2019-02-11", "2019-02-12", "2019-02-13", "2019-02-14", "2019-02-15", "2019-02-19", "2019-02-20", "2019-02-21", "2019-02-22", "2019-02-23", "2019-02-25", "2019-02-26", "2019-02-27", "2019-02-28", "2019-03-01", "2019-03-04", "2019-03-05", "2019-03-06", "2019-03-07", "2019-03-08", "2019-03-09", "2019-03-11", "2019-03-12"]
        return !availableDates.some(date => day.isSame(date), 'day')
    }

    const isDayBlocked = (day) => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const unavailableDays = reservedDays ? reservedDays : []
        return unavailableDays.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
    }

    return (
        <div className="datePicker">
            <DateRangePicker
                startDate={dates.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={dates.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={handleChange} // PropTypes.func.isRequired,
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                isDayBlocked={isDayBlocked}

            />
            {/* <h1>selected a range of dates</h1>

            <DateRangePicker onChange={handleChange} /> */}
        </div>
    );
};

export default DatePicker;
