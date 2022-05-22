// import { DateRangePicker } from "rsuite";
import { useState } from "react"
import moment from "moment"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import { DateRangePicker } from "react-dates"
import "rsuite/dist/rsuite.css"

const DatePicker = ({ startDate, endDate, handleDatesChange, reservedDays }) => {
    const today = new Date()
    let tomorrow = new Date(today)
    tomorrow = tomorrow.setDate(today.getDate() + 1)
    const endDateMoment = endDate ? moment(endDate) : null

    const [dates, setDates] = useState({
        startDate: moment(startDate),
        endDate: endDateMoment,
    })

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

    const isDayBlocked = (day) => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const unavailableDays = reservedDays ? reservedDays : []
        return unavailableDays.some((unavailableDay) => moment(unavailableDay).isSame(day, "day"))
    }

    return (
        <div className="datePicker">
            <DateRangePicker
                startDate={dates.startDate}
                startDateId="your_unique_start_date_id"
                endDate={dates.endDate}
                endDateId="your_unique_end_date_id"
                onDatesChange={handleChange}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                isDayBlocked={isDayBlocked}
                // noBorder={true}
                block={true}
                // orientation={"VERTICAL_ORIENTATION"}
            />
        </div>
    )
}

export default DatePicker
