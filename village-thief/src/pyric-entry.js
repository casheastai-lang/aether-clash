// The Firebase-shaped backend the game talks to, from pyric's in-page sandbox (Firestore + Auth).
// Bundled to vendor/pyric.min.js by `npm run build:pyric` and exposed as window.Pyric.
// To move to real Firebase later, these come from firebase/app, firebase/auth and firebase/firestore instead.
import { initializeSandbox, attachPersistence, attachTabSync } from 'pyric/sandbox';
import { setRules } from 'pyric/sandbox/firestore';
import { getAuth, signInAnonymously } from 'pyric/auth';
import { getFirestore, collection, doc, setDoc, addDoc, deleteDoc, onSnapshot } from 'pyric/firestore';

window.Pyric = { initializeSandbox, attachPersistence, attachTabSync, setRules, getAuth, signInAnonymously, getFirestore, collection, doc, setDoc, addDoc, deleteDoc, onSnapshot };
