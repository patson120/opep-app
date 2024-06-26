import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { TABLE } from "../Constants/Table";
import { database } from "../config/firebase";
import { Depense } from "../types";



const useDepense = () => {
    let depenses: Depense[] = []
    const getDepenses = async (immatriculations: string[]) => {
        const depensesQuery = query(collection(database, TABLE.DEPENSE), where("vehiculeId", "in", immatriculations))
        const querySnapshot = await getDocs(depensesQuery)
        depenses = []
        querySnapshot.forEach((doc) => {
            depenses.push({ ...doc.data() } as Depense)
        })
        return depenses
    }

    const getDepensesByType = async (idTypeDepense: string, immatriculations: string[]) => {
        const depensesQuery = query(
            collection(database, TABLE.DEPENSE),
            where("type_depense", "==", idTypeDepense),
            where("vehiculeId", "in", immatriculations),
        )
        const querySnapshot = await getDocs(depensesQuery)
        depenses = []
        querySnapshot.forEach((doc) => {
            depenses.push({ ...doc.data() } as Depense)
        })
        return depenses
    }

    const getDepensesByPeriod = async (immatriculations: string[], period: string, endDate?: string) => {
        let depensesQuery = null

        if (endDate) {
            depensesQuery = query(
                collection(database, TABLE.DEPENSE),
                where("vehiculeId", "in", immatriculations),
                where("date", ">=", period),
                where("date", "<=", endDate),
            )
        }
        else {
            depensesQuery = query(
                collection(database, TABLE.DEPENSE),
                where("vehiculeId", "in", immatriculations),
                where("date", ">=", period),
            )
        }

        const querySnapshot = await getDocs(depensesQuery) 
        
        depenses = []
        querySnapshot.forEach((doc) => {
            depenses.push({ ...doc.data() } as Depense)
        })
        return depenses
    }

    const getDepensesByIdCar = async (immatriculation: string) => {
        let depensesQuery = query(
            collection(database, TABLE.DEPENSE),
            where("vehiculeId", "==", immatriculation)
        )
        const querySnapshot = await getDocs(depensesQuery)
        depenses = []
        querySnapshot.forEach((doc) => {
            depenses.push({ ...doc.data() } as Depense)
        })
        return depenses
    }


    return { getDepenses, getDepensesByPeriod, getDepensesByIdCar }
}

export default useDepense