import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Shared/DataContext";
import Stack from "react-bootstrap/Stack";
import ProductCard from "../Components/ProductCard";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

function DashBoard() {
  const { loading, allProducts, fetchAllProducts } = useContext(DataContext);
  const [productList, setProductList] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  const [currentPages, setCurrentPages] = useState();

  useEffect(() => {
    fetchAllProducts();
    if (allProducts.length > 0) {
      setProductList(allProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts[0]?.id]);

  useEffect(() => {
    const currentPages = Object.fromEntries(Object.entries(categorizedProducts).map(([category]) => [category, 1]));
    setCurrentPages(currentPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts]);

  useEffect(() => {
    if (productList.length > 0) {
      const categorizedData = productList.reduce((acc, product) => {
        const { category } = product;
        acc[category] = acc[category] || []; // Initialize category array if not present
        acc[category].push(product);
        return acc;
      }, {});
      setCategorizedProducts(categorizedData);
      setFilteredProducts(categorizedData); // Set initial filtered state (all products)
    }
  }, [productList]); // Dependency includes productList

  const handleChange = (event, category) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = categorizedProducts[category]?.filter((product) => product.title.toLowerCase().includes(searchTerm));

    // Update filteredProducts state with a new object, merging with existing data
    setFilteredProducts((prevFilteredProducts) => ({
      ...prevFilteredProducts,
      [category]: filteredData, // Update specific category
    }));
  };

  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case "A to Z":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "Z to A":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "Price low to High":
        return products.sort((a, b) => a.price - b.price);
      case "Price High to low":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products; // No sorting if invalid sortBy
    }
  };

  const handleSort = (event, sortOn) => {
    const selectedCategory = event.target.name;
    const selectedSort = sortOn;

    // Create a copy of the filtered products state to avoid mutation
    const updatedFilteredProducts = { ...filteredProducts };

    // Update the specific category's data with the sorted array
    updatedFilteredProducts[selectedCategory] = sortProducts(updatedFilteredProducts[selectedCategory], selectedSort);

    // Set the updated filtered products state using the copy
    setFilteredProducts(updatedFilteredProducts);
  };

  const handlePageChange = (category, pageNumber) => {
    const parsedPageNumber = Number(pageNumber.replace("(current)", ""));

    const startIndex = (parsedPageNumber - 1) * 3;
    const endIndex = startIndex + 3;

    const updatedFilteredProducts = { ...filteredProducts };
    updatedFilteredProducts[category] = categorizedProducts[category].slice(startIndex, endIndex);

    setFilteredProducts(updatedFilteredProducts);
    setCurrentPages((prevCurrentPages) => ({
      ...prevCurrentPages,
      [category]: parsedPageNumber,
    }));
  };

  return (
    <div className="dashboard-div">
      {productList && !loading ? (
        <>
          <Stack gap={3} className="slack-div">
            {Object.keys(categorizedProducts).map((category) => (
              <div key={category} className="category-div">
                <div className="category-top">
                  <h2>{category}</h2>
                  <div className="nav-left">
                    <Form.Check
                      name={category}
                      type={"radio"}
                      label={`A to Z`}
                      id={category}
                      onChange={(e) => {
                        handleSort(e, "A to Z");
                      }}
                    />
                    <Form.Check
                      name={category}
                      type={"radio"}
                      label={`Z to A`}
                      id={category}
                      onChange={(e) => {
                        handleSort(e, "Z to A");
                      }}
                    />
                    <Form.Check
                      name={category}
                      type={"radio"}
                      label={`Price low to High`}
                      id={category}
                      onChange={(e) => {
                        handleSort(e, "Price low to High");
                      }}
                    />
                    <Form.Check
                      name={category}
                      type={"radio"}
                      label={`Price High to low`}
                      id={category}
                      onChange={(e) => {
                        handleSort(e, "Price High to low");
                      }}
                    />
                  </div>
                  <Form.Control
                    name={category}
                    size="sm"
                    type="text"
                    placeholder="Search"
                    onChange={(event) => handleChange(event, category)}
                  />
                </div>
                <div className="card-container">
                  {filteredProducts[category]?.slice(0, 3).map((product) => (
                    <div key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </div>
                  ))}
                  {filteredProducts[category]?.length === 0 && <p>{`No results found for ${category}`}</p>}
                </div>
                <div className="pagination-container">
                  <Pagination onClick={(event) => handlePageChange(category, event.target.textContent)}>
                    {Array.from({ length: Math.ceil(filteredProducts[category]?.length / 3) }, (_, index) => (
                      <Pagination.Item key={index + 1} active={index + 1 === currentPages[category]}>
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              </div>
            ))}
          </Stack>
        </>
      ) : (
        <h3>Loading data...</h3>
      )}
    </div>
  );
}

export default DashBoard;
