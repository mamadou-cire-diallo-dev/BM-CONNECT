import LenisScroll from "../../components/Home/Lenis";
import Navbar from "../../components/Home/Navbar";
import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";
import Pricing from "../../components/Home/Pricing";
import Faq from "../../components/Home/Faq";
import CTA from "../../components/Home/CTA";
import Footer from "../../components/Home/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTheme } from "../../features/themeSlice";

export default function Home() {
  const dispatch = useDispatch();
  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, []);

  return (
    <>
        {/* <SoftBackdrop /> */}
        <LenisScroll />
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <Faq />
        <CTA />
        <Footer />
    </>
  );
}
