import { motion } from 'framer-motion';

export default function TitleService({ title, heading, description }) {

    return (
        <div className="text-center mb-16">
            {title && (
                <motion.p
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                    className="text-sm font-medium text-[#f26f0e] dark:text-[#f26f0e] uppercase tracking-wide mb-3"
                >
                    {title}
                </motion.p>
            )}
            {heading && (
                <motion.h2 className="text-xl md:text-2xl text-gray-900 text-left dark:text-white font-semibold"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                >
                    {heading}
                </motion.h2>
            )}
            {description && (
                <motion.p className='max-w-md mx-auto text-md  text-black-600 dark:text-gray-400 my-3'
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}