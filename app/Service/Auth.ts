import Storage from '../Utils/Storage';
import { User } from '../types';
import carService from './Car'

async function getAccount() {
  return await Storage.get('account:opep') as User | undefined;
}

async function setAccount(data: User) {
  return await Storage.set('account:opep', data);
}

async function logout() {
  await carService.clearCars()
  return await Storage.set('account:opep', null);
}


export default {
  logout,
  getAccount,
  setAccount,
};