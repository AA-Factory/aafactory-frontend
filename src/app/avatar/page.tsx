'use client';

import React, { useState } from 'react';
import { User, Plus, Check, Edit, Trash2, Camera, Mic, Heart } from 'lucide-react';

interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  voiceId: string;
  createdAt: string;
  personality: string;
  background: string;
}

// Mock data for existing avatars
const mockAvatars: Avatar[] = [
  {
    id: '1',
    name: 'Luna',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    voiceId: 'voice_001',
    createdAt: '2024-01-15',
    personality: 'Wise and mystical, with a deep connection to nature and ancient knowledge. Luna speaks with gentle authority and offers profound insights.',
    background: 'A former forest guardian who has spent centuries protecting sacred groves. She possesses knowledge of herbal remedies and ancient rituals.'
  },
  {
    id: '2',
    name: 'Marcus',
    imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    voiceId: 'voice_002',
    createdAt: '2024-01-10',
    personality: 'Confident and charismatic leader with a strategic mind. Marcus is decisive, inspiring, and always ready to take charge in difficult situations.',
    background: 'A former military commander turned business strategist. He has led teams through challenging campaigns and complex negotiations.'
  },
  {
    id: '3',
    name: 'Aria',
    imageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    voiceId: 'voice_003',
    createdAt: '2024-01-08',
    personality: 'Creative and empathetic artist with a passion for storytelling. Aria is imaginative, emotionally intelligent, and deeply intuitive.',
    background: 'A renowned storyteller and artist who travels between worlds, collecting tales and creating beautiful narratives that touch the soul.'
  }
];

export default function AvatarSelectionPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [activeAvatarId, setActiveAvatarId] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>(mockAvatars);
  
  // Modal states
  const [showUseConfirmModal, setShowUseConfirmModal] = useState(false);
  const [avatarToConfirmUseId, setAvatarToConfirmUseId] = useState<string | null>(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [avatarToDeleteId, setAvatarToDeleteId] = useState<string | null>(null);

  const handleCreateNewAvatar = () => {
    // Navigate to create avatar page (adjust route as needed)
    window.location.href = '/avatar/create';
  };

  const handleEditAvatar = (e: React.MouseEvent, avatarId: string) => {
    e.stopPropagation();
    // Navigate to edit avatar page with ID (adjust route as needed)
    window.location.href = `/avatar/edit/${avatarId}`;
  };

  const handleUseAvatarClick = (avatarId: string) => {
    setAvatarToConfirmUseId(avatarId);
    setShowUseConfirmModal(true);
  };

  const confirmUseAvatar = () => {
    if (avatarToConfirmUseId) {
      setActiveAvatarId(avatarToConfirmUseId);
      setSelectedAvatar(null);
    }
    setShowUseConfirmModal(false);
    setAvatarToConfirmUseId(null);
  };

  const cancelUseAvatar = () => {
    setShowUseConfirmModal(false);
    setAvatarToConfirmUseId(null);
    setSelectedAvatar(null);
  };

  const handleDeleteAvatar = (e: React.MouseEvent, avatarId: string) => {
    e.stopPropagation();
    setAvatarToDeleteId(avatarId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    if (avatarToDeleteId) {
      setAvatars(prev => prev.filter(avatar => avatar.id !== avatarToDeleteId));
      if (selectedAvatar === avatarToDeleteId) setSelectedAvatar(null);
      if (activeAvatarId === avatarToDeleteId) setActiveAvatarId(null);
    }
    setShowDeleteConfirmModal(false);
    setAvatarToDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setAvatarToDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Avatar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from your existing avatars or create a new one to begin your journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Create New Avatar Card */}
          <div 
            onClick={handleCreateNewAvatar}
            className="group cursor-pointer bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create New Avatar
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Camera className="w-3 h-3 mr-2" />
                  Upload image
                </div>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Heart className="w-3 h-3 mr-2" />
                  Define personality
                </div>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Mic className="w-3 h-3 mr-2" />
                  Add voice ID
                </div>
              </div>
            </div>
          </div>

          {/* Existing Avatars */}
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 group relative ${
                activeAvatarId === avatar.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="text-center relative">
                {/* Action buttons */}
                <div className="absolute -top-2 -right-2 flex space-x-1">
                  <button
                    onClick={(e) => handleEditAvatar(e, avatar.id)}
                    className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteAvatar(e, avatar.id)}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <img
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover mb-4 group-hover:scale-105 transition-transform"
                />
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {avatar.name}
                </h3>
                
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="text-center pt-2 border-t border-gray-100">
                    Created {avatar.createdAt}
                  </div>
                </div>

                {/* Use This Avatar Button */}
                {activeAvatarId !== avatar.id && (
                  <button
                    onClick={() => handleUseAvatarClick(avatar.id)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Use This Avatar
                  </button>
                )}

                {/* Currently Selected Badge */}
                {activeAvatarId === avatar.id && (
                  <div className="mt-3 inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    Currently Selected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Avatar Confirmation Modal */}
      {showUseConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Use {avatars.find(a => a.id === avatarToConfirmUseId)?.name}?
              </h3>
              <p className="text-gray-600 mb-8">
                This will set {avatars.find(a => a.id === avatarToConfirmUseId)?.name} as your active avatar.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={cancelUseAvatar}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUseAvatar}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Delete {avatars.find(a => a.id === avatarToDeleteId)?.name}?
              </h3>
              <p className="text-gray-600 mb-8">
                This action cannot be undone. The avatar will be permanently removed.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
