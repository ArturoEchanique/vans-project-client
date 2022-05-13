import { useEffect, useState } from "react";
import PaymentDetailsCard from "../../components/PaymentDetailsCard/PaymentDetailsCard"
import vanService from "../../services/van.service";


const PaymentDetailsPage = ({ startDate, endDate, price, van_id }) => {
    const [vanDetails, setVanDetails] = useState({});
    useEffect(() => {
        vanService.getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <PaymentDetailsCard {...vanDetails} startDate={startDate} endDate={endDate} price={price} />
    )
}
export default PaymentDetailsPage

