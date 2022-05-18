import { useEffect, useState } from "react"
import vanService from "../../services/van.service"
import PaymentDetailsCard from "../../components/PaymentDetailsCard/PaymentDetailsCard"

const PaymentDetailsPage = ({ startDate, endDate, price, van_id }) => {
    const [vanDetails, setVanDetails] = useState({})
    const getDetails = () => {
        vanService
            .getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data)
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getDetails()
    }, [])

    return <PaymentDetailsCard {...vanDetails} startDate={startDate} endDate={endDate} price={price} />
}
export default PaymentDetailsPage
