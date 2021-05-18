import { useState } from "react";
import { loadLocalData } from "./LoadLocalData";

export function useLocalStorage(key, defaultValue) {
  const initialValue = () => loadLocalData(key, defaultValue);
  const [value, setValue] = useState(initialValue);
  const setAndStoreValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };
  return [value, setAndStoreValue];
}
