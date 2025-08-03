import React from 'react'
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

const UseData = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        if(!user) return;
        const docRef = doc(db, 'userdata' ,user.uid);
        const finaldata = await getDoc(docRef);

        if(finaldata.exists()){
            setUserData(finaldata.data());
        }
        else console.warn('no such document found --------------');
    };
    fetchData();
  }, [user]);
  return { userData };
};

export default UseData;