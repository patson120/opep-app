import { query, collection, getDocs, where } from "firebase/firestore"
import { database } from "../config/firebase";
import { TABLE } from "../Constants/Table";
import { useEffect, useState } from "react";
import { Car, GlobalUserState, User } from "../types";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/users";
import carService from "../Service/Car";


const useCars = () => {
    const [cars, setCars] = useState<Car[]>([])

    const user: User = useSelector<GlobalUserState>(selectUser) as User

    const getCars = async () => {

        const carsQuery = query(collection(database, TABLE.CAR), where("userId", "==", `${user._id}`))

        const querySnapshot = await getDocs(carsQuery)
        setCars([])
        querySnapshot.forEach((doc) => {
            setCars(prev => prev.concat({ ...doc.data() } as Car))
        })
        await saveCars()
    }

    const saveCars = async () => {
        // Save cars in the local storage
        if (cars.length > 0) {
            await carService.setCars(cars)
        }
    }

    const getImmatriculations = async () => {
        // Get cars in the local storage
        const result = await carService.getCars()
        return result?.map(car => car._id)

    }
   
    useEffect(() => {
        getCars()
    }, [])



    return { cars, refresh: getCars, getImmatriculations }
}

export default useCars