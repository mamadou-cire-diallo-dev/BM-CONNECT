import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import TitleConnexion from '../../components/Inscription/TitleConnexion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { PrimaryButton } from '../../components/Home/Buttons'
import { Eye , EyeOff} from 'lucide-react'

export default function InscriptionPrestataire() {

     // la gestion du formulaire avec useForm
    const {handleSubmit, register, watch,formState: {errors} } = useForm()

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
                localStorage.setItem("utilisateur",JSON.stringify(data[0]))
                // renvoit le user sur l'acceuil
                navigate("/")
                console.log(data);
                
                toast.success('Inscription effectuée')
            } else {
                toast.error('vos identifiants sont incorrectes !')
            }       
    }

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
  return (
    <div className=' flex items-center bg-linear-to-br from-[#3f7accff] to-[#0F172A] pt-5 pb-10  h-max w-full'>
        <div className="rounded md:w-[500px] w-max m-auto bg-white rounded-xl h-max px-4 py-2 border">
        <div className=''>
          <Link to={'/home'} className={`text-left text-gray-500  `}>
            <ArrowLeft className={`inline-block mr-2`}> </ArrowLeft>           
            <span className=''> </span>
        </Link>
        </div>
            <TitleConnexion
            texte=""
            taille="3xl"
            />
            <span className='text-gray-700 md:ml-25 my-8 text-xl text-left font-semibold  block ml-15'> Créer votre compte prestataire </span>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col px-4 py-2 gap-6 ' >
                <div className='text-black'>
                <label className="block mb-1 text-sm font-medium">
                    Nom et Prénoms
                </label>

                <div className="relative">
                    <input
                    type="text"
                    name='nomUser'
                    placeholder="entrez votre nom complet"
                    {...register('nomUser', {required:"Veuillez saisir un nom",  minLength : {value:3, message:"veuillez saisir un nom de plus de 2 caractère" }})}
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
                </div>

                {errors.nomUser && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.nomUser.message}
                    </p>
                )}
                </div>

                <div className='text-black'>
                <label className="block mb-1 text-sm font-medium">
                    Email
                </label>

                <div className="relative">
                    <input
                    type="email"
                    name='emailUser'
                    placeholder="votre@email.com"
                    {...register('emailUser', {required:"Veuillez saisir un email", pattern:"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"})}
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
                </div>

                {errors.emailUser && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.emailUser.message}
                    </p>
                )}
                </div>


                <div className='text-black'>
                <label className="block mb-1 text-sm font-medium">
                Téléphone
                </label>

                <div className="relative">
                    <input
                    type="tel"
                    name='telUser'
                    autoComplete='tel'
                    placeholder="+224 XXXXXXXXX"
                    {...register("phone", {
                        required: "Numéro de téléphone requis",
                        pattern: {
                        value: /^\+224\s\d{9}$/,
                        message: "Format attendu : +224 625856135",
                        },
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
                </div>

                {errors.telUser && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.telUser.message}
                    </p>
                )}
                </div>



                <div className='text-black'>
                <label className="block mb-1 text-sm font-medium">
                    Mot de passe
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
                <div className='text-black'>
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
                <div className='text-black '>

                <div className="relative">
                    <input type="hidden" {...register("role")} value="prestataire" />
                </div>
                </div>
                

                <PrimaryButton type="submit" className="w-full rounded-xl p-2 text-white ">
                    S'inscrire
                </PrimaryButton>
            </form>
            <div className='flex flex-col items-center py-5 pt-3'>
               
                <div className='text-gray-500 mt-2'> 
                    vous avez déjà un compte ?  <Link to={'/connexion'} className='relative px-3  font-medium text-[#f26f0e] transition-all duration-300 ease-out hover:text-[#f26f0e] hover:font-semibold focus:outline-none focus:text-[#f26f0e] focus:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f26f0e] after:transition-all after:duration-300 hover:after:w-full focus:after:w-full'>
                                                Connectez-vous
                                            </Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}
