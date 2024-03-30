import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../scss/styles.scss";
import { useContext, useState } from "react";
import { LoginContext } from "../Shared/LoginContext";
import { CartContext } from "../Shared/CartContext";
import ModalComponent from "./Modal";

function Header() {
  const { updateLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();
  const { clearCart, cartData } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalQuantity = cartData.items.reduce((acc, item) => acc + item.quantity, 0);

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
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container className="container nav-container">
          <Navbar.Brand as={Link} to="/home" className="heading">
            Direct Axis
          </Navbar.Brand>
          <Nav className="me-auto expand-div">
            <div className="me-auto nav-left">
              <Link className="nav-link" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/home/cart">
                Cart{totalQuantity > 0 && ` (${totalQuantity})`}
              </Link>
              <Link className="nav-link" to="/home/profile">
                Profile
              </Link>
              <li className="nav-link" onClick={handleShow}>
                Logout
              </li>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <ModalComponent isOpen={show} handleClose={handleClose} handleFunction={handleLogout} dataForModal={dataForModal} />
    </>
  );
}

export default Header;
