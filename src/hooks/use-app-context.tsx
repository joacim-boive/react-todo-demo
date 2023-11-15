import { useContext } from "react";
import { AppContext, type TAppContext } from "@/contexts/app-context";

export const useAppContext = () => {
  const context = useContext<TAppContext | undefined>(AppContext);
  if (context === undefined) {
    throw new Error("useBooleanContext must be used within a BooleanProvider");
  }
  return context;
};
