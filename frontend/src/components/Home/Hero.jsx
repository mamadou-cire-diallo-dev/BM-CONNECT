import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';
import { PrimaryButton, GhostButton, DisponibleButton } from './Buttons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import mKourouma from '../../assets/imagesMaintenancier/mKourouma.webp'
import mCisse from '../../assets/imagesMaintenancier/mCisse.jpg'
import mMamadou from '../../assets/imagesMaintenancier/mMamadou.avif'
import jeunesMaintenancier from '../../assets/imagesMaintenancier/groupeMaintenancierReel.png'

export default function Hero() {

    const trustedUserImages = [
        mMamadou,
        mKourouma,
        mCisse
    ];


    const galleryStripImages = [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=100',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=100',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=100',
    ];

    const trustedLogosText = [
        'Maintenances',
        'Géolocalisations',
        'Paiement instantanée',
        'Garantie Litige'
    ];
    const listAcquis = [
        {name:"Prestataires", statistique:"500 +", icon: <DisponibleButton/> } ,
        {name:"Clients satisfaits", statistique:"1000 +" , icon:<CheckIcon className="size-4 text-green-500" />} ,
        {name:"Services complétés", statistique:"2000 +", icon:<CheckIcon className="size-4 text-green-500" />} ,
        {name:"Notes moyenne", statistique:"4.8/5", icon:<ZapIcon className="size-4 text-green-500" />} ,
    ]
    return (
        <>
            <section id="home" className="relative z-10 text-black dark:text-white">
                <div className="max-w-6xl mx-auto px-4 min-h-screen max-md:w-screen max-md:overflow-hidden pt-32 md:pt-26 flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-left">
                            <motion.div  className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full bg-black/10 dark:bg-white/10 mb-6 justify-start"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                            >
                                <div className="flex -space-x-2">
                                    {trustedUserImages.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Client ${i + 1}`}
                                            className="size-10 rounded-full border border-black/50"
                                            width={40}
                                            height={40}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs  ml-10 md:ml-0 text-gray-900 dark:text-gray-200/90">
                                    Approuvée par les marques et les fondateurs du monde entier
                                </span>
                            </motion.div>

                            <motion.h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-xl"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                            >
                                Trouvez des experts <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-br from-[#f26f0e] to-[#ffb347]">
                                    en maintenance près de chez vous
                                </span>
                            </motion.h1>

                            <motion.p className="text-gray-800 dark:text-gray-300 max-w-lg mb-8"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                            >
                               La première plateforme guinéenne qui connecte clients, prestataires et vendeurs de pièces détachées. Rapide, fiable et accessible à tous.
                            </motion.p>

                            <motion.div className="flex flex-col sm:flex-row items-center gap-4 mb-8"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
                            >
                                    <PrimaryButton className="max-sm:w-full text-white py-3 px-7 hover:translate-x-2 transform transition duration-300 ease-in-out">
                                      <Link to={'/services'}>
                                      Commencez maintenant
                                      </Link>                                       
                                        <ArrowRightIcon className="size-4 hover:translate-x-2 transform transition duration-300 ease-in-out" />
                                    </PrimaryButton>

                                <GhostButton className="max-sm:w-ful text-black/80 dark:text-white max-sm:justify-center py-3 px-5">
                                    <PlayIcon className="size-4" />
                                    En Savoir plus
                                </GhostButton>
                            </motion.div>

                            <motion.div className="flex flex-wrap md:flex-no-wrap gap-4 md:gap-0 w-full md:w-max sm:inline-flex overflow-hidden items-center max-sm:justify-center text-sm dark:text-gray-200 bg-black/10 dark:bg-white/10 rounded"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                            >
                                
                                {listAcquis.map((acquis,index) => (
                                 <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 px-3 sm:px-4 w-max  hover:bg-white/3 transition-colors">
                                     {acquis.icon}
                                    <div>
                                        <div className='text-2xl w-max '>{acquis.statistique}</div>
                                        <div className="text-md text-gray-800 dark:text-gray-300">
                                            {acquis.name}
                                        </div>
                                    </div>
                                </div>
                                ) )}

                                <div className="hidden sm:block h-6 w-px bg-white/6" />

                            </motion.div>
                        </div>

                        {/* Right: modern mockup card */}
                        <motion.div className="mx-auto w-full max-w-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.5 }}
                        >
                            <motion.div className=" relative rounded-3xl overflow-hidden border border-black/5 dark:border-white/6 shadow-2xl bg-linear-to-br from-[#0d2e55] to-[#0a2444] rounded rounded-xl py-2 px-4 origin-left rotate-[-3deg] ">
                                    <div className="relative aspect-16/10 bg-gray-900 rounded rounded-xl rotate-[3deg]">
                                        <img
                                            src={jeunesMaintenancier}
                                            alt="agency-work-preview"
                                            className="w-full h-full object-cover object-center rounded rounded-xl"
                                        />

                                        <div className="absolute left-4 text-white top-4 px-3 py-1 rounded-full bg-black/15 backdrop-blur-sm text-xs">
                                           <DisponibleButton> vos services de maintenance à la minute près </DisponibleButton> 
                                        </div>

                                        <div className="absolute right-4 bottom-4">
                                            <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/6 backdrop-blur-sm hover:bg-white/10 transition focus:outline-none">
                                                <PlayIcon className="size-4" />
                                                <span className="text-xs text-black"> Comment ça marche</span>
                                            </button>
                                        </div>
                                   </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* LOGO MARQUEE */}
            <motion.section className="border-y border-black/6 dark:border-white/6 bg-black/1 dark:bg-white/1 max-md:mt-10"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="w-full overflow-hidden py-6">
                        <div className="flex gap-14 items-center justify-center animate-marquee whitespace-nowrap">
                            {trustedLogosText.concat(trustedLogosText).map((logo, i) => (
                                <span
                                    key={i}
                                    className="mx-6 text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-300 tracking-wide transition-colors"
                                >
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};