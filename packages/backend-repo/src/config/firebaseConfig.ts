import admin, { type ServiceAccount } from "firebase-admin";
import { type Firestore, getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json";

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
const db: Firestore = getFirestore(app);

// Use Emulator in development
if (process.env.FIREBASE_EMULATOR_HOST) {
  db.settings({
    host: "localhost:8080", // Firestore Emulator runs on port 8080
    ssl: false,
  });
}
export { admin, db };
