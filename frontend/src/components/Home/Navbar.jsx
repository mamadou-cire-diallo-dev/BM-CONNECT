import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PrimaryButton } from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/themeSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import { Link,NavLink } from "react-router-dom";
import logo2 from "../../assets/logoChatGpt.png"
import logowebp from "../../assets/LogoBMConnect.webp"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  console.log("Current theme:", theme);

  const navLinks = [
    { name: "Acceuil", href: "/home#" },
    { name: "Services", href: "/home#features" },
    { name: "Contact", href: "/home#pricing" },
    { name: "FAQ", href: "/home#faq" },
  ];

  return (
    <motion.nav
      className="fixed top-5 left-0 right-0 z-50 px-4 "
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between dark:bg-black/50 backdrop-blur-md border border-black/4 dark:border-white/4 rounded-2xl p-3">
        
        <div className="flex  items-center select-none">
        <Link to="/home">
          <img src={logo2} alt="logo"  className="max-h-10 max-w-[120px] object-contain p-0" />
        </Link>
          <span className="   text-[#0d2e55] font-semibold   text-lg  tracking-tight leading-none top-[2px]  ">
            BM<span className="text-[#f26f0e]">Connect</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium dark:text-gray-300">
          {navLinks.map((link) => (
            <NavLink
              to={link.href}
              key={link.name}
              className="relative px-3 py-1 font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 ease-out hover:text-[#f26f0e] hover:font-semibold focus:outline-none focus:text-[#f26f0e] focus:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f26f0e] after:transition-all after:duration-300 hover:after:w-full focus:after:w-full"           >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="size-8 flex items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-lg transition hover:scale-105 active:scale-95"
          >
            {theme === "light" ? (
              <MoonIcon className="size-4 text-gray-800 dark:text-gray-200" />
            ) : (
              <SunIcon className="size-4 text-yellow-400" />
            )}
          </button>
          <button className="text-sm font-medium dark:text-gray-300 dark:hover:text-white transition max-sm:hidden">
            S'inscrire
          </button>
          <PrimaryButton className="max-sm:text-xs hidden sm:inline-block text-white bg-slate-900">
            Se connecter
          </PrimaryButton>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <MenuIcon className="size-6" />
        </button>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="relative px-3 py-1 font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 ease-out hover:text-[#f26f0e] hover:font-semibold focus:outline-none focus:text-[#f26f0e] focus:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f26f0e] after:transition-all after:duration-300 hover:after:w-full focus:after:w-full">
            {link.name}
          </Link>
        ))}

        <button
          onClick={() => setIsOpen(false)}
          className="font-medium text-gray-300 hover:text-white transition"
        >
          S'inscrire
        </button>
        <PrimaryButton onClick={() => setIsOpen(false)} className={'text-white'}>
          Se connecter
        </PrimaryButton>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md bg-white p-2 text-gray-800 ring-white active:ring-2"
        >
          <XIcon />
        </button>
      </div>
    </motion.nav>
  );
}
