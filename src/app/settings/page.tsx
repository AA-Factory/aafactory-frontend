'use client';

import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiEye, HiEyeOff, HiSave } from 'react-icons/hi';

const SettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    comfyServerUrl: '',
    comfyServerPort: '',
    elevenLabsApiKey: '',
    openaiApiKey: ''
  });

  const [expandedSections, setExpandedSections] = useState({
    comfyui: true,
    elevenlabs: true,
    llm: true
  });

  const [showPasswords, setShowPasswords] = useState({
    elevenLabsApiKey: false,
    openaiApiKey: false
  });

  const [saveStatus, setSaveStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = () => {
    setSaveStatus('Saving...');

    // Simulate API call
    setTimeout(() => {
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const maskApiKey = (key, visible) => {
    if (visible || !key) return key;
    const prefix = key.substring(0, 7);
    const masked = '*'.repeat(Math.max(0, key.length - 7));
    return prefix + masked;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-6">
          {/* ComfyUI Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection('comfyui')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium">ComfyUI</span>
              {expandedSections.comfyui ? (
                <HiChevronUp className="h-5 w-5" />
              ) : (
                <HiChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.comfyui && (
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ComfyUI Server URL
                  </label>
                  <input
                    name="comfyServerUrl"
                    value={formData.comfyServerUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="https://example.proxy.runpod.net"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-2">
                    ComfyUI Server Port
                  </label>
                  <input
                    name="comfyServerPort"
                    value={formData.comfyServerPort}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="8188"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ElevenLabs Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection('elevenlabs')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium">ElevenLabs</span>
              {expandedSections.elevenlabs ? (
                <HiChevronUp className="h-5 w-5" />
              ) : (
                <HiChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.elevenlabs && (
              <div className="px-6 pb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ElevenLabs API Key
                  </label>
                  <div className="relative">
                    <input
                      name="elevenLabsApiKey"
                      value={showPasswords.elevenLabsApiKey ? formData.elevenLabsApiKey : maskApiKey(formData.elevenLabsApiKey, false)}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-10 bg-blue-50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="sk_..."
                    />
                    <button
                      onClick={() => togglePasswordVisibility('elevenLabsApiKey')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600  hover:bg-gray-50"
                    >
                      {showPasswords.elevenLabsApiKey ? (
                        <HiEyeOff className="h-4 w-4" />
                      ) : (
                        <HiEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LLM Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => toggleSection('llm')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium">LLM</span>
              {expandedSections.llm ? (
                <HiChevronUp className="h-5 w-5" />
              ) : (
                <HiChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.llm && (
              <div className="px-6 pb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <input
                      name="openaiApiKey"
                      value={showPasswords.openaiApiKey ? formData.openaiApiKey : maskApiKey(formData.openaiApiKey, false)}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 font-mono text-sm"
                      placeholder="sk-proj-..."
                    />
                    <button
                      onClick={() => togglePasswordVisibility('openaiApiKey')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    >
                      {showPasswords.openaiApiKey ? (
                        <HiEyeOff className="h-4 w-4" />
                      ) : (
                        <HiEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-center pt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center space-x-2 min-w-[200px] justify-center"
            >
              <HiSave className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
          </div>

          {/* Save Status */}
          {saveStatus && (
            <div className="text-center">
              <p className={`text-sm ${saveStatus.includes('successfully') ? 'text-green-600' : 'text-blue-600'
                }`}>
                {saveStatus}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;