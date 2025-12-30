import React, { useState } from 'react';

// Extracted Components
import ProfileAvatar from '../../components/Client/ProfileAvatar';
import ProfileForm from '../../components/Client/ProfileForm';

const Profile = () => {
    // Initial mock state
    const [formData, setFormData] = useState({
        nom: "Aissatou Barry",
        email: "aissatou.barry@example.com",
        telephone: "+224 621 11 12 22",
        type: "PARTICULIER", // or ENTREPRISE
        adresse: "Ratoma, Conakry",
        nif: "",
        siege: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Mon Profil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Basic Info */}
                <ProfileAvatar formData={formData} />

                {/* Right Column: Edit Form */}
                <ProfileForm formData={formData} handleChange={handleChange} />
            </div>
        </div>
    );
};

export default Profile;
