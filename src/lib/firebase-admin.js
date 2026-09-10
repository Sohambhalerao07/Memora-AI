// src/lib/firebase-admin.js
import admin from 'firebase-admin';

// Protect against multiple initializations in development mode
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Handle newlines in private key securely
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.FIREBASE_DB_URL, // In case we fallback to RTDB for something
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error', error.stack);
  }
}

export const db = admin.firestore();
export const rtdb = admin.database(); // keeping RTDB ref just in case
export const auth = admin.auth();
