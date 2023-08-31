import React, { createContext, useContext } from "react";

const OperationContext = createContext();

export function useOperationContext() {
  return useContext(OperationContext);
}

export function OperationProvider({ children, operationFunction }) {
  return (
    <OperationContext.Provider value={{ operationFunction }}>
      {children}
    </OperationContext.Provider>
  );
}
