import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AuthPage } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { AccountsPage } from './pages/Accounts';
import { TransactionsPage } from './pages/Transactions';
import { Layout } from './components/Layout';
import { FinanceProvider } from './context/FinanceContext';

function AuthenticatedApp() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'accounts' | 'transactions'>('dashboard');

  return (
    <FinanceProvider>
      <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'accounts' && <AccountsPage />}
        {currentPage === 'transactions' && <TransactionsPage />}
      </Layout>
    </FinanceProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return user ? <AuthenticatedApp /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
