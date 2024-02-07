import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TABLE } from "../Constants/Table";
import { database } from "../config/firebase";
import { Model } from "../types";


const useSousTypeDepense = () => {
    const sousTypes: Model[] = []
    const getSousTypeDepenses = async (idTypeDepense: string) => {
        const sousTypeDepenseQuery = query(collection(database, TABLE.SOUS_TYPE_DEPENSE), where("idTypeDepense", "==", idTypeDepense))
        const querySnapshot = await getDocs(sousTypeDepenseQuery)
        querySnapshot.forEach((doc) => {
            sousTypes.push({ _id: doc.id, ...doc.data() } as Model)
        })
        
        return sousTypes
    }
    return { getSousTypeDepenses }
}
export default useSousTypeDepense