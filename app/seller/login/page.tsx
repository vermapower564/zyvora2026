'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { loginSchema } from '../../../lib/validations';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useUIStore } from '../../../store/ui-store';
import { UserRole } from '../../../constants/roles';
import { Store } from 'lucide-react';

export default function SellerLoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState('vendor@aurasound.com');
  const [password, setPassword] = useState('vendor123');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
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

    try {
      setUser(
        {
          id: 'usr_seller_1',
          email,
          name: 'Aura Sound Vendor Admin',
          role: UserRole.SELLER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'seller_jwt_token'
      );
      addToast('Vendor portal authenticated', 'success');
      router.push('/seller/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center font-black text-xl mx-auto shadow-md">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Vendor Store Login</h1>
          <p className="text-xs text-zinc-400">Manage catalog, order fulfillment, and earnings payouts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Business Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" isLoading={isLoading} size="lg" className="w-full mt-2">
            Sign In to Vendor Dashboard
          </Button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-4 border-t border-zinc-800">
          Want to sell on Zyvora?{' '}
          <Link href="/seller/register" className="font-bold text-white hover:underline">
            Register Vendor Store
          </Link>
        </div>
      </div>
    </div>
  );
}
