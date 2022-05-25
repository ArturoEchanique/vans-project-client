const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const monthNamesAb = ["jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
];

function beautifulDate(date) {

    if (typeof date === "string") date = new Date(date)
    const month = (date.getMonth() + 1);//months (0-11)
    const day = (date.getDate());//day (1-31)
    const year = date.getFullYear();

    const formattedDate = day + " " + monthNamesAb[month] + " " + year;

    return formattedDate
}

function beautifulHour(date) {

    if (typeof date === "string") date = new Date(date)
    const hour = (date.getHours() + 1);//months (0-11)
    let minutes = (date.getMinutes());//day (1-31)
    if (minutes < 10) minutes = "0" + minutes

    const formattedHour = hour + ":" + minutes

    return formattedHour
}

function daysBetweenTwoDates(dateStart, dateEnd) {

    let days = 0
    if (!(dateStart && dateEnd)) return 0
    let difference = dateEnd.getTime() - dateStart.getTime();
    days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

module.exports = { beautifulDate, beautifulHour, daysBetweenTwoDates }
