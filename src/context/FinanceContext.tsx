import { createContext, useContext } from 'react';
import { useFinance } from '../hooks/useFinance';

const FinanceContext = createContext<ReturnType<typeof useFinance> | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const finance = useFinance();
  return (
    <FinanceContext.Provider value={finance}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinanceStore() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinanceStore must be used within a FinanceProvider');
  }
  return context;
}
