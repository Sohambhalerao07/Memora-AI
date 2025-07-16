import React, { useState,useEffect } from 'react';
import profile from "../../assets/profile.png"
import axios from 'axios';
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../firebase";
import AlertModal from '../PopupModel/AlertModal';
import ProfileTips from './ProfileTips';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    aboutMe: '',
  });
  const [alert,setAlert]= useState({ show: false, type: '', message: '' });
  const [image, setImage] = useState(); // your uploaded image
  const [imageFile, setImageFile] = useState(null);

useEffect(() => {
  if (alert.message) {
    const timeout = setTimeout(() => setAlert({ type: '', message: '' }), 3000);
    return () => clearTimeout(timeout);
  }
}, [alert]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return setAlert({...props});
    }
    if (!formData.fullName.trim()) {
      return setAlert({...props});
    }

    setAlert({ show: true, type: "info", message: "Uploading image..." });

    try {
      const form = new FormData();
      form.append("file", imageFile);

      const { data } = await axios.post(
         "http://localhost:5000/upload",
        form
      );

      const imageUrl = data.url;
      const userId = auth.currentUser.uid;
      const db = getDatabase();

      await set(ref(db, `users/${userId}`), {
        ...formData,
        profileImage: imageUrl,
        updatedAt: Date.now(),
      });

      setAlert({ show: true, type: "success", message: "Profile saved!" });
    } catch (err) {
      console.error(err);
      setAlert({ show: true, type: "error", message: "Upload or save failed." });
    }
  };


const handleRemoveImage = () => {
  setImage(null);
  setImageFile(null);
};

return (
  <div className=" max-w-4xl max-h-[95vh] mx-auto p-10 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Edit profile</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left - Image Upload */}
        <div>
          <h2 className="text-md font-semibold mb-4">Profile photo</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 rounded-xl overflow-hidden shadow-md">
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
                
                />

            </div>
            <div className="flex gap-4">
              <label className="px-4 py-2 text-sm font-medium border border-indigo-700 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-blue-50">
                Choose image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-sm text-gray-600 hover:text-red-500"
                >
                Remove
              </button>
            </div>
            <ProfileTips/>
                {alert.message && (
                <div
                className={`mt-6 px-4 py-3 rounded-md text-sm ${
                alert.type === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
                }`}
                >
                {alert.message}
                </div>
                )}
          </div>
        </div>

        {/* Right - Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-Select your country-</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="IN">India</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About me</label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              rows="3"
              placeholder="Tell something about yourself"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          type="button"
          className="px-6 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Save profile
        </button>
      </div>
       <div> {/* existing JSX */}

      {alert.show && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
    </div>
    </div>
  );
};

export default UserProfile;
