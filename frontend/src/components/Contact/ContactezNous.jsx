import React from 'react'
import { useRef } from 'react';
import {contactData} from '../../assets/dummy-data' ;
import TitleService from '../Services/TitleService';
import FormulaireContact from './FormulaireContact';
import BesoinAide from './BesoinAide';
import { motion } from 'framer-motion';
function ContactezNous() {
    const refs = useRef([]);
  return (
    <section id="valeurs" className="py-20 2xl:py-32 text-black">
            <div className="max-w-6xl mx-auto px-4">

                <TitleService
                    title="Contactez-nous"
                    heading="Notre équipe est là pour vous aider. N'hésitez pas à nous contacter."
                    description=""
                    textHead="text-center"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactData.map((contact, i) => (
                        <motion.div
                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                            key={i}
                            onAnimationComplete={() => {
                                const card = refs.current[i];
                                if (card) {
                                    card.classList.add("transition", "duration-300", "hover:border-white/15", "hover:-translate-y-1");
                                }
                            }}
                            className="rounded-2xl p-6 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6"
                        >
                            <div className={`w-12 h-12 rounded-lg text-white    dark:bg-violet-900/20 flex items-center justify-center mb-4`}
                             style={{background: `linear-gradient(to bottom right, ${contact.codeCouleur}, ${contact.degrade})`,  }}
                            >
                                {contact.icon}
                            </div>
                            <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-2">{contact.title}</h3>
                            <ul className="text-black dark:text-white text-sm leading-relaxed">
                                {contact.list.map((el,index) => (
                                <li key={index}>
                                    {el}
                                </li>
                                ))}                                
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-2">
                                {contact.textAccroche}
                            </p>
                            
            
                        </motion.div>
                    ))}
                </div>
                <div className="flex flex-col gap-6 w-full mt-10 md:flex-row">
                    <FormulaireContact> </FormulaireContact>
                    <BesoinAide></BesoinAide>
                </div>
            </div>
    </section>
  )
}

export default ContactezNous