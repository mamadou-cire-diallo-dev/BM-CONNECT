import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTheme } from "../../features/themeSlice";
import ContactezNous from "../../components/Contact/ContactezNous";

export default function Contact() {
  const dispatch = useDispatch();
  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, []);

  return (
    <>      
        <Navbar />
        <ContactezNous>  </ContactezNous>
        <Footer />
    </>
  );
}
