import Storage from '../Utils/Storage';
import { Car } from '../types';


async function setCars(cars: Car[]) {
  return await Storage.set('cars', cars);
}
async function getCars() {
  return await Storage.get('cars') as Car[] | null | undefined;;
}

export default {
  setCars,
  getCars
};