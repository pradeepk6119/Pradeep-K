import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  LogOut, 
  User as UserIcon,
  ArrowRightLeft,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from 'motion/react';
import { useState } from 'react';
import { TransferDialog } from './TransferDialog';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: 'dashboard' | 'accounts' | 'transactions') => void;
  currentPage: string;
}

export function Layout({ children, onNavigate, currentPage }: LayoutProps) {
  const { profile, logout } = useAuth();
  const [transferOpen, setTransferOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: History },
  ] as const;

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs underline underline-offset-4">N</span>
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800 italic">NexusCore</h1>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                    active 
                      ? 'bg-white shadow-sm text-slate-900 border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <div className="p-4 bg-slate-900 rounded-xl text-white">
            <p className="text-[10px] opacity-60 mb-1 font-mono uppercase tracking-widest text-slate-300">Auth Status</p>
            <p className="text-xs font-semibold">{profile?.email ? 'Identity Verified' : 'Checking...'}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              <p className="text-[10px] text-slate-300">System Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-100 flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline">User Session /</span>
            <span className="text-[10px] text-slate-800 font-bold uppercase tracking-widest">{currentPage}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button 
              onClick={() => setTransferOpen(true)} 
              variant="outline" 
              size="sm" 
              className="text-xs font-bold uppercase tracking-widest h-9 border-slate-200"
            >
               <ArrowRightLeft size={14} className="mr-2" />
               New Action
            </Button>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{profile?.displayName}</p>
                <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">ID: {profile?.uid.slice(0, 8)}</p>
              </div>
              <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                <AvatarImage src={profile?.photoURL} />
                <AvatarFallback className="bg-slate-50 text-slate-900">
                  <UserIcon size={18} />
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout} 
                className="text-slate-400 hover:text-slate-900"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>

      <TransferDialog open={transferOpen} onOpenChange={setTransferOpen} />
    </div>
  );
}
