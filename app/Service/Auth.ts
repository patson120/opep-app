import Storage from '../Utils/Storage';
import { User } from '../types';

async function getAccount() {
  return await Storage.get('account') as User | undefined;
}

async function setAccount(data: User) {
  return await Storage.set('account', data);
}

async function logout() {
  return await Storage.set('account', null);
}

// async function setChats(chats: UserDataType[]) {
//   return await Storage.set('chats', chats);
// }
// async function getChats() {
//   return await Storage.get('chats') as UserDataType[] | null | undefined;;
// }

export default {
  logout,
  getAccount,
  setAccount,
  // setChats,
  // getChats
};