import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { UserRole } from '../../../constants/roles';

export default function AdminUsersPage() {
  const users = [
    { id: 'usr_1', name: 'Alex Mercer', email: 'customer@zyvora.com', role: UserRole.CUSTOMER, status: 'ACTIVE', joined: '2026-01-15' },
    { id: 'usr_2', name: 'Aura Sound Vendor', email: 'vendor@aurasound.com', role: UserRole.SELLER, status: 'ACTIVE', joined: '2025-10-12' },
    { id: 'usr_3', name: 'Super Admin', email: 'admin@zyvora.com', role: UserRole.ADMIN, status: 'ACTIVE', joined: '2025-09-01' },
    { id: 'usr_4', name: 'Sarah Jenkins', email: 'sarah.j@zyvora.com', role: UserRole.EMPLOYEE, status: 'ACTIVE', joined: '2024-03-15' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">User & Account Moderation</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage global user accounts, role permissions, and access status.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">System Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-bold text-white">{u.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{u.email}</td>
                    <td className="px-4 py-3 font-semibold text-amber-400">{u.role}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300">
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-400">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
