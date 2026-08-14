'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { loginSchema } from '../../../lib/validations';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useUIStore } from '../../../store/ui-store';
import { UserRole } from '../../../constants/roles';
import { Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState('admin@zyvora.com');
  const [password, setPassword] = useState('admin123');
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
          id: 'usr_admin_1',
          email,
          name: 'Super Admin User',
          role: UserRole.ADMIN,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'admin_jwt_token'
      );
      addToast('Super Admin authenticated', 'success');
      router.push('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-black text-xl mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Super Admin Control</h1>
          <p className="text-xs text-zinc-400">System oversight, vendor verification, and commission control</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Admin Email"
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

          <Button type="submit" isLoading={isLoading} size="lg" className="w-full mt-2 bg-amber-400 text-zinc-950 hover:bg-amber-300">
            Sign In to Admin Portal
          </Button>
        </form>
      </div>
    </div>
  );
}
