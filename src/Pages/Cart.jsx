import { useContext, useState } from "react";
import { CartContext } from "../Shared/CartContext";
import CartCard from "../Components/CartCard";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

function Cart() {
  const { cartData, clearCart } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const totalQuantity = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
  };

  const handleOrder = () => {
    setShow(true);
  };

  return (
    <div className="dashboard-div">
      <div className="productDetails-div cart">
        <div className="productDetails-left cart">
          {cartData.items.length > 0 ? (
            <div className="cards-div">
              {cartData.items.map((product) => (
                <div key={product.id}>
                  <CartCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h4>Nothing to show here</h4>
              <p>Add some products from home page</p>
              <Link to={`/home`}>Home page</Link>
            </div>
          )}
        </div>

        <div className="productDetails-right cart">
          <p className="price">Total No of Items: {totalQuantity} NOS</p>
          <p className="price">Total Price: {totalPrice}/- Rs</p>

          <Button
            variant="primary"
            onClick={() => {
              handleClearCart();
            }}
          >
            Clear Cart
          </Button>

          <Button
            variant="success"
            onClick={() => {
              handleOrder();
            }}
          >
            Place the order
          </Button>

          <Toast bg={"success"} className="toast" onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>Order Placed Successfully</Toast.Body>
          </Toast>
        </div>
      </div>
    </div>
  );
}

export default Cart;
