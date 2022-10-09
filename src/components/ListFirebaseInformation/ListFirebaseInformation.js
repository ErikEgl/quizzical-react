import React, { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"

export default function ListFirebaseInformation() {

    async function getUserGameData() {
        const docRef = doc(db, "cities", "BJ");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }
    getUserGameData()
    const userRef = doc(db, 'cities', 'BJ');
    setDoc(userRef, { capital: 1, city: "false", data: [1, 2, 3], }, { merge: true });
    console.log(userRef);
    return (
        <div>
            <h4>List blog posts</h4>
            {/* {posts.map((post) => 
                <a key={post.data.name} href="#">{post.data.name}</a>
            )} */}
        </div>
    )
}