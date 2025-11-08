import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../firebase"; // make sure db = getFirestore(app)

const UseData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, "userdata", user.uid); // your Firestore collection
        const finalData = await getDoc(docRef);

        if (finalData.exists()) {
          setUserData(finalData.data());
        } else {
          console.warn("⚠️ No such document found for this user!");
          setUserData(null);
        }
      } catch (error) {
        console.error("🔥 Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { userData, loading };
};

export default UseData;
