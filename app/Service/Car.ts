import Storage from '../Utils/Storage';
import { Car } from '../types';


async function setCars(cars: Car[]) {
  return await Storage.set('cars:opep', cars);
}
async function getCars() {
  return await Storage.get('cars:opep') as Car[] | null | undefined;
}
async function clearCars() {
  return await Storage.set('cars:opep', []);
}

export default {
  setCars,
  getCars,
  clearCars
};