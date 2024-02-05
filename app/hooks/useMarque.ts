import { query, collection, getDocs } from "firebase/firestore"
import { database } from "../config/firebase";
import { TABLE } from "../Constants/Table";
import { useEffect, useState } from "react";
import {DropdownItemType } from "../types";


const useMarques = () => {
    const [marques, setMarques] = useState<DropdownItemType[]>([])
    const getMarques = async () => {
        const marquesQuery = query(collection(database, TABLE.CAR_MARQUE))
        const querySnapshot = await getDocs(marquesQuery)
        setMarques([])
        querySnapshot.forEach((doc) => {
            setMarques(prev => prev.concat({ label: doc.data().libelle, value: doc.id }))
        })    
    }
    useEffect(() => {
        getMarques() 
    }, [])

    return { marques, refresh: getMarques }
}

export default useMarques