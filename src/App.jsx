import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import CreateLisitngs from "./pages/CreateLisitngs";
import Listings from "./pages/Listings";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          {/* categoryName is the parameter its in the category.jsx */}
          <Route path="/category/:categoryName" element={<Category />}/>
          <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile /> } />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/create-listing" element={<CreateLisitngs />} />
           <Route path="/category/:categoryName/:listingId" element={<Listings />}/>
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;
