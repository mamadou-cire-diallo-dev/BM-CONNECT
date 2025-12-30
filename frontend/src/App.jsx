import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Provider/Layout";
import Dashboard from "./pages/Provider/Dashboard";
import Projects from "./pages/Provider/Services";
import Team from "./pages/Provider/Payement";
import OfferedServices from "./pages/Provider/OfferedServices";

import ServiceDetails from "./pages/Provider/ServiceDetails.jsx";
import Planning from "./pages/Provider/Planning.jsx";
import Profile from "./pages/Provider/Profile.jsx";
import Home from "./pages/Home/Home";

// clent import
import DashboardClient from "./pages/Client/Dashboard";
import LayoutClient from "./pages/Client/Layout";
import MyRequests from "./pages/Client/MyRequests";
import RequestDetails from "./pages/Client/RequestDetails";
import Invoices from "./pages/Client/Invoices";
import ProfileClient from "./pages/Client/Profile";

// vendor import
import DashboardVendor from "./pages/Vendor/Dashboard";
import LayoutVendor from "./pages/Vendor/Layout";
import ProductsVendor from "./pages/Vendor/Products";
import CouponsVendor from "./pages/Vendor/Coupons";
import OrdersVendor from "./pages/Vendor/Orders";
import ProfileVendor from "./pages/Provider/Profile"; // Reusing provider profile for now or create a new one later

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* client Routes */}
        <Route path="/client" element={<LayoutClient />}>
          <Route index element={<DashboardClient />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="requests/:id" element={<RequestDetails />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="profile" element={<ProfileClient />} />
        </Route>
        {/* PROVIDER ROUTES */}
        <Route path="/provider" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="payement" element={<Team />} />
          <Route path="services" element={<Projects />} />
          <Route path="planning" element={<Planning />} />
          <Route path="service" element={<OfferedServices />} />
          <Route path="serviceDetail" element={<ServiceDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* VENDOR ROUTES */}
        <Route path="/vendor" element={<LayoutVendor />}>
          <Route index element={<DashboardVendor />} />
          <Route path="products" element={<ProductsVendor />} />
          <Route path="orders" element={<OrdersVendor />} />
          <Route path="coupons" element={<CouponsVendor />} />
          <Route path="profile" element={<ProfileVendor />} />
          {/* Add other vendor routes here as needed */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
