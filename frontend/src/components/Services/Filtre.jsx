import { useRef } from 'react';
import { trouveServicesData } from '../../assets/dummy-data';
import { PrimaryButton, PrimaryButtonOrange } from '../Home/Buttons';
import Title from '../Home/Title';
import Prestataires from './PrestatairesDispos/Prestataires';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';

export default function Filtre() {
    const refs = useRef([]);
    return (
        <section id="valeurs" className="py-20 2xl:py-32 my-10 w-full ">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Trouver des prestataires parfait"
                    heading="Des experts qualifiés près de chez vous, disponibles maintenant"
                    description=" "
                />

                <form className="flex flex-col gap-6 w-full ">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      {trouveServicesData.map((select, index) => (
                        <div className="rounded-2xl p-6 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6" >
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
                                    
                                    <option value={i} className='rounded-2xl p-6 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 hover:bg-red-800/3 '>
                                        {option}
                                    </option>
                                ) )}

                                    <div className={`w-12 h-12 rounded-lg text-white dark:bg-violet-900/20 flex items-center justify-center mb-4`}
                                    >
                                        {select.icon}
                                    </div>
                                    <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-2">{select.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                        {select.desc}
                                    </p>

                            </select>
                        </div>                         
                            
                       ))}
                    </div>
                    
                    <div className="flex gap-2 ">
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
                        <button type="submit">
                        <PrimaryButtonOrange>
                            Rechercher                         
                            </PrimaryButtonOrange>
                        </button>
                    </div>                   
                   
                </form>
                <Prestataires></Prestataires>

            </div>
        </section>
    );
};