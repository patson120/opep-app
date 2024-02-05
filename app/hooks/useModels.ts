import { query, collection, getDocs } from "firebase/firestore"
import { database } from "../config/firebase";
import { TABLE } from "../Constants/Table";
import { useEffect, useState } from "react";
import {DropdownItemType } from "../types";


const useModels = () => {
    const [models, setModels] = useState<DropdownItemType[]>([])
    const getModels = async () => {
        const modelsQuery = query(collection(database, TABLE.CAR_MARQUE))
        const querySnapshot = await getDocs(modelsQuery)
        setModels([])
        querySnapshot.forEach((doc) => {
            setModels(prev => prev.concat({ label: doc.data().libelle, value: doc.id }))
        })    
    }
    useEffect(() => {
        getModels() 
    }, [])

    return { models, refresh: getModels }
}

export default useModels