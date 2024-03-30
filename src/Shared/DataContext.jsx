import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext({
  allProducts: [],
  productDetails: {},
  loading: false,
  fetchAllProducts: () => {},
  fetchProductDetails: () => {},
});

// eslint-disable-next-line react/prop-types
function DataProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = () => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setAllProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchProductDetails = (id) => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value = { loading, allProducts, productDetails, fetchAllProducts, fetchProductDetails };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
