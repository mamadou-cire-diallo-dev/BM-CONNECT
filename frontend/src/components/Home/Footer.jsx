import { footerLinks } from '../../assets/dummy-data';
import { motion } from 'framer-motion';
import logo2 from "../../assets/logoChatGpt.png"
import { Link } from 'react-router-dom';


export default function Footer() {

    return (
        <motion.footer className="bg-linear-to-br from-[#0d2e55] to-[#0a2444] border-t border-white/6 pt-10 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/10">
                    <div>
                        <div className="flex  items-center select-none">
                            <Link to="/home">
                            <img src={logo2} alt="logo"  className="max-h-10 max-w-[120px] object-contain p-0" />
                            </Link>
                            <span className=" text-[#0d2e55] font-semibold shadow-xl   text-lg  tracking-tight leading-none top-[2px]  ">
                                BM<span className="text-[#f26f0e]">Connect</span>
                            </span>
                        </div>
                        <p className="max-w-[410px] mt-6 text-sm leading-relaxed">
                            La plateforme qui révolutionne la maintenance en Guinée 
                       </p>
                    </div>

                    <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-base text-white md:mb-5 mb-2">
                                    {section.title}
                                </h3>
                                <ul className="text-sm space-y-1">
                                    {section.links.map(
                                        (link, i) => (
                                            <li key={i}>
                                                <a
                                                    href={link.url}
                                                    className="hover:text-white transition"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="py-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} {' '}
                    <a href="https://prebuiltui.com/tailwind-templates?ref=pixel-forge">
                        BMConnect
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </motion.footer>
    );
};