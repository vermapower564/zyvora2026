import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export default async function SellerSettingsPage() {
  const seller = await SellerService.getSellerById('sel_tech');

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Store Profile Settings</h1>
          <p className="text-xs text-zinc-400 mt-1">Update store branding, banner images, and bank payout settings.</p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 max-w-2xl">
          <Input label="Store Name" defaultValue={seller?.storeName} />
          <Input label="Store Description" defaultValue={seller?.description} />
          <Input label="Bank Account Holder" defaultValue={seller?.bankAccount.accountHolder} />
          <Input label="Bank Name" defaultValue={seller?.bankAccount.bankName} />
          <Input label="Account Number" defaultValue={seller?.bankAccount.accountNumber} />

          <Button size="lg" className="w-full">Save Store Settings</Button>
        </div>
      </main>
    </div>
  );
}
