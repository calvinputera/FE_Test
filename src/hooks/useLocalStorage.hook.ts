import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item
        ? JSON.parse(item)
        : initialValue instanceof Function
        ? initialValue()
        : initialValue;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error reading from local storage:", error.message);
      } else {
        console.error(
          "An unknown error occurred while reading from local storage:",
          error
        );
      }
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error writing to local storage:", error.message);
      } else {
        console.error(
          "An unknown error occurred while writing to local storage:",
          error
        );
      }
    }
  };
  return [storedValue, setValue] as [T, (value: T | ((prev: T) => T)) => void];
};
