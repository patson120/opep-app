import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TABLE } from "../Constants/Table";
import { database } from "../config/firebase";
import { Depense } from "../types";


const useDepense = () => {
    const [depenses, setDepenses] = useState<Depense[]>([])
    const getDepenses = async () => {
        const depensesQuery = query(collection(database, TABLE.DEPENSE), where("", "==", ""))
        const querySnapshot = await getDocs(depensesQuery)
        setDepenses([])
        querySnapshot.forEach((doc) => {
            setDepenses(prev => prev.concat({ _id: doc.id, ...doc.data() } as Depense))
        })   
    }
    useEffect(() => {
        getDepenses() 
    }, [])

    return { depenses, refresh: getDepenses }
}

export default useDepense