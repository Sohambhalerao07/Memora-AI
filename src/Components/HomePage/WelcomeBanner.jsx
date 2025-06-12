import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';

function WelcomeBanner() {
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName || user.email?.split('@')[0] || 'User');
      } else {
        setDisplayName("Guest"); // Fallback if not logged in
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="h-20">...</div>; // Or a skeleton loader
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-white to-white rounded-2xl px-6 py-6 flex flex-col md:flex-row items-center md:items-end gap-4 shadow-sm border border-gray-100">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold font-jakarta mb-1">
          Welcome back, <span className="text-indigo-600">{displayName}</span>!
        </h2>
        <p className="text-gray-600 text-base md:text-lg">Let's relive your best memories.</p>
      </div>
      {/* Rest of your component */}
    </div>
  );
}

export default WelcomeBanner;