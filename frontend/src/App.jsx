import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Services";
import Team from "./pages/Payement";

import ServiceDetails from "./pages/ServiceDetails";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact.jsx";
import Inscription from "./pages/Connexion/Inscription.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";

// clent import
import DashboardClient from "./pages/Client/Dashboard";
import LayoutClient from "./pages/Client/Layout";
import OfferedServices from "./pages/OfferedServices.jsx";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />}>  </Route>
        <Route path="/inscription" element={<Inscription />}>  </Route>
        <Route path="/connexion" element={<Connexion />}>  </Route>

        {/* client Routes */}
        <Route path="/client" element={<LayoutClient />}>
          <Route index element={<DashboardClient />} />
        </Route>
        <Route path="/provider" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="payement" element={<Team />} />
          <Route path="services" element={<Projects />} />
          <Route path="service" element={<OfferedServices />} />
          <Route path="serviceDetail" element={<ServiceDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
