import React from 'react'
import { ArrowRightIcon, PlayIcon, ZapIcon, MapPin, CheckIcon, Star , Phone,
  CheckCircle,
  XCircle} from 'lucide-react';

import { PrimaryButton,PrimaryButtonOrange } from '../../Home/Buttons';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { DisponibleButton } from '../../Home/Buttons';


export default function PrestatairesDispos({prestataire, i}) {
        const refs = useRef([]);
  return (
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
                            className=" rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6"
                        >
                            <div className={`w-full h-max rounded-lg text-balck/3 dark:text-white  flex flex-col dark:bg-gray-900/20 flex items-center justify-center mb-2`}
                            >
                               <div className="flex gap-4 w-full px-4 pt-2">
                                    <img src={prestataire.image} className='w-24 h-20 rounded rounded-lg' alt="avatar" />
                                    <div className='flex flex-col gap-2'>
                                        <span >{prestataire.prenom}  {prestataire.nom} </span>
                                        <ul className='flex gap-2 text-xs'> 
                                            {prestataire.fonctions.map((fonction,i)=> (
                                            <li key={i}> 
                                                {fonction}
                                            </li>
                                            ))} 
                                        </ul>
                                       
                                        <span className='text-xs '> Spécialiste : {prestataire.specialiste}</span>
                                        <div className='flex gap-2 mb-2 text-xs'>
                                             <Star className='w-4 h-4 text-[#FDE047] inline-block '> </Star>
                                             <span>
                                                    {prestataire.evaluation}  (207)
                                             </span>
                                              
                                         </div>
                                    </div>
                               </div>
                               <div className='px-4 w-full text-xs flex flex-col gap-2'>
                                    <div className='flex gap-2 my-1'>
                                        <span>
                                            <MapPin className='w-4 h-4 text-green-500 inline-block mr-1'> </MapPin>  {prestataire.lieu}
                                        </span>
                                            <DisponibleButton >  2.3 km</DisponibleButton> 
                                    </div>
                                    <div>
                                        <CheckCircle className='w-4 h-4 text-green-500 inline-block mr-1'> </CheckCircle>                                        
                                        <span className='text-green-500'>  Disponible maintenant </span> 
                                    </div>
                               </div>
                               <div className="border m-4 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6  w-full">

                               </div> 
                               <div className='w-full px-4'>
                                    <div className='text-left '> 
                                        A partir de <span className='text-green-500 text-xl ml-2'> {prestataire.prix_diagnostic} GNF  </span> 
                                    </div>
                                    <div className="flex gap-2 my-6  justify-between">
                                        <PrimaryButtonOrange className={'py-4 rounded-lg bg-none text-green-500 dark:text-white border-2 w-40 dark:border-5 border border-green-500'}>
                                            <Phone> </Phone>
                                        </PrimaryButtonOrange >
                                        <PrimaryButton className={'text-white py-4 w-40 rounded-lg'}>
                                            Réserver
                                        </PrimaryButton >
                                    </div>
                               </div>
                            </div>                            
            
                        </motion.div>
  )
}
