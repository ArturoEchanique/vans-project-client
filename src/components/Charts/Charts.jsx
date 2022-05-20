import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const data1 = {
    labelsM: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [1, 2, 3, 5, 6],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [1, 55, 3, 55, 6],

            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Your Last Bookings',
        },
    },
};


const BarChart = ({ ownerBookings }) => {

    let label
    let chartData

    label = [ownerBookings?.map((elm) => `${elm.price}$`)]
    chartData = [ownerBookings?.map((elm) => elm.price)]

    const data = {
        labels: label[0],
        datasets: [
            {
                label: 'Last Bookings',
                data: chartData[0],
                backgroundColor: 'rgba(255, 156, 130, 1)',
            },
        ],
    };

    return (
        <>
            <h3>Your Incomes </h3>
            <hr />
            < Bar
            
                options={options} data={data}
            />

        </>
    )

}

export default BarChart