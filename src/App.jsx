import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import Navbar from "./Components/Common/Navbar";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Settings from "./Components/Core/Dashboard/Settings.js";
import { useSelector } from "react-redux";
import ProductHistory from "./Components/Core/Dashboard/ProductHistory";
import Cart from "./Components/Core/Dashboard/Cart.js";
import Provider from "./Components/Core/Dashboard/Provider/index.js";
import MyProducts from "./Components/Core/Dashboard/MyProducts/index.js";
import AddProduct from "./Components/Core/Dashboard/AddProduct/index.js";
import Products from "./Pages/Products.js";
import Product from "./Pages/Product.js";

function App() {
  const {user} = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col bg-richblack-800 text-richblack-25 min-h-screen w-full h-full">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path={`/update-password/:token`} element={<UpdatePassword />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products/:productType" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />

        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>} >
          <Route path="/dashboard/my-profile" element={<MyProfile />}/>
          <Route path="/dashboard/settings" element={<Settings />} />

          {
            user && user.accountType === "Customer" && (
            <>
              <Route path="/dashboard/product-history" element={<ProductHistory />} />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
            )
          }
          {
            user && user?.accountType === "Provider" && (
              <>
                <Route path="/dashboard/provider" element={<Provider />} />
                <Route path="/dashboard/my-products" element={<MyProducts />} />
                <Route path="/dashboard/add-product" element={<AddProduct />} />
              </>
            )
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
