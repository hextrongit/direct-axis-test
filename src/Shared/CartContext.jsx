import { createContext, useState } from "react";

export const CartContext = createContext({
  cartData: {
    items: [],
  },
  addItem: (product) => {}, // Placeholder for addItem function
  removeItem: (product) => {}, // Placeholder for removeItem function
  clearCart: () => {}, // Placeholder for clearCart function
});

// eslint-disable-next-line react/prop-types
function CartDataProvider({ children }) {
  const [cartData, setCartData] = useState({
    items: [],
  });

  const addItem = (incomingProduct) => {
    const existingItemIndex = cartData.items.findIndex((item) => item.id === incomingProduct.id);

    if (existingItemIndex !== -1) {
      // Update quantity for existing item
      setCartData((prevData) => {
        const updatedItems = [...prevData.items];
        updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity || 1) + 1;
        return { ...prevData, items: updatedItems };
      });
    } else {
      // Add new item with quantity 1
      setCartData((prevData) => ({
        ...prevData,
        items: [...prevData.items, { ...incomingProduct, quantity: 1 }],
      }));
    }
  };

  const removeItem = (incomingProduct) => {
    const existingItemIndex = cartData.items.findIndex((item) => item.id === incomingProduct.id);

    if (existingItemIndex !== -1) {
      setCartData((prevData) => {
        const updatedItems = [...prevData.items];
        const item = updatedItems[existingItemIndex];

        if (item.quantity > 1) {
          item.quantity--;
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }

        return { ...prevData, items: updatedItems };
      });
    }
  };

  const clearCart = () => {
    setCartData({
      items: [],
    });
  };

  const value = { cartData, addItem, removeItem, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartDataProvider;
