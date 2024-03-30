import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Shared/CartContext";

function ProductCard({ product }) {
  const { cartData, addItem, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProduct = (product) => {
    navigate(`productDetails/${product.id}`);
  };

  const handleAddItem = (product) => {
    addItem(product);
  };

  const handleRemoveItem = (product) => {
    removeItem(product);
  };

  const cardItem = cartData.items.find((item) => item.id === product.id);
  const isInCart = !!cardItem;
  const quantity = isInCart ? cardItem.quantity : 0;

  return (
    <Card className="card" style={{ width: "24rem" }}>
      <div
        onClick={() => {
          handleProduct(product);
        }}
      >
        <div className="image-container">
          <Card.Img variant="top" src={product.image} />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text className="rating">
            {product.rating.rate}⭐ ({product.rating.count})
          </Card.Text>
          <Card.Text className="price">{product.price} /-</Card.Text>
        </Card.Body>
      </div>

      {isInCart ? (
        // ... Button to remove from cart
        <div className="button-container">
          <Button
            variant="primary"
            onClick={() => {
              handleAddItem(product);
            }}
          >
            +
          </Button>

          <span>{quantity}</span>

          <Button
            variant="primary"
            onClick={() => {
              handleRemoveItem(product);
            }}
          >
            -
          </Button>
        </div>
      ) : (
        // ... Button to add to cart
        <div className="button-container">
          <Button
            className="inactive"
            variant="primary"
            onClick={() => {
              handleAddItem(product);
            }}
          >
            Add to Cart
          </Button>
        </div>
      )}
    </Card>
  );
}

export default ProductCard;
