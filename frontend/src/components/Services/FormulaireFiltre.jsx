import React from 'react'
import { trouveServicesData } from '../../assets/dummy-data';
import { motion } from 'framer-motion';
import { PrimaryButton, PrimaryButtonOrange } from '../Home/Buttons';


export default function FormulaireFiltre() {
  return (
    
                <form className="flex flex-col gap-6 w-full dark:text-white " id="formulaire">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      {trouveServicesData.map((select, index) => (
                        <div className="rounded-2xl p-6 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6  "
                        key={index}
                        >
                            <div className='flex justify-between'>
                                <span>
                                    {select.desc}
                                </span>
                                <span>
                                    {select.icon}
                                </span>
                                
                            </div>
                            <select 
                            className='w-full mt-5 rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 focus:outline-none focus:border-[#f26f0e]'
                                name={`${select.name}`}
                                key={index}
                            >
                                {select.option.map((option,i) => (
                                    
                                    <option value={i}
                                    key={i}
                                     className='rounded-2xl p-6 bg-black/3 dark:bg-white/3 dark:text-black border border-black/6 dark:border-white/6 hover:bg-red-800/3 '>
                                        {option}
                                    </option>
                                ) )}



                            </select>
                        </div>                         
                            
                       ))}
                    </div>
                    
                    <div className="flex gap-2 items-center ">
                        <div className="rounded-2xl w-full px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6">
                             <div className='flex  justify-between'>
                                <span>
                                    Description de la panne
                                </span>
                                <span>
                                    
                                </span>
                                
                            </div>
                            <textarea name="description_panne" id="" className='w-full text-xs mt-5 rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 focus:outline-none focus:border-[#f26f0e]  ' placeholder='Entrer une petite description' rows={1} >

                            </textarea>
                        </div>
                        <button type="submit" className='inline items-center justify-center gap-2 rounded-xl h-15 px-4 py-2 text-sm font-medium bg-linear-to-br from-[#f26f0e] to-[#ffbf47] text-[#0d2e55]  hover:opacity-90 active:scale-95 transition-all'>
                            Rechercher                         
                        </button>
                    </div>                   
                   
                </form>
  )
}
