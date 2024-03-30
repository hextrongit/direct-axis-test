import { useContext } from "react";
import Figure from "react-bootstrap/Figure";
import { CartContext } from "../Shared/CartContext";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function CartCard({ product }) {
  const total = product.price * product.quantity;

  const { addItem, removeItem } = useContext(CartContext);

  const handleAddItem = (product) => {
    addItem(product);
  };

  const handleRemoveItem = (product) => {
    removeItem(product);
  };

  return (
    <div className="slack-div cart">
      <Figure>
        <Figure.Image width={171} height={180} alt="171x180" src={product.image} />
      </Figure>

      <div className="cartDiv-right">
        <h5>{product.title}</h5>
        <p className="price">MRP: {product.price}/-</p>

        <Link to={`/home/productDetails/${product.id}`}>Know more about the product</Link>
        <p className="rating">Quantity: {product.quantity} NOS</p>

        <div className="button-container">
          <Button
            variant="primary"
            onClick={() => {
              handleAddItem(product);
            }}
          >
            +
          </Button>

          <span>{product.quantity}</span>

          <Button
            variant="primary"
            onClick={() => {
              handleRemoveItem(product);
            }}
          >
            -
          </Button>
        </div>

        <p className="price">Total Price: {total}/-</p>
      </div>
    </div>
  );
}

export default CartCard;
