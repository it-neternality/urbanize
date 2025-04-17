import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "../../surveyConfig";

export const fetchSurveyData = async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    await signInAnonymously(auth);

    const db = getDatabase(app);
    const snapshot = await get(ref(db));
    return snapshot.exists() ? snapshot.val() : {};
};
