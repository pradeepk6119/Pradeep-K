import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  increment,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { BankAccount, BankTransaction } from '../types';
import { useAuth } from '../hooks/useAuth';

export function useFinance() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const accountsQuery = query(
      collection(db, 'accounts'),
      where('userId', '==', user.uid)
    );

    const transactionsQuery = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribeAccounts = onSnapshot(accountsQuery, (snapshot) => {
      const accs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BankAccount));
      setAccounts(accs);
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'accounts'));

    const unsubscribeTransactions = onSnapshot(transactionsQuery, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BankTransaction));
      setTransactions(txs);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'transactions'));

    return () => {
      unsubscribeAccounts();
      unsubscribeTransactions();
    };
  }, [user]);

  const createAccount = async (name: string, type: BankAccount['type'], initialBalance: number) => {
    if (!user) return;
    try {
      const accountNumber = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
      await addDoc(collection(db, 'accounts'), {
        userId: user.uid,
        name,
        type,
        balance: initialBalance,
        currency: 'USD',
        accountNumber,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'accounts');
    }
  };

  const createTransaction = async (accountId: string, type: BankTransaction['type'], amount: number, description: string, category: string) => {
    if (!user) return;
    try {
      const txData = {
        userId: user.uid,
        accountId,
        type,
        amount,
        description,
        category,
        timestamp: serverTimestamp(),
        status: 'completed'
      };

      await addDoc(collection(db, 'transactions'), txData);
      
      const balanceChange = (type === 'deposit' || type === 'transfer_in') ? amount : -amount;
      const accountRef = doc(db, 'accounts', accountId);
      await updateDoc(accountRef, {
        balance: increment(balanceChange),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'transactions');
    }
  };

  return { accounts, transactions, loading, createAccount, createTransaction };
}
