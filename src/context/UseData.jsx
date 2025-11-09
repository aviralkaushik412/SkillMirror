import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

export default function useData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      setLoadingUserData(false);
      return;
    }

    const docRef = doc(db, "userdata", user.uid);

    // ✅ Real-time listener (auto-updates on Firestore changes)
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          setUserData(null);
        }
        setLoadingUserData(false);
      },
      (error) => {
        console.error("Error fetching user data:", error);
        setLoadingUserData(false);
      }
    );

    return () => unsubscribe(); // cleanup
  }, [user]);

  return { userData, loadingUserData };
}
