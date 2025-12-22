import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Services";
import Team from "./pages/Payement";
import ProjectDetails from "./pages/ServiceDetails";
import Home from "./pages/Home/Home";

// clent import
import DashboardClient from "./pages/Client/Dashboard";
import LayoutClient from "./pages/Client/Layout";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/home" element={<Home />} />

        {/* client Routes */}
        <Route path="/client" element={<LayoutClient />}>
          <Route index element={<DashboardClient />} />
          
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="payement" element={<Team />} />
          <Route path="services" element={<Projects />} />
          <Route path="serviceDetail" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
