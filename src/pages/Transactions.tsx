import { useFinanceStore } from '../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Download,
  Calendar as CalendarIcon,
  Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { format } from 'date-fns';
import { useState } from 'react';

export function TransactionsPage() {
  const { transactions, loading } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return null;

  return (
    <div className="space-y-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase tracking-widest">Transaction Vault</h1>
          <p className="text-sm text-slate-400">Ledger of all verified capital movements.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl border-slate-100 text-slate-900 font-bold uppercase tracking-widest text-[9px] h-10 hover:bg-slate-50 transition-colors">
            <Download size={14} className="mr-2 text-slate-300" />
            XLS Ledger
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-100 text-slate-900 font-bold uppercase tracking-widest text-[9px] h-10 hover:bg-slate-50 transition-colors">
            <CalendarIcon size={14} className="mr-2 text-slate-300" />
            Select Epoch
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
          <Input 
            placeholder="Search records by description or category..." 
            className="pl-12 h-14 bg-white border-slate-100 rounded-2xl text-sm focus:ring-slate-900 ring-offset-2 transition-all placeholder:text-slate-300 shadow-sm" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 w-full md:w-auto px-8 border-slate-100 bg-white rounded-2xl text-slate-900 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors shadow-sm">
          <Filter size={14} className="mr-2" />
          Filter Node
        </Button>
      </div>

      <div className="border border-slate-100 rounded-3xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-50">
              <TableHead className="px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest py-5">Verified At</TableHead>
              <TableHead className="px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest py-5">Operation</TableHead>
              <TableHead className="px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest py-5">Category</TableHead>
              <TableHead className="px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest py-5">ID Ref</TableHead>
              <TableHead className="px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest py-5">Status</TableHead>
              <TableHead className="px-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest py-5 text-right">Value (INR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-80 text-center text-slate-400">
                   <div className="flex flex-col items-center justify-center gap-4">
                     <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 border border-slate-100 italic serif text-2xl">
                       i
                     </div>
                     <p className="font-bold uppercase tracking-widest text-[10px]">No records found in current view</p>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-slate-50/30 cursor-pointer transition-colors border-slate-50 group">
                  <TableCell className="px-8 py-5 text-slate-400 font-mono text-[10px] tracking-tighter">
                    {tx.timestamp ? format(new Date(tx.timestamp.seconds * 1000), 'MMM d, p').toUpperCase() : 'PENDING'}
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <span className="font-bold text-slate-900 group-hover:underline underline-offset-4 decoration-slate-200">{tx.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md text-slate-500">
                      {tx.category}
                    </span>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                      NOD-{tx.accountId.slice(0, 6).toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">{tx.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`px-8 py-5 text-right font-bold font-mono text-xs ${
                    tx.type === 'deposit' || tx.type === 'transfer_in' ? 'text-emerald-600' : 'text-slate-900'
                  }`}>
                    {tx.type === 'deposit' || tx.type === 'transfer_in' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-10 p-4 border-t border-slate-50">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Record set: {filteredTransactions.length} entries matching</p>
        <div className="flex gap-4">
           <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors">Previous Loop</Button>
           <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors">Next Loop</Button>
        </div>
      </div>
    </div>
  );
}
