import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new Cache({
  namespace: "myapp",
  policy: {
    stdTTL: 300,
    maxEntries: 1000,
  },
  backend: AsyncStorage,
});

export const setCache = async (key: string, value: string) => {
  try {
    return await cache.set(key, value);
  } catch (error) {
    return "failed";
  }
};
export const getCache = async (key: string) => {
  try {
    return await cache.get(key);
  } catch (error) {
    return "not_found";
  }
};

export const deleteCache = async (key: string) => {
  try {
    return await cache.remove(key);
  } catch (error) {
    return "not_found";
  }
};

export const clearAllCache = async () => {
  return await cache.clearAll();
};
