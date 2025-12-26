import React from 'react'
import LogoSvg from './LogoSvg'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function TitleConnexion({texte,taille,className, btnAcceuil, ...props }) {
  return (
    <div className={`${className}`} {...props}>
       <div className=" mb-5 select-none">
        <Link to="" className='flex flex-col items-center'>
          <LogoSvg> </LogoSvg>
          <span className={` text-[#0d2e55] font-semibold   text-${taille}  tracking-tight leading-none top-[2px]  `}>
            BM<span className="text-[#f26f0e]">Connect</span>
          </span>
        </Link>
        </div>
        {texte && <p className='text-white text-xl mt-5 '>
            {texte}
        </p> }
    </div>
  )
}
