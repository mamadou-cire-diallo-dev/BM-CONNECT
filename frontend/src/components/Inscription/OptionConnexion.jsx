import React from 'react'
import { useRef } from 'react';
import { optionsConnexion } from '../../assets/dummy-data';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function OptionConnexion() {
    const refs = useRef([]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    {optionsConnexion.map((option, i) => (
                       <Link to={`/inscription${option.type}`}  key={i}>
                             <div
                            className="rounded-2xl cursor-pointer p-6 flex flex-col items-center  h-60 bg-gray-200 dark:bg-white/3 border border-black/6 dark:border-white/6
                            transition-all duration-300 ease-out

                            hover:-translate-y-2
                            hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40

                            focus-within:border-[#f26f0e]
                            active:border-[#f26f0e]
                            "
                           
                        >
                            <div className={`w-20 h-20 rounded-lg text-[#f26f0e] text-xl dark:bg-violet-900/20 flex items-center justify-center mb-4`}
                             style={{background: `linear-gradient(to bottom right, ${option.codeCouleur}, ${option.degrade})`,  }}
                            >
                                {option.icon}
                            </div>
                            <h3 className="text-xl text-black dark:text-white font-semibold mb-2">{option.title}</h3>
                            <p className="text-black dark:text-gray-300 text-lg leading-relaxed">
                                {option.desc}
                            </p>
                            
            
                        </div>
                       </Link>
                    ))}
    </div>
  )
}

