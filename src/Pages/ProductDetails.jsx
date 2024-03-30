import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Shared/DataContext";
import Figure from "react-bootstrap/Figure";
import Card from "react-bootstrap/Card";

function ProductDetails() {
  const params = useParams();
  const { loading, productDetails, fetchProductDetails } = useContext(DataContext);

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
          </div>
        </div>
      ) : (
        <h3>Loading data...</h3>
      )}
    </div>
  );
}

export default ProductDetails;
