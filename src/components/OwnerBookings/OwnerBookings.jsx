
import UserBookingsCard from "../UserBookingsCard/UserBookingsCard";
import { Container, Row, Col } from "react-bootstrap";

const OwnerBookings = ({ ownerBookings }) => {
console.log(ownerBookings);

   const bookingList = ownerBookings?.map((booking) => {
       return (
           <Col key={booking._id}>
               <UserBookingsCard {...booking} />
           </Col>
       );
   });

   return (
       <>
           <Container>
               <Row>
                   <h3> Booked from you </h3>

                   {bookingList}
               </Row>
           </Container>
       </>
   );
};

export default OwnerBookings;
