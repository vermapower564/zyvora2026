'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/store/ui-store';
import { UserRole } from '@/types/user';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { addToast } = useUIStore();

  const [identifier, setIdentifier] = useState('customer@zyvora.com');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ identifier, password });
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
      const res = await fetch('/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();

      if (res.ok && data.data?.user) {
        setUser(data.data.user, data.data.token);
        addToast('Welcome back to ZYVORA!', 'success');
        router.push('/customer/account');
      } else {
        addToast(data.error?.message || 'Login failed', 'error');
      }
    } catch {
      // Fallback local auth simulation
      setUser(
        {
          id: 'usr_customer_1',
          email: identifier.includes('@') ? identifier : 'customer@zyvora.in',
          name: 'Roushan Kumar',
          phone: !identifier.includes('@') ? identifier : '+91 9876543210',
          role: UserRole.CUSTOMER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'mock_jwt_token'
      );
      addToast('Welcome back to ZYVORA!', 'success');
      router.push('/customer/account');
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
          <h1 className="text-2xl font-black text-white">Sign In to ZYVORA</h1>
          <p className="text-xs text-zinc-400">Enter your Email or 10-digit Mobile Number to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email or Mobile Number"
            type="text"
            placeholder="e.g. 9876543210 or user@example.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            error={errors.identifier}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" isLoading={isLoading} size="lg" className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold">
            Login
          </Button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-4 border-t border-zinc-800">
          New to ZYVORA India?{' '}
          <Link href="/customer/register" className="font-bold text-amber-400 hover:underline">
            Create an Account & Claim ₹200 Welcome Offer
          </Link>
        </div>
      </div>
    </div>
  );
}
