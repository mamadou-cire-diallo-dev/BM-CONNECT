import React from 'react'
import TitleConnexion from '../../components/Inscription/TitleConnexion'
import OptionConnexion from '../../components/Inscription/OptionConnexion'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTheme } from "../../features/themeSlice";
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Inscription() {
  const dispatch = useDispatch();
  // Initial load of theme
  useEffect(() => {
    dispatch(loadTheme());
  }, []);

  return (
    <div className="bg-linear-to-br from-[#3f7accff] to-[#0F172A]   h-screen">
        <div className='pt-2 ml-7'>
          <Link to={'/home'} className={`text-left text-white mt-10 font-bold  `}>
            <ArrowLeft className={`inline-block mr-2`}> </ArrowLeft>           
            <span className='mt-5'> Acceuil</span>
        </Link>
        </div>
        <div className='flex flex-col items-center  gap-20 '>
           <TitleConnexion 
            texte="Choisissez votre type de compte"
            taille="5xl"
            className='w-full flex flex-col items-center'
            btnAcceuil="text-white items-start"
            />
            <OptionConnexion> </OptionConnexion>
        </div>
    </div>
    
      
   
  );
}

