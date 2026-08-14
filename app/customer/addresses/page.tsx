import React from 'react';
import { CustomerService } from '../../../services/customer.service';
import { MapPin, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default async function AddressesPage() {
  const addresses = await CustomerService.getAddresses('usr_demo_customer_1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Address Book</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage delivery locations for one-click checkout.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 relative">
            {addr.isDefault && (
              <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Default Address
              </span>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{addr.fullName}</h3>
                <span className="text-xs text-zinc-400">{addr.phone}</span>
              </div>
            </div>

            <div className="text-sm text-zinc-300 space-y-0.5 pt-2 border-t border-zinc-800">
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state} {addr.postalCode}</p>
              <p className="text-zinc-500 text-xs font-semibold uppercase">{addr.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
