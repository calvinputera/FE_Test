import React, { useEffect, createContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage.hook";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<GlobalContextUserType | null>(
    "user",
    null
  );

  const store = { user, setUser };

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {};

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export type GlobalContextUserType = {
  username: string;
};

export type GlobalContextType = {
  user: GlobalContextUserType | null;
  setUser: (
    v:
      | GlobalContextUserType
      | null
      | ((prev: GlobalContextUserType | null) => GlobalContextUserType | null)
  ) => void;
};

export type GlobalContextProviderType = typeof GlobalContextProvider;

export default GlobalContextProvider;
