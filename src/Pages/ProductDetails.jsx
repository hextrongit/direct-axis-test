import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Shared/DataContext";
import Figure from "react-bootstrap/Figure";
import Card from "react-bootstrap/Card";
import { CartContext } from "../Shared/CartContext";
import Button from "react-bootstrap/Button";

function ProductDetails() {
  const params = useParams();
  const { loading, productDetails, fetchProductDetails } = useContext(DataContext);
  const { cartData, addItem, removeItem } = useContext(CartContext);

  const [productData, setProductData] = useState({});

  useEffect(() => {
    fetchProductDetails(params.id);
    setProductData(productDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      setProductData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, productDetails.id]);

  const cardItem = cartData.items.find((item) => item.id === productData.id);
  const isInCart = !!cardItem;
  const quantity = isInCart ? cardItem.quantity : 0;

  const handleAddItem = (product) => {
    addItem(product);
  };

  const handleRemoveItem = (product) => {
    removeItem(product);
  };

  return (
    <div className="dashboard-div">
      {productData.id && !loading ? (
        <div className="productDetails-div">
          <div className="productDetails-left">
            <Figure>
              <Figure.Image alt={productData.titile} src={productData.image} />
            </Figure>
          </div>
          <div className="productDetails-right">
            <Card.Title>{productData.title}</Card.Title>
            <Card.Text>{productData.description}</Card.Text>
            <Card.Text className="rating">Category - {productData.category}</Card.Text>

            <Card.Text className="rating">
              {productData.rating.rate}⭐ ({productData.rating.count})
            </Card.Text>
            <Card.Text className="price">{productData.price} /-</Card.Text>

            {isInCart ? (
              // ... Button to remove from cart
              <div className="button-container product-details">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleAddItem(productData);
                  }}
                >
                  +
                </Button>

                <span>{quantity}</span>

                <Button
                  variant="primary"
                  onClick={() => {
                    handleRemoveItem(productData);
                  }}
                >
                  -
                </Button>
              </div>
            ) : (
              // ... Button to add to cart
              <div className="button-container product-details">
                <Button
                  className="inactive"
                  variant="primary"
                  onClick={() => {
                    handleAddItem(productData);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h3>Loading data...</h3>
      )}
    </div>
  );
}

export default ProductDetails;
