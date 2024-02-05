import { query, collection, getDocs } from "firebase/firestore"
import { database } from "../config/firebase";
import { TABLE } from "../Constants/Table";
import { useEffect, useState } from "react";
import { Car } from "../types";


const useCars = () => {
    const [cars, setCars] = useState<Car[]>([])
    const getCars = async () => {
        const carsQuery = query(collection(database, TABLE.CAR))
        const querySnapshot = await getDocs(carsQuery)
        setCars([])
        querySnapshot.forEach((doc) => {
            setCars(prev => prev.concat({ ...doc.data() } as Car))
        })
    }
    useEffect(() => {
        getCars() 
    }, [])

    return { cars, refresh: getCars }
    // return [cars, getCars]
}

export default useCars