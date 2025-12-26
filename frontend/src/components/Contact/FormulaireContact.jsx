import React from 'react'
import { motion } from 'framer-motion'
import TitleService from '../Services/TitleService'
import { PrimaryButton } from '../Home/Buttons'
function FormulaireContact() {
  return (
     <div className='w-full  md:w-1/2 pb-5 h-max rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6'>
        <h4 className='text-lg font-medium text-[#f26f0e] dark:text-[#f26f0e] uppercase tracking-wide mb-1 py-5'>
            Envoyez-nous un message
        </h4>
        <form className="flex flex-col gap-5 w-full dark:text-white " >
            <div className='w-full rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 focus:outline-none focus:border-[#f26f0e]' >
                    <input type="email" name="" id="" placeholder='votre@email.com' className='w-full outline-none' />
            </div>
            <div className='w-full rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 focus:outline-none focus:border-[#f26f0e]' >
                    <select name="" id="" className='w-full outline-none'>
                        <option value="1" disabled selected> sélectionner un sujet </option>
                    </select>
            </div>
            <div className='w-full rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 focus:outline-none focus:border-[#f26f0e]' >
                <textarea name="" id="" rows="3" className='w-full outline-none ' placeholder='Décrivez votre demande en détail'></textarea>
            </div>
            
            <PrimaryButton  type="submit" className="text-white mt-3">
                Soumettre
            </PrimaryButton>
       </form>
     </div>
  )
}

export default FormulaireContact