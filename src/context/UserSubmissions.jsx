import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import sampleSubmissions from "../data/sample.json"; // mock data

const formatDate = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toISOString().split("T")[0];

const UserSubmissions = () => {
  const { user } = useAuth();
  const [found, setFound] = useState(false);
  const [loadingSubs, setLoadingSubs] = useState(true);

  useEffect(() => {
    const checkAndSaveStatus = async () => {
      if (!user) {
        console.log("⚠️ No user logged in yet, waiting...");
        return;
      }

      console.log("Current logged-in UID:", user.uid);

      try {
        const today = new Date().toISOString().split("T")[0];
        const targetTitle = "Maximum Path Score in a Grid";
        const docRef = doc(db, "leetcodeStatus", user.uid);

        console.log("📡 Checking Firestore...");
        const docSnap = await getDoc(docRef);

        let leetcodeDone = 0;

        if (docSnap.exists()) {
          const data = docSnap.data();
          leetcodeDone = data.leetcodeDone ?? 0;
          const lastChecked = data.lastChecked ?? "";

            if (leetcodeDone === 1 && lastChecked === today) {
              console.log("✅ Already marked done today — verifying streak...");

              // It's possible leetcodeStatus was set but the userdata.streak increment failed earlier.
              // In that case we should ensure userdata has been incremented for today.
              const userDataRef = doc(db, "userdata", user.uid);
              try {
                const userDataSnap = await getDoc(userDataRef);
                const userData = userDataSnap.exists() ? userDataSnap.data() : null;
                const streakLastInc = userData?.streakLastIncremented ?? null;

                if (streakLastInc === today) {
                  console.log("✅ Streak already incremented today.");
                  setFound(true);
                  setLoadingSubs(false);
                  return;
                }

                // If we reach here, leetcodeStatus says done today but userdata wasn't updated — increment now.
                try {
                  await updateDoc(userDataRef, {
                    streak: increment(1),
                    streakLastIncremented: today,
                  });
                  console.log("🔥 Streak incremented (late) in userdata!");
                } catch (e) {
                  console.warn("⚠️ userdata not found while late increment, creating new doc...", e);
                  await setDoc(userDataRef, { streak: 1, streakLastIncremented: today }, { merge: true });
                  console.log("🔥 userdata created with streak = 1");
                }

                setFound(true);
                setLoadingSubs(false);
                return;
              } catch (err) {
                console.error("❌ Error verifying/updating userdata streak:", err);
                // fallthrough to normal flow — we'll still check submissions below
              }
            }
        }

        // ✅ Check submissions
        console.log("🔍 Checking submissions...");
        const submissions = sampleSubmissions;
        let foundFlag = false;

        for (let sub of submissions) {
          if (sub.title === targetTitle) {
            console.log(`✅ Found target problem: ${targetTitle}`);
            foundFlag = true;
            break;
          }
        }

        // ✅ Save new status (creates if missing)
        await setDoc(
          docRef,
          {
            leetcodeDone: foundFlag ? 1 : 0,
            lastChecked: today,
          },
          { merge: true }
        );
        console.log("📁 Document created/updated successfully in leetcodeStatus ✅");

        // ✅ Update streak only if found
        if (foundFlag) {
          const userDataRef = doc(db, "userdata", user.uid);
          try {
            await updateDoc(userDataRef, {
              streak: increment(1),
            });
            console.log("🔥 Streak incremented by 1 in userdata!");
          } catch (e) {
            console.warn("⚠️ userdata not found, creating new doc...");
            await setDoc(userDataRef, { streak: 1 }, { merge: true });
          }
        }

        setFound(foundFlag);
      } catch (error) {
        console.error("❌ Error checking/saving submission:", error);
      } finally {
        setLoadingSubs(false);
      }
    };

    checkAndSaveStatus();
  }, [user]);

  if (loadingSubs) {
    return <div className="text-white p-4">Checking submissions...</div>;
  }

  return (
    <div className="text-white p-4">
      <h2>Problem Check</h2>
      <p>{found ? "✅ Done" : "❌ Not Done"}</p>
    </div>
  );
};

export default UserSubmissions;
