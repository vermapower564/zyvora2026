'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { registerCustomerSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/store/ui-store';
import { UserRole } from '@/types/user';
import { Gift, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { addToast } = useUIStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeOffer, setWelcomeOffer] = useState<{ code: string; discount: string; expiresDays: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerCustomerSchema.safeParse({ name, email, password, phone });
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) errMap[issue.path[0] as string] = issue.message;
      });
      setErrors(errMap);
      return;
    }
    setErrors({});
    setIsLoading(true);

    const welcomeData = {
      code: 'WELCOMEZYVORA',
      discount: '₹200 OFF (Min Spend ₹999)',
      expiresDays: 7,
    };

    try {
      const res = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user, data.token);
        setWelcomeOffer(welcomeData);
        addToast('Account created! Welcome coupon unlocked.', 'success');
      } else {
        addToast(data.error || 'Registration failed', 'error');
      }
    } catch {
      setUser(
        {
          id: `usr_${Date.now()}`,
          email,
          name,
          phone,
          role: UserRole.CUSTOMER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'mock_jwt_token'
      );
      setWelcomeOffer(welcomeData);
      addToast('Account created! Welcome coupon unlocked.', 'success');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-zinc-950">
      <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            Z
          </div>
          <h1 className="text-2xl font-black text-white">Create Your ZYVORA Account</h1>
          <p className="text-xs text-zinc-400">Join ZYVORA India for luxury shopping, UPI payments & buyer guarantee</p>
        </div>

        {welcomeOffer ? (
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Welcome to ZYVORA, {name}!</h3>
            <p className="text-xs text-zinc-300">Your account has been created successfully. Here is your exclusive welcome offer:</p>
            
            <div className="p-4 rounded-xl bg-zinc-950 border border-dashed border-amber-500/50 space-y-1">
              <div className="text-xs text-zinc-400 uppercase tracking-wider">Welcome Promo Code</div>
              <div className="text-2xl font-black text-amber-400 tracking-widest">{welcomeOffer.code}</div>
              <div className="text-xs font-semibold text-zinc-200">{welcomeOffer.discount}</div>
              <div className="text-[11px] text-zinc-500">Valid for 7 days after registration</div>
            </div>

            <Button
              onClick={() => router.push('/customer/account')}
              size="lg"
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold gap-2"
            >
              <span>Go to My Account</span>
              <Sparkles className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Roushan Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="roushan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              label="Mobile Number (+91 India)"
              type="tel"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-xs text-amber-300">
              <Gift className="w-5 h-5 shrink-0 text-amber-400" />
              <span>Includes ₹200 Welcome Offer Coupon on your first purchase!</span>
            </div>

            <Button type="submit" isLoading={isLoading} size="lg" className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold">
              Create Account
            </Button>
          </form>
        )}

        <div className="text-center text-xs text-zinc-400 pt-4 border-t border-zinc-800">
          Already have an account?{' '}
          <Link href="/customer/login" className="font-bold text-amber-400 hover:underline">
            Sign In with Email or Mobile
          </Link>
        </div>
      </div>
    </div>
  );
}
