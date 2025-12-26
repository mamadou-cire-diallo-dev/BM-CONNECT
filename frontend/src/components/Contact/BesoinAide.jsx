import React from 'react'
import { useRef } from 'react'
import { PrimaryButton } from '../Home/Buttons'
import { MessageCircle } from 'lucide-react'
import { heureOuvertureData } from '../../assets/dummy-data'
import { questionsData } from '../../assets/dummy-data'
import { ChevronDownIcon } from 'lucide-react'
import { motion } from 'framer-motion';

function BesoinAide() {
  const refs = useRef([]);
  return (
     <div className=" w-full md:w-1/2 flex flex-col gap-3 ">
        <div className="px-6 py-4  flex flex-col gap-3 h-max  rounded-2xl bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6">
            <h4 className='font-medium text-[#f26f0e] dark:text-[#f26f0e] uppercase tracking-wide text-lg'>
                Besoin d'aide immédiate ?
            </h4>
            <p>
                Notre équipe est disponible pour vous assister en temps réel via WhatsApp.
            </p>
            <PrimaryButton className="text-white w-full text-center ">
                <MessageCircle></MessageCircle>
                    Chatter  sur whatsapp
            </PrimaryButton>
        </div>
        <div className="px-6 py-4  rounded-2xl bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6">
            <h4 className='mb-4'>
                Heures d'ouvertures
            </h4>
            <div className='flex flex-col gap-3'>
                {heureOuvertureData.map((heure,i) => (
                    <div className="flex gap-2 items-start  text-sm" key={i}>
                        <div className='mt-1'>
                            {heure.icon}
                        </div>
                        <div className='flex gap-1 flex-col'>
                            <span> {heure.jours}        </span>
                            <span className='text-gray-500'>  {heure.heure} </span>
                        </div>
                    </div>
                ))}
                
            </div>

        </div>
        <div className="px-4 py-2   rounded-2xl px-4 py-2 bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6">
            <h4>
                Questions Fréquentes
            </h4>
            <ul className="space-y-3">
                    {questionsData.map((question, i) => (
                        <motion.details
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
                                    card.classList.add("transition", "duration-300");
                                }
                            }}
                            className="group bg-white/6 rounded-xl select-none"
                        >
                            <summary className="flex items-center justify-between  cursor-pointer">
                                <h4 className="font-medium text-[#f26f0e]">{question.question}</h4>
                                <ChevronDownIcon className="w-5 h-5 text-gray-300 group-open:rotate-180 transition-transform" />
                            </summary>
                            <p className="p-4 pt-0 text-sm text-gray-900 leading-relaxed dark:text-gray-300 ">
                                {question.answer}
                            </p>
                        </motion.details>
                    ))}
            
            </ul>
            
        </div>
     </div>
  )
}

export default BesoinAide