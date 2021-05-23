import { STORAGE_KEYS } from './constantes';

export const getIsLoggedIn = () => localStorage.getItem(STORAGE_KEYS.TOKEN);

export const setOnStorage = (key, value) => localStorage.setItem(key, value);

export const getFromStorage = (key) => localStorage.getItem(key);

export const removeFromStorage = (key) => localStorage.removeItem(key);

export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.HAS_PERMISSION);
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
};
