import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import TitleConnexion from '../../components/Inscription/TitleConnexion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useEffect } from 'react'
import { PrimaryButton } from '../../components/Home/Buttons'

export default function RenitializePassword() {

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
                const otpCode = data.otp.join("");
                console.log("OTP:", otpCode);
                // renvoit le user sur l'acceuil
                navigate("/newPassword")
                toast.success('Vérification effectuée !')
           
            } else {
                toast.error('vos identifiants sont incorrectes !')
            }       
    }
    
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
            <span className='text-gray-700 md:ml-20 ml-15 mt-5'> Entrer le code envoyé dans votre boîte email </span>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col px-4 gap-7 py-2 ' >
              <div className="flex justify-center gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    autoComplete="one-time-code"

                    {...register(`otp.${index}`, {
                      required: true,
                      pattern: /^[a-zA-Z0-9]$/,
                    })}

                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toUpperCase();

                      setValue(`otp.${index}`, value);

                      if (value && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}

                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !watch(`otp.${index}`) &&
                        e.target.previousSibling
                      ) {
                        e.target.previousSibling.focus();
                      }
                    }}

                    className="
                      w-12 h-14 text-center text-xl font-bold
                      rounded-xl border
                      bg-black/5 dark:bg-white/5

                      transition-all
                      hover:border-[#f26f0e]/60
                      text-gray-700
                      focus:outline-none
                      focus:border-[#f26f0e]
                      focus:ring-2 focus:ring-[#f26f0e]/30
                    "
                  />
                ))}
                </div>     
                {errors.otp && (
                  <p className="text-red-500 text-sm text-center">
                    Caractère invalide
                  </p>
                )}

                <PrimaryButton type="submit" className="w-full rounded-xl p-2 text-white ">
                      Vérifier le code
                  </PrimaryButton>
            </form>
        </div>
        
    </div>
  )
}
