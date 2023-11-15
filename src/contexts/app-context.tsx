import React, {
  createContext,
  useState,
  type FC,
  type ReactNode,
  type Dispatch,
} from "react";

export type TAppContext = {
  isLongPressed: boolean;
  setIsLongPressed: Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<TAppContext | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  return (
    <AppContext.Provider value={{ isLongPressed, setIsLongPressed }}>
      {children}
    </AppContext.Provider>
  );
};
