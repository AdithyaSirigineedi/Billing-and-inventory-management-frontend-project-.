import Login from './login pages/login.js';
import Register from './login pages/register.js';
import VendorPage from './pages/vendorHome.js';
import CustomerPage from './pages/customerHome.js';
import ErrorPage from './pages/error.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './pages/profile.js';
import AddProduct from './pages/productadd.js';
import { ProtectedRoute } from './protectedRoute/Route.js';
import Cart from './pages/addtocart.js';

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>

        <Route path="/vendor/home" element= {
            <ProtectedRoute>
              <VendorPage />
            </ProtectedRoute>} />

            <Route path="/customer/home" element= {
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>} />

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/cart" element={< Cart/>} />

        </Routes>
        </BrowserRouter>

    )
}
export default App;