import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Row } from "react-bootstrap"


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const BarChart = ({ ownerBookings }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Your Last Bookings",
            },
        },
    }
    const data1 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Last Incomes",
                data: ["1000", "2000", "3000", "2500", "3000", "4000", "3500"],
                backgroundColor: "rgba(255, 156, 130, 1)",
            },
        ],
    }
    // let label
    // let chartData

    // label = [ownerBookings?.map((elm) => `${elm.price}$`)]
    // console.log("el label", label)
    // chartData = [ownerBookings?.map((elm) => elm.price)]
    // console.log("data", chartData)

    // const data = {
    //     labels: label,
    //     datasets: [
    //         {
    //             label: "Last Bookings",
    //             data: chartData,
    //             backgroundColor: "rgba(255, 156, 130, 1)",
    //         },
    //     ],
    // }

    return (
        <Row>
            <h4>Your Incomes </h4>
            <hr />
            <Bar options={options} data={data1} />
        </Row>
    )
}

export default BarChart
