import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import TitleConnexion from '../../components/Inscription/TitleConnexion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Eye, EyeOff } from "lucide-react";

import { PrimaryButton } from '../../components/Home/Buttons'

export default function NewPassworde() {

     // la gestion du formulaire avec useForm
    const {handleSubmit, register, watch, setValue ,formState: {errors} } = useForm()

    // la gestion de la navigation avec useNavigate
    const navigate = useNavigate()

    // faire en sorte qu'il ne puisse pas accéder à la connexion une fois connecter 
    useEffect(() => {
        // if (localStorage.getItem("utilisateur")) {
        //     navigate('/')
        // }
    })

    // la fonction de connexion

    const onSubmit = (data) => {

            if (data ) {
                // enregistrement de ces infos dans le local storage
                console.log(data);
                // renvoit le user sur l'acceuil
                navigate("/connexion")
                toast.success("mot de passe réinitialiser avec succès !")
           
            } else {
                toast.error('vos identifiants sont incorrectes !')
            }       
    }

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
  return (
    <div className=' flex items-center bg-linear-to-br from-[#3f7accff] to-[#0F172A] pt-5 pb-10  h-screen w-full'>
        <div className="rounded md:w-[500px] w-full m-auto bg-white rounded-xl h-max px-4 py-2 pb-10 border">
        <div className=''>
          <Link to={'/forgotPassword'} className={`text-left text-gray-500  `}>
            <ArrowLeft className={`inline-block mr-2`}> </ArrowLeft>           
            <span className=''> </span>
        </Link>
        </div>
            <TitleConnexion
            texte=""
            taille="3xl"
            />
            <span className='text-gray-700 md:ml-30 ml-15 mt-5'> Modification du mot de pass  </span>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col px-4 gap-7 py-2 text-gray-700' >
                                {/* NEW PASSWORD */}
                <div>
                <label className="block mb-1 text-sm font-medium">
                    Nouveau mot de passe
                </label>

                <div className="relative">
                    <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("newPassword", {
                        required: "Mot de passe requis",
                        minLength: {
                        value: 8,
                        message: "Minimum 8 caractères",
                        },
                        pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                        message:
                            "Au moins 8 caractères avec majuscule, minuscule, chiffre et caractère spécial",
                        }
                    })}
                    className="
                        w-full px-4 py-3 pr-12 rounded-xl
                        bg-black/5 dark:bg-white/5
                        border border-black/10 dark:border-white/15

                        transition-all
                        hover:border-[#f26f0e]/60

                        focus:outline-none
                        focus:border-[#f26f0e]
                        focus:ring-2 focus:ring-[#f26f0e]/30
                    "
                    />

                    <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="
                        absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-[#f26f0e]
                        transition
                    "
                    >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                    </p>
                )}
                </div>


                {/* CONFIRM PASSWORD */}
                <div>
                <label className="block mb-1 text-sm font-medium">
                    Confirmer le mot de passe
                </label>

                <div className="relative">
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                        required: "Confirmation requise",
                        validate: (value) =>
                        value === watch("newPassword") ||
                        "Les mots de passe ne correspondent pas",
                    })}
                    className="
                        w-full px-4 py-3 pr-12 rounded-xl
                        bg-black/5 dark:bg-white/5
                        border border-black/10 dark:border-white/15

                        transition-all
                        hover:border-[#f26f0e]/60

                        focus:outline-none
                        focus:border-[#f26f0e]
                        focus:ring-2 focus:ring-[#f26f0e]/30
                    "
                    />

                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="
                        absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-[#f26f0e]
                        transition
                    "
                    >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                    </p>
                )}
                </div>


                <PrimaryButton type="submit" className="w-full rounded-xl p-2 text-white ">
                      Envoyez
                  </PrimaryButton>
            </form>
        </div>
        
    </div>
  )
}
