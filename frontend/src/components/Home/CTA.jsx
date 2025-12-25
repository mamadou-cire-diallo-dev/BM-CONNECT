import { ArrowRightIcon } from 'lucide-react';
import { GhostButton, PrimaryButton,PrimaryButtonOrange } from './Buttons';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="py-20 2xl:pb-32 px-4 text-black">
            <div className="container mx-auto max-w-3xl">
                <div className="rounded-3xl bg-linear-to-br from-[#0d2e55] to-[#0a2444] border border-violet-500/20 p-12 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <motion.h2 className="text-2xl sm:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-linear-to-br from-[#f26f0e] to-[#ffb347]"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                        >
                           Prêt à commencer ?
                        </motion.h2>
                        <motion.p className="max-sm:text-sm text-slate-100 mb-10 max-w-xl mx-auto"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                        >
                            Rejoignez des milliers d'utilisateurs qui font confiance à BMConnect pour leurs besoins en maintenance
                        </motion.p>
                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
                        >
                            <PrimaryButtonOrange className="px-8 py-3 gap-2 hover:translate-x-2 transform transition duration-300 ease-in-out ">
                                Créer un compte gratuitement <ArrowRightIcon size={20} className='hover:translate-x-2 transform transition duration-300 ease-in-out' />
                            </PrimaryButtonOrange>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};