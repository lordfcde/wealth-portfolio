'use client';

import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { User, EnvelopeSimple, Phone, MapPin, Camera, PencilSimple, FloppyDisk, X, Trash } from '@phosphor-icons/react';
import { useLanguage } from '../components/LanguageContext';

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    age: number | null;
    occupation: string;
    location: string;
    bio: string;
    avatar: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        id: 'usr_123456',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-06-15',
        age: 38,
        occupation: 'Software Engineer',
        location: 'San Francisco, CA',
        bio: 'Premium investor with 5+ years experience in crypto and precious metals.',
        avatar: '',
        createdAt: '2024-01-15',
    });

    const [formData, setFormData] = useState(profile);

    const handleSave = () => {
        setProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const handleDelete = () => {
        // In real implementation, this would call API to delete account
        console.log('Deleting account:', profile.id);
        setShowDeleteConfirm(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const inputClasses = "w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/10 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder-zinc-500";

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{t('profile.title')}</h1>
                    <p className="text-zinc-400">{t('profile.subtitle')}</p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 20 }}
                    className="liquid-glass rounded-2xl p-8 mb-6"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-3xl font-bold">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        `${profile.firstName[0] || ''}${profile.lastName[0] || ''}`
                                    )}
                                </div>
                                {isEditing && (
                                    <label className="absolute -bottom-2 -right-2 p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer transition-colors">
                                        <Camera size={16} />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-1">{profile.firstName} {profile.lastName}</h2>
                                <p className="text-zinc-400 mb-2">{profile.email}</p>
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                                    {t('dash.premium')}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
                                >
                                    <PencilSimple size={18} />
                                    {t('profile.edit')}
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
                                    >
                                        <FloppyDisk size={18} />
                                        {t('profile.save')}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 font-medium hover:bg-white/5 transition-colors"
                                    >
                                        <X size={18} />
                                        {t('profile.cancel')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.first_name')}</label>
                            <div className="relative">
                                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    disabled={!isEditing}
                                    className={`${inputClasses} pl-12`}
                                    placeholder={t('profile.placeholder.first_name')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.last_name')}</label>
                            <div className="relative">
                                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    disabled={!isEditing}
                                    className={`${inputClasses} pl-12`}
                                    placeholder={t('profile.placeholder.last_name')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.email')}</label>
                            <div className="relative">
                                <EnvelopeSimple size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!isEditing}
                                    className={`${inputClasses} pl-12`}
                                    placeholder={t('profile.placeholder.email')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.phone')}</label>
                            <div className="relative">
                                <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={!isEditing}
                                    className={`${inputClasses} pl-12`}
                                    placeholder={t('profile.placeholder.phone')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.location')}</label>
                            <div className="relative">
                                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    disabled={!isEditing}
                                    className={`${inputClasses} pl-12`}
                                    placeholder={t('profile.placeholder.location')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.dob')}</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    disabled={!isEditing}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.age')}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={formData.age || ''}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : null })}
                                    disabled={!isEditing}
                                    className={inputClasses}
                                    placeholder={t('profile.placeholder.age')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('profile.occupation')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.occupation || ''}
                                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                    disabled={!isEditing}
                                    className={inputClasses}
                                    placeholder={t('profile.placeholder.occupation')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">{t('profile.bio')}</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            disabled={!isEditing}
                            rows={4}
                            className={inputClasses}
                            placeholder={t('profile.placeholder.bio')}
                        />
                    </div>
                </motion.div>

                {/* Account Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
                    className="liquid-glass rounded-2xl p-8 mb-6"
                >
                    <h3 className="text-lg font-semibold mb-4">{t('profile.acc_info')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-zinc-400">{t('profile.user_id')}</span>
                            <div className="font-mono text-sm">{profile.id}</div>
                        </div>
                        <div>
                            <span className="text-sm text-zinc-400">{t('profile.member_since')}</span>
                            <div>{new Date(profile.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
                    className="liquid-glass rounded-2xl p-8 border border-red-500/20"
                >
                    <h3 className="text-lg font-semibold mb-2 text-red-400">{t('profile.danger')}</h3>
                    <p className="text-zinc-400 text-sm mb-4">
                        {t('profile.danger.desc')}
                    </p>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <Trash size={18} />
                        {t('profile.delete')}
                    </button>
                </motion.div>

                {/* Delete Confirmation Modal */}
                {
                    showDeleteConfirm && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="liquid-glass rounded-2xl p-6 max-w-md w-full"
                            >
                                <h3 className="text-xl font-semibold mb-4">{t('profile.delete.modal.title')}</h3>
                                <p className="text-zinc-400 mb-6">
                                    {t('profile.delete.modal.desc')}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 transition-colors"
                                    >
                                        {t('profile.cancel')}
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                                    >
                                        {t('profile.delete')}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </div >
        </DashboardLayout >
    );
}
