import { useFinanceStore } from '../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  CreditCard, 
  Plus, 
  MoreHorizontal, 
  ArrowUpRight, 
  ArrowDownLeft,
  Settings,
  ShieldCheck
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useState } from 'react';

export function AccountsPage() {
  const { accounts, createAccount } = useFinanceStore();
  const [newAccName, setNewAccName] = useState('');
  const [newAccType, setNewAccType] = useState<'checking' | 'savings'>('checking');
  const [newAccBalance, setNewAccBalance] = useState('1000');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateAccount = async () => {
    if (!newAccName) return;
    await createAccount(newAccName, newAccType, parseFloat(newAccBalance));
    setIsDialogOpen(false);
    setNewAccName('');
  };

  return (
    <div className="space-y-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase tracking-widest">Account Registry</h1>
          <p className="text-sm text-slate-400">Portfolio management and identification.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger 
            render={
              <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 h-12 font-bold uppercase tracking-widest text-[10px]">
                <Plus size={14} className="mr-2" />
                New Identity
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[425px] rounded-2xl border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold tracking-tight">Open New Account</DialogTitle>
              <DialogDescription className="text-slate-500 text-xs">
                Initialize a new financial node in the India Bank system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Internal Label</label>
                <Input 
                  value={newAccName} 
                  onChange={(e) => setNewAccName(e.target.value)}
                  placeholder="e.g. Primary Savings" 
                  className="rounded-xl border-slate-100 bg-slate-50/50"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Initial Capital (₹)</label>
                <Input 
                  type="number"
                  value={newAccBalance} 
                  onChange={(e) => setNewAccBalance(e.target.value)}
                  className="rounded-xl border-slate-100 bg-slate-50/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant={newAccType === 'checking' ? 'default' : 'outline'}
                  onClick={() => setNewAccType('checking')}
                  className={`rounded-xl h-11 text-[10px] font-bold uppercase tracking-widest ${newAccType === 'checking' ? 'bg-slate-900' : 'border-slate-100 text-slate-500'}`}
                >
                  Checking
                </Button>
                <Button 
                  variant={newAccType === 'savings' ? 'default' : 'outline'}
                  onClick={() => setNewAccType('savings')}
                  className={`rounded-xl h-11 text-[10px] font-bold uppercase tracking-widest ${newAccType === 'savings' ? 'bg-slate-900' : 'border-slate-100 text-slate-500'}`}
                >
                  Savings
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateAccount} className="w-full bg-slate-900 hover:bg-slate-800 rounded-xl h-12 font-bold uppercase tracking-widest text-[10px]">
                Deploy Account Node
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {accounts.length === 0 ? (
          <div className="col-span-full h-80 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-200 border border-slate-100 mb-6 font-mono text-xl">
              ?
            </div>
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Zero Nodes Active</h3>
            <p className="text-slate-400 text-xs mt-2 mb-8">No accounts registered under this identity.</p>
            <Button variant="outline" className="rounded-xl px-10 border-slate-200 text-slate-900 font-bold uppercase tracking-widest text-[10px] h-11" onClick={() => setIsDialogOpen(true)}>Initialize First Node</Button>
          </div>
        ) : (
          accounts.map((account) => (
            <div key={account.id} className="border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      account.type === 'checking' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {account.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                       {account.name}
                       <ShieldCheck size={14} className="text-emerald-500" />
                    </h3>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Available Capital</p>
                  <p className="text-3xl font-bold font-mono text-slate-900">
                    ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 mt-auto">
                <div className="flex items-center justify-between py-4 border-t border-slate-50 mb-6">
                   <span className="text-[10px] font-mono text-slate-400 tracking-wider">REF: {account.accountNumber}</span>
                   <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Verified Agent (India)</span>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-slate-900 text-white rounded-xl h-12 font-bold uppercase tracking-widest text-[9px] shadow-lg shadow-slate-900/10 active:translate-y-px transition-transform">
                    <ArrowDownLeft size={14} className="mr-2" />
                    Injection
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-200 rounded-xl h-12 text-slate-900 font-bold uppercase tracking-widest text-[9px] hover:bg-slate-50 active:translate-y-px transition-transform">
                    <ArrowUpRight size={14} className="mr-2" />
                    Outflow
                  </Button>
                  <Button variant="outline" size="icon" className="border-slate-100 rounded-xl h-12 w-12 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                    <Settings size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-8 border border-slate-100 rounded-3xl bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Security Protocol Enforced</h4>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
            All data operations are processed through a zero-trust network. Your assets are cryptographically protected using AES-256 standards with multi-region redundancy.
          </p>
        </div>
        <Button variant="outline" className="border-slate-200 text-slate-900 font-bold uppercase tracking-widest text-[10px] px-8 rounded-xl h-11 h-auto py-3">
          Verification Logs
        </Button>
      </div>
    </div>
  );
}
