import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useFinanceStore } from '../context/FinanceContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Plus, 
  ArrowRightLeft,
  Search,
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export function Dashboard() {
  const { accounts, transactions, loading } = useFinanceStore();

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const activeAccountsCount = accounts.length;
  const recentTransactions = transactions.slice(0, 5);

  if (loading) return null;

  return (
    <div className="space-y-10 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Total Assets</p>
          <h3 className="text-2xl font-bold text-slate-900 font-mono">
            ₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase">Stable Assets</span>
          </div>
        </div>
        
        <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Active Accounts</p>
          <h3 className="text-2xl font-bold text-slate-900 font-mono">{activeAccountsCount}</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md uppercase">Operational</span>
          </div>
        </div>

        <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Recent Activity</p>
          <h3 className="text-2xl font-bold text-slate-900 font-mono">{recentTransactions.length}</h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-md uppercase font-mono">24h Loop</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Transactions Log Section */}
        <div className="col-span-12 lg:col-span-8 flex flex-col border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Transaction Log</h4>
            <div className="flex gap-2">
               <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-400 border border-slate-200 px-3 py-1 rounded-md h-auto">Download</Button>
               <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-400 border border-slate-200 px-3 py-1 rounded-md h-auto">Filter</Button>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700 divide-y divide-slate-50">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-[10px] text-slate-400">TX-{tx.id.slice(0, 4).toUpperCase()}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{tx.description}</td>
                    <td className={`px-6 py-4 text-right font-bold ${
                      tx.type === 'deposit' || tx.type === 'transfer_in' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {tx.type === 'deposit' || tx.type === 'transfer_in' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium uppercase text-[9px] tracking-tighter">
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {tx.timestamp ? format(new Date(tx.timestamp.seconds * 1000), 'MMM d, HH:mm') : '...'}
                    </td>
                  </tr>
                ))}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">No activity logs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Cards Section */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm flex flex-col">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Financial Overview</h4>
            
            <div className="space-y-6">
              {accounts.slice(0, 3).map(acc => (
                <div key={acc.id} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-900">{acc.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">****{acc.accountNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold font-mono">₹{acc.balance.toLocaleString('en-IN')}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-tight ${
                      acc.type === 'checking' ? 'text-indigo-600' : 'text-emerald-600'
                    }`}>{acc.type}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-50 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-slate-900 w-2/3 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4 py-6 border-slate-200 text-slate-900 font-bold rounded-xl text-xs uppercase hover:bg-slate-50">
                View Account Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
