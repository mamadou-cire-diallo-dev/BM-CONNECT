import { useRef } from 'react';
import { prestatairesDispo } from '../../../assets/dummy-data';
import TitleService from '../TitleService';
import PrestatairesDispos from './PrestatairesDispos';
import PrestatairesNonDispos from './PrestatairesNonDispos';

export default function Prestataires() {
    const refs = useRef([]);
    return (
        <section id="listPrestataires" className="py-20 2xl:py-32">
            <div className="max-w-6xl mx-auto px-4">

                <TitleService
                    title=""
                    heading="6 prestataires disponible"
                    description=" "
                    textHead="text-left"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prestatairesDispo.map((prestataire, i) => {
                        if(prestataire.status ==1) {
                           return <PrestatairesDispos prestataire={prestataire} i={i} key={i} > </PrestatairesDispos>
                        }
                        else {
                            return <PrestatairesNonDispos prestataire={prestataire} i={i} key={i} > </PrestatairesNonDispos>
                        }
                    })}
                </div>
            </div>
        </section>
    );
};