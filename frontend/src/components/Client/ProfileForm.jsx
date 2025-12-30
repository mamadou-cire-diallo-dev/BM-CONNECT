import React from 'react';
import { User, Building, Save } from 'lucide-react';

const ProfileForm = ({ formData, handleChange }) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-zinc-800">
                    <User className="text-orange-600" size={20} />
                    <h3 className="font-bold">Informations Personnelles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nom Complet</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Téléphone</label>
                        <input
                            type="text"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type de Compte</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                        >
                            <option value="PARTICULIER">Particulier</option>
                            <option value="ENTREPRISE">Entreprise</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adresse Complète</label>
                        <textarea
                            rows="2"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Sections Extra pour Entreprise */}
                {formData.type === 'ENTREPRISE' && (
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                            <Building className="text-orange-600" size={20} />
                            <h3 className="font-bold">Informations Légales</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">NIF (Numéro d'Identification Fiscale)</label>
                                <input
                                    type="text"
                                    name="nif"
                                    value={formData.nif}
                                    onChange={handleChange}
                                    placeholder="Ex: 123456789"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Siège Social</label>
                                <input
                                    type="text"
                                    name="siege"
                                    value={formData.siege}
                                    onChange={handleChange}
                                    placeholder="Ex: Kaloum, Av. de la République"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2">
                        <Save size={18} />
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
