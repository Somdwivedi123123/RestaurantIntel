import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App;

/**
 * Initialize Firebase Admin SDK (server-side only)
 */
export function initAdmin() {
  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    adminApp = getApps()[0];
  }
  return adminApp;
}

/**
 * Get Firebase Admin Auth
 */
export function getAdminAuth() {
  if (!adminApp) {
    initAdmin();
  }
  return getAuth(adminApp);
}

/**
 * Get Firebase Admin Firestore
 */
export function getAdminDb() {
  if (!adminApp) {
    initAdmin();
  }
  return getFirestore(adminApp);
}
