export const loadLocalData = (key, defaultValue) =>
  localStorage.getItem(key) ?? defaultValue;
