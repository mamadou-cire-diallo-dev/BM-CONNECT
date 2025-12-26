import { useRef } from 'react';
import { PrimaryButton, PrimaryButtonOrange } from '../Home/Buttons';
import Title from '../Home/Title';
import TitleService from './TitleService';
import Prestataires from './PrestatairesDispos/Prestataires';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';
import FormulaireFiltre from './FormulaireFiltre';
export default function Filtre() {
    const refs = useRef([]);
    return (
        <section id="filtre" className="py-20 2xl:py-32 my-10 w-full text-black ">
            <div className="max-w-6xl mx-auto px-4" >
                
                <TitleService
                    title="Trouver des prestataires parfait"
                    heading="Des experts qualifiés près de chez vous, disponibles maintenant"
                    description=" "
                    textHead="text-center"
                />
                <FormulaireFiltre> </FormulaireFiltre>
                <Prestataires></Prestataires>

            </div>
        </section>
    );
};