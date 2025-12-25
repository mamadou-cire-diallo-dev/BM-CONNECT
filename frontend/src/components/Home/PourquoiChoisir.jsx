import { useRef } from 'react';
import { ValeurData } from '../../assets/dummy-data';
import Title from './Title';
import { PrimaryButtonOrange } from './Buttons';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';

export default function PourquoiChoisir() {
    const refs = useRef([]);
    return (
        <section id="valeurs" className="py-20 2xl:py-32 text-black">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Pourquoi choisir BM Connect ?"
                    heading="Une plateforme pensée pour les réalités africaines"
                    description="  Que ce soit pour une fuite d’eau, une panne électrique ou une climatisation en défaut, BM CONNECT vous connecte aux meilleurs maintenanciers proches de chez vous. Nos plombiers, électriciens et frigoristes sont sélectionnés, notés par les clients et suivis via la plateforme, pour vous garantir des interventions rapides, transparentes et sécurisées, du diagnostic au paiement. "
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ValeurData.map((valeur, i) => (
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
                             style={{background: `linear-gradient(to bottom right, ${valeur.codeCouleur}, ${valeur.degrade})`,  }}
                            >
                                {valeur.icon}
                            </div>
                            <h3 className="text-lg text-gray-900 dark:text-white font-semibold mb-2">{valeur.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {valeur.desc}
                            </p>
                            
            
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};