import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/scss/styles.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./Pages/DashBoard.jsx";
import Profile from "./Pages/Profile.jsx";
import Cart from "./Pages/Cart.jsx";
import AppRouter from "./Routers/AppRouter.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import AuthRouter from "./Routers/AuthRouter.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <AppRouter />,
        children: [
          { path: "", index: true, element: <DashBoard /> },
          { path: "profile", element: <Profile /> },
          { path: "cart", element: <Cart /> },
          { path: "productDetails/:id", element: <ProductDetails /> },
        ],
      },
      {
        path: "/auth",
        element: <AuthRouter />,
        children: [
          { path: "login", element: <Login /> },
          { path: "registration", element: <Registration /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
