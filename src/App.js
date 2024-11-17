import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./Admin/components/Products";
import AddItem from "./Admin/components/AddItem";
import Notifications from "./Admin/components/Notifications";
import SendMessages from "./Admin/components/SendMessages";
import Error from "./pages/Error";
import Signup from "./pages/Signup";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Admin from "./Admin/Admin";
import ContactReply from "./Admin/components/ContactReply";
function App() {
  const { auth, loading, userdata, setloading } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  } else {
    return (
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />
          {auth.user ? (
            auth.user.role === 0 ? (
              <Route path="/profile" element={<Profile />} />
            ) : (
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Products />} />
                <Route path="allProducts" element={<Products />} />
                <Route path="addProduct" element={<AddItem />} />
                <Route path="receivedmessages" element={<Notifications />} />
                <Route path="sendmessages" element={<SendMessages />} />
              </Route>
            )
          ) : null}
          <Route path="/contactReply/:id" element={<ContactReply />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </>
    );
  }
}

export default App;
