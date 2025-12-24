import Navbar from "../../components/Home/Navbar";
import Filtre from "../../components/Services/Filtre";
import Footer from "../../components/Home/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTheme } from "../../features/themeSlice";

export default function Services() {
  const dispatch = useDispatch();
  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, []);

  return (
    <>
      
        <Navbar />
        <Filtre/>
        <Footer />
    </>
  );
}
