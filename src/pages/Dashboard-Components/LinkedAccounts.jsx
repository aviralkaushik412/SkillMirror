import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const db = getFirestore();

const LinkedAccounts = () => {
  const { user } = useAuth(); // ✅ get user from context
  const [formData, setFormData] = useState({ LCid: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatedData, setUpdatedData] = useState(null);

  // ✅ Fetch user data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Save or update Firestore document
  const handleUpdate = async () => {
    if (!user) {
      setMessage("You must be logged in to update data.");
      return;
    }

    try {
    await setDoc(
      doc(db, "userdata", user.uid),
      { LCid: formData.LCid }, // 👈 only update this field
      { merge: true }          // 👈 prevent overwriting
    );
    setUpdatedData(formData);
    setMessage("✅ Data updated successfully!");
  } catch (error) {
    console.error("Error updating data:", error);
    setMessage("❌ Error saving data.");
  }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Info
        </h2>

        <input
          type="text"
          name="LCid"
          placeholder="Enter Leetcode Handle"
          value={formData.LCid}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update
        </button>

        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </div>

      {updatedData && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow w-80">
          <h3 className="text-lg font-semibold mb-2">Updated Values:</h3>
          <p>Leetcode Handle: {updatedData.LCid}</p>
        </div>
      )}
    </div>
  );
};

export default LinkedAccounts;
