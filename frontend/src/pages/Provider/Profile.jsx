import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Camera,
  Edit3,
  Globe,
  Calendar,
  Shield,
} from "lucide-react";
import ProfileHeader from "../../components/Provider/Profile/ProfileHeader";
import ProfileInfo from "../../components/Provider/Profile/ProfileInfo";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app this would come from an API/Context
  const [user, setUser] = useState({
    firstName: "Alpha Oumar",
    lastName: "Balde",
    email: "alphaoumar@gmail.com",
    phone: "+224 623 56 65 76",
    role: "Prestataire de services",
    location: "Conakry, Gunée",
    bio: "Professionnel passionné avec plus de 5 ans d'expérience dans la prestation de services de qualité. Spécialisé dans la satisfaction client et l'excellence opérationnelle.",
    avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
    cover:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    joinDate: "Janvier 2024",
    website: "www.alpha-services.com",
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-12 transition-colors duration-300">
      <ProfileHeader
        user={user}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          {/* Avatar */}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info Cards */}
          <ProfileInfo user={user} />

          {/* Right Column: Detailed Forms */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-800/50">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <User size={20} className="text-orange-500" />
                  Informations Personnelles
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Prénom
                  </label>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-medium">
                    {user.firstName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Nom
                  </label>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-medium">
                    {user.lastName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Email
                  </label>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    {user.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Téléphone
                  </label>
                  <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2">
                    <Phone size={16} className="text-slate-400" />
                    {user.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-800/50">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Shield size={20} className="text-orange-500" />
                  Sécurité & Confidentialité
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 mb-4">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      Mot de passe
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Dernière modification il y a 3 mois
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 shadow-sm rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-zinc-700 hover:text-orange-500 transition-colors dark:text-slate-200">
                    Modifier
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      Double authentification (2FA)
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Ajouter une couche de sécurité supplémentaire
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <div className="w-12 h-6 bg-slate-200 dark:bg-zinc-700 rounded-full cursor-pointer"></div>
                    <div className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-200 dark:border-zinc-700 left-0 top-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
