'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { registerSellerSchema } from '../../../lib/validations';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useUIStore } from '../../../store/ui-store';
import { UserRole } from '../../../constants/roles';
import { Store } from 'lucide-react';

export default function SellerRegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { addToast } = useUIStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
      storeName,
      description,
      bankAccount: { accountHolder, bankName, accountNumber, routingNumber },
    };

    const result = registerSellerSchema.safeParse(payload);
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
          id: `usr_seller_${Date.now()}`,
          email,
          name,
          role: UserRole.SELLER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'seller_token_new'
      );
      addToast(`Store ${storeName} registered!`, 'success');
      router.push('/seller/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center font-black text-xl mx-auto">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Register Vendor Store</h1>
          <p className="text-xs text-zinc-400">Join Zyvora multi-vendor platform and start selling globally</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
              1. Business Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Owner Full Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
              <Input label="Business Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
              <Input label="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} error={errors.storeName} />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
              <div className="sm:col-span-2">
                <Input label="Store Description" value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
              2. Bank Account Details (For Payouts)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Account Holder Name" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
              <Input label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
              <Input label="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              <Input label="Routing Number" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} size="lg" className="w-full">
            Complete Vendor Registration
          </Button>
        </form>
      </div>
    </div>
  );
}
