import { useState } from 'react';
import { useFinanceStore } from '../context/FinanceContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRightLeft } from 'lucide-react';

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransferDialog({ open, onOpenChange }: TransferDialogProps) {
  const { accounts, createTransaction } = useFinanceStore();
  const [fromAccountId, setFromAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!fromAccountId || !amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    try {
      await createTransaction(
        fromAccountId,
        'withdrawal',
        parseFloat(amount),
        description || `Transfer to ${description}`,
        'Transfer'
      );
      onOpenChange(false);
      setAmount('');
      setDescription('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
          <DialogDescription>
            Send money securely to another account or person.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">From Account</label>
            <div className="grid gap-2">
              {accounts.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => setFromAccountId(acc.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                    fromAccountId === acc.id 
                      ? 'border-indigo-600 bg-indigo-50/50' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-sm font-bold">{acc.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono tracking-wider">****{acc.accountNumber.slice(-4)}</div>
                  </div>
                  <div className="text-sm font-mono font-bold">₹{acc.balance.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">Recipient Name (e.g. UPI ID or Name)</label>
            <Input 
              placeholder="e.g. rent@okhdfc, John Doe" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Amount (₹)</label>
            <Input 
              type="number"
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-bold"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleTransfer} 
            disabled={loading || !fromAccountId || !amount}
            className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base"
          >
            {loading ? 'Processing...' : (
              <>
                <ArrowRightLeft size={18} className="mr-2" />
                Complete Transfer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
