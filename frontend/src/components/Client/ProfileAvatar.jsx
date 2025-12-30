import React from 'react';
import { Mail, Phone, MapPin, Camera } from 'lucide-react';
import { assets } from '../../assets/assets';

const ProfileAvatar = ({ formData }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center">
                <div className="relative mb-4 group">
                    <img
                        src={assets.profile_img_a}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-50 dark:ring-zinc-800"
                    />
                    <button className="absolute bottom-1 right-1 p-2 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                        <Camera size={16} />
                    </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{formData.nom}</h2>
                <p className="text-sm text-gray-500 font-medium mb-4">{formData.type}</p>

                <div className="w-full pt-6 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400 text-left">
                    <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400" />
                        <span className="truncate">{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={16} className="text-gray-400" />
                        <span>{formData.telephone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{formData.adresse}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAvatar;
