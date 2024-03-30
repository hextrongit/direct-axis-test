import LoginStateProvider from "../src/Shared/LoginContext.jsx";
import { Outlet } from "react-router-dom";
import DataProvider from "./Shared/DataContext.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartDataProvider from "./Shared/CartContext.jsx";
import { useEffect } from "react";

function App() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <LoginStateProvider>
      <DataProvider>
        <CartDataProvider>
          <Outlet />
        </CartDataProvider>
      </DataProvider>
    </LoginStateProvider>
  );
}

export default App;
