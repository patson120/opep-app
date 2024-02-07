import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { TABLE } from "../Constants/Table";
import { database } from "../config/firebase";
import { Depense } from "../types";



const useDepense = () => {
    const depenses: Depense[] = []
    const getDepenses = async (immatriculations: string[] ) => {
        const depensesQuery = query(collection(database, TABLE.DEPENSE), where("vehiculeId", "in", immatriculations))
        const querySnapshot = await getDocs(depensesQuery)
        querySnapshot.forEach((doc) => {
            depenses.push({ ...doc.data()} as Depense)
        })
        return depenses
    }
    return { getDepenses }
}

export default useDepense