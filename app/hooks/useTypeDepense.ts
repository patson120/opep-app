import { query, collection, getDocs } from "firebase/firestore"
import { database } from "../config/firebase";
import { TABLE } from "../Constants/Table";
import { useEffect, useState } from "react";
import {DropdownItemType, Model } from "../types";


const useTypeDepense = () => {
    const [types, setTypes] = useState<Model[]>([])
    const getTypeDepenses = async () => {
        const typeDepenseQuery = query(collection(database, TABLE.TYPE_DEPENSE))
        const querySnapshot = await getDocs(typeDepenseQuery)
        setTypes([])
        querySnapshot.forEach((doc) => {
            setTypes(prev => prev.concat({ _id: doc.id, ...doc.data() } as Model))
        })   
    }
    useEffect(() => {
        getTypeDepenses() 
    }, [])

    return { types, refresh: getTypeDepenses }
}

export default useTypeDepense