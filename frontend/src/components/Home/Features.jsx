import { useRef } from 'react';
import { featuresData } from '../../assets/dummy-data';
import Title from './Title';
import { PrimaryButton } from './Buttons';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
    const refs = useRef([]);
    return (
        <section id="features" className="py-20 2xl:py-32">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Services"
                    heading="Nos experts qualifiés pour tous vos besoins"
                    description=" BM CONNECT vous met en relation avec des techniciens de confiance pour tous vos besoins en plomberie, électricité et climatisation. En quelques clics, vous réservez un professionnel vérifié, suivez son arrivée en temps réel et payez en toute sécurité depuis la plateforme."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuresData.map((feature, i) => (
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
                            <div className="w-12 h-12 rounded-lg text-white bg-linear-to-br from-[#0d2e55] to-[#0a2444]   dark:bg-violet-900/20 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg bg-clip-text text-transparent bg-linear-to-br from-[#f26f0e] to-[#ffb347] dark:text-white font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                            <ul className='flex flex-col gap-4 my-5'>
                                {feature.detail.map((detail,i) => (
                                    <li key={i} className='flex gap-2'> 
                                    <CheckIcon className='text-[#f26f0e]'> </CheckIcon>
                                       <span className='text-sm'>
                                        {detail}
                                        </span> 
                                    </li>
                                ))}
                            </ul>
                            <PrimaryButton className={'text-white hover:translate-x-2 '}>
                                <Link to={'/services'} className='flex  gap-2 items-center'> 
                                Reserver maintenant 
                                <ArrowRightIcon className="size-4 hover:translate-x-2 transform transition duration-300 ease-in-out hover:scale-110" /> 
                                 </Link>
                                
                            </PrimaryButton>
                            
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};