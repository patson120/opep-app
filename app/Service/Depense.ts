import Storage from '../Utils/Storage';
import { Depense } from '../types';


async function setDepenses(depenses: Depense[]) {
  return await Storage.set('depenses', depenses);
}
async function getDepenses() {
  return await Storage.get('depenses') as Depense[] | null | undefined;;
}

export default {
  setDepenses,
  getDepenses
};