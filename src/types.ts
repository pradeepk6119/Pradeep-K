export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankTransaction {
  id: string;
  userId: string;
  accountId: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out';
  amount: number;
  category: string;
  description: string;
  timestamp: string;
  recipientAccount?: string;
  status: 'completed' | 'pending' | 'failed';
}
