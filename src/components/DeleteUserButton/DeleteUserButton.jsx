import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";



const DeleteButton = () => {
const { user } = useContext(AuthContext);

      const handleDelete = () => {
          userService
              .deleteUser(user._id)
              .then(() => {})
              .catch((err) => console.log(err));
      };



    return (
        <>
            <Button variant="dark" onClick={handleDelete}>
                Delete Profile
            </Button>
        </>
    );
};

export default DeleteButton;
