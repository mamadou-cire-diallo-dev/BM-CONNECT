import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import TitleConnexion from '../../components/Inscription/TitleConnexion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useEffect } from 'react'
import { PrimaryButton } from '../../components/Home/Buttons'

export default function Connexion() {

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
                
                toast.success('Connexion réussie')
            } else {
                toast.error('vos identifiants sont incorrectes !')
            }       
    }
    
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
            <span className='text-gray-700 md:ml-35 ml-15'> Accedez à votre compte</span>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col gap-6 px-4 py-2 ' >
                <div className='  flex flex-col text-black gap-4  '>
                    <label htmlFor="id_for">Téléphone / Email</label>                  
                    <input
                        type="text"
                        name="identifiant"
                        placeholder="+224 XXXXXXXXX"
                        autoComplete="username"
                        inputMode="email"
                        id="id_for"
                        {...register("identifiant", {
                        required: "Ce champ est obligatoire",
                        validate: (value) => {
                            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                            const isPhone = /^\+224\s6\d{8}$/.test(value);

                            return (
                            isEmail ||
                            isPhone ||
                            "Entrez un email valide ou un numéro au format +224 6XXXXXXXX"
                            );
                        },
                        })}
                        className='bg-black/3 w-full  border border-black/6 flex rounded rounded-xl p-2 flex-col hover:outline-none focus:outline-none'
                    />
                    <span className="text-red-500 ">
                        {errors.identifiant && (
                        <p className="text-red-500 text-sm">
                            {errors.identifiant.message}
                        </p>
                        )}
                    </span>
                </div>
                <div className=' flex flex-col text-black gap-4 '>
                    <label htmlFor="motpass">Mot de passe </label>                  
                    <input
                        type="password"
                        name="motDePass"
                        autoComplete="username"
                        inputMode="email"
                        placeholder='............'
                        id="motpass"
                        {...register('passwordUser', {required:"Veuillez saisir un mot de pass",  minLength : {value:6, message:"le mot de pass est obligatoire" }})}
                        className='bg-black/3 w-full  border border-black/6 flex rounded rounded-xl p-2 flex-col hover:outline-none focus:outline-none'
                    />
                    <span className="text-red-500 ">
                        {errors.motDePass && (
                        <p className="text-red-500 text-sm">
                            {errors.motDePass.message}
                        </p>
                        )}
                    </span>
                </div>
                <PrimaryButton type="submit" className="w-full rounded-xl p-2 text-white ">
                    Se connecter
                </PrimaryButton>
            </form>
            <div className='flex flex-col items-center py-5'>
                <Link to={'/forgotPassword'} className='relative px-3  hover:font-medium text-[#f26f0e] transition-all duration-300 ease-out hover:text-[#f26f0e] hover:font-semibold focus:outline-none focus:text-[#f26f0e] focus:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f26f0e] after:transition-all after:duration-300 hover:after:w-full focus:after:w-full'>
                    Mot de pass oublié ?
                </Link>
               
                <div className='text-gray-500 mt-2'> 
                    Pas encore de compte ?  <Link to={'/inscription'} className='relative px-3  font-medium text-[#f26f0e] transition-all duration-300 ease-out hover:text-[#f26f0e] hover:font-semibold focus:outline-none focus:text-[#f26f0e] focus:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f26f0e] after:transition-all after:duration-300 hover:after:w-full focus:after:w-full'>
                                                Créer un compte
                                            </Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}
