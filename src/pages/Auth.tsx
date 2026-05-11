import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, TrendingUp, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

export function AuthPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900 overflow-hidden">
      {/* Visual Side */}
      <div className="flex-1 bg-slate-900 overflow-hidden relative hidden md:flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[128px]" />
        </div>
        
        <div className="relative z-10 text-center p-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg text-slate-900 mb-6 font-bold text-xl underline underline-offset-4 shadow-2xl shadow-white/10">
              IB
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              India Bank Digital <br/> <span className="italic serif text-slate-400 font-normal">Banking Unified.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Experience the strength of India's most secure digital management portal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Login Side */}
      <div className="w-full md:w-[480px] bg-white flex flex-col justify-center px-8 md:px-16 py-12 relative">
        <div className="md:hidden flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs underline underline-offset-4">IB</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-800 italic">India Bank</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Access Portal</h3>
            <p className="text-slate-500 text-sm">Please identify yourself via the official authentication flow.</p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={signInWithGoogle} 
              className="w-full bg-slate-900 text-white hover:bg-slate-800 h-14 rounded-xl text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-2px] shadow-lg shadow-slate-900/10"
            >
              <svg className="mr-3 h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Confirm via Google
            </Button>
          </div>

          <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance</p>
              <p className="text-xs text-slate-600 font-medium">KYC V3 Standards</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security</p>
              <p className="text-xs text-slate-600 font-medium">AES-256 Encrypted</p>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-8 right-8 text-center md:text-left">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium leading-relaxed">
            Proprietary Banking Node <br/>
            India Bank Financial Group © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
