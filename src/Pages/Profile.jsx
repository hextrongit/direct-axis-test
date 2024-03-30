import { useContext, useState } from "react";
import { CartContext } from "../Shared/CartContext";
import Button from "react-bootstrap/Button";
import { LoginContext } from "../Shared/LoginContext";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../Components/Modal";

function Profile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { cartData, clearCart } = useContext(CartContext);
  const { updateLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalQuantity = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleLogout = () => {
    localStorage.setItem("isLogin", false);
    updateLoginStatus(false);
    navigate("/auth/login");
    clearCart();
  };

  const dataForModal = {
    heading: "Logout !",
    text: "Are you sure you want to logout ?",
    confirm: "Yes, log out",
  };

  return (
    <div className="dashboard-div">
      <div className="productDetails-div profile">
        <div className="productDetails-left profile">
          <h4>Profile</h4>
        </div>

        <div className="productDetails-left profile">
          <h4>
            Name: {userData.firstName} {userData.lastName}
          </h4>
          <h4>Email Id: {userData.email}</h4>
          <h4>Username: {userData.username}</h4>

          <p className="price">Total No of Items In Cart: {totalQuantity} NOS</p>
          <p className="price">Total Price to be payed: {totalPrice}/- Rs</p>

          <Button
            variant="primary"
            onClick={() => {
              handleShow();
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <ModalComponent isOpen={show} handleClose={handleClose} handleFunction={handleLogout} dataForModal={dataForModal} />
    </div>
  );
}

export default Profile;
