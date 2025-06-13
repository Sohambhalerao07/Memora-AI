import React, { useState } from 'react';
import { CameraIcon, Trash2Icon } from 'lucide-react';

export default function UserProfile() {
  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    role: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="text-center">
          <h2 className="text-white text-xl font-semibold mb-2">Profile Avatar</h2>
          <p className="text-gray-400 text-sm mb-4">Upload or update your profile picture.</p>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 mb-4">
              {avatar ? (
                <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>

            <input id="upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <label htmlFor="upload" className="text-indigo-500 cursor-pointer mb-4">Drag & drop or <span className="underline">click to upload</span></label>

            <div className="flex space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 border border-gray-600">
                <CameraIcon size={16} />
                <span>Replace Photo</span>
              </button>
              <button onClick={() => setAvatar(null)} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Trash2Icon size={16} />
                <span>Remove Photo</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-2">Update your personal information and preferences.</p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
            </div>

            <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleFormChange} rows="3" className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea>

            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
              <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleFormChange} className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition-all">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
