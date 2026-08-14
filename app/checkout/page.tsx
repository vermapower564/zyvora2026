'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { checkoutAddressSchema } from '@/lib/validations';
import { OrderService } from '@/services/order.service';
import { PaymentService } from '@/services/payment.service';
import { useUIStore } from '@/store/ui-store';
import { ShieldCheck, CreditCard, CheckCircle2, Lock, Smartphone, Building, Banknote } from 'lucide-react';
import { OrderStatus } from '@/constants/order-status';
import { PaymentStatus } from '@/constants/payment-status';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, discount, total, clearCart } = useCart();
  const { addToast } = useUIStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [address, setAddress] = useState({
    fullName: 'Roushan Kumar',
    street: '42 Connaught Place, Block B',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110001',
    country: 'India',
    phone: '+91 9876543210',
  });

  const [paymentProvider, setPaymentProvider] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('roushan@okicici');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutAddressSchema.safeParse(address);
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) errMap[issue.path[0] as string] = issue.message;
      });
      setErrors(errMap);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      // 1. Process payment via simulated Razorpay/UPI gateway
      const paymentRes = await PaymentService.processPayment(
        'temp_ord',
        total,
        paymentProvider === 'UPI' ? 'STRIPE' : paymentProvider === 'COD' ? 'COD' : 'STRIPE'
      );

      // 2. Create Order in service
      const newOrder = await OrderService.createOrder({
        userId: 'usr_demo_customer_1',
        customerName: address.fullName,
        customerEmail: 'customer@zyvora.in',
        items: items.map((i) => ({
          id: `item_${Date.now()}_${i.product.id}`,
          productId: i.product.id,
          product: i.product,
          quantity: i.quantity,
          price: i.product.price,
          sellerId: i.product.sellerId,
        })),
        shippingAddress: {
          id: `addr_${Date.now()}`,
          userId: 'usr_demo_customer_1',
          ...address,
          isDefault: true,
        },
        status: OrderStatus.PROCESSING,
        paymentStatus: paymentProvider === 'COD' ? PaymentStatus.PENDING : PaymentStatus.PAID,
        paymentMethod:
          paymentProvider === 'UPI'
            ? `UPI (${upiId || 'GPay / PhonePe'})`
            : paymentProvider === 'CARD'
            ? 'RuPay / Credit / Debit Card'
            : paymentProvider === 'NET_BANKING'
            ? 'Net Banking (HDFC / SBI / ICICI)'
            : 'Cash on Delivery (COD)',
        subtotal,
        tax,
        shippingFee: shipping,
        discount,
        totalAmount: total,
      });

      clearCart();
      addToast('Order placed successfully! Redirecting to tracking...', 'success');
      router.push(`/customer/orders/${newOrder.id}`);
    } catch (err: any) {
      addToast('Payment error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No items to checkout</h2>
        <Button onClick={() => router.push('/products')} className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold">Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-zinc-950 min-h-screen text-zinc-100">
      {/* Checkout Progress Bar */}
      <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${
            step === 1 ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          <span>1. Indian Delivery Address</span>
        </div>
        <div className="w-8 h-0.5 bg-zinc-800" />
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${
            step === 2 ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          <span>2. Payment in ₹</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Step Forms */}
        <div className="lg:col-span-2 space-y-8">
          {step === 1 ? (
            <form onSubmit={handleNextStep} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">
                Delivery Address (India)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  error={errors.fullName}
                />
                <Input
                  label="Mobile Number (+91)"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  error={errors.phone}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Street Address / House / Flat No."
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    error={errors.street}
                  />
                </div>
                <Input
                  label="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  error={errors.city}
                />
                <Input
                  label="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  error={errors.state}
                />
                <Input
                  label="PIN Code"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  error={errors.postalCode}
                />
                <Input
                  label="Country"
                  value={address.country}
                  disabled
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                />
              </div>

              <Button type="submit" size="lg" className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold">
                Continue to Payment & Review
              </Button>
            </form>
          ) : (
            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">
                Select Indian Payment Gateway
              </h2>

              <div className="space-y-3">
                {/* UPI */}
                <div
                  onClick={() => setPaymentProvider('UPI')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentProvider === 'UPI'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Instant UPI (GPay / PhonePe / Paytm / BHIM)</h4>
                      <p className="text-xs text-zinc-400">Zero transaction fee • Fast 1-click payment</p>
                    </div>
                  </div>
                  {paymentProvider === 'UPI' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </div>

                {paymentProvider === 'UPI' && (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 ml-4 space-y-2">
                    <label className="text-xs text-zinc-400 font-semibold">Enter your UPI VPA ID:</label>
                    <input
                      type="text"
                      placeholder="e.g. mobile@upi or username@okicici"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs"
                    />
                  </div>
                )}

                {/* RuPay / Card */}
                <div
                  onClick={() => setPaymentProvider('CARD')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentProvider === 'CARD'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">RuPay / Visa / Mastercard / Amex</h4>
                      <p className="text-xs text-zinc-400">Credit or Debit Card protected by 3D Secure OTP</p>
                    </div>
                  </div>
                  {paymentProvider === 'CARD' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentProvider('NET_BANKING')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentProvider === 'NET_BANKING'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Net Banking (All Indian Banks)</h4>
                      <p className="text-xs text-zinc-400">HDFC, ICICI, SBI, Axis, Kotak & 50+ banks</p>
                    </div>
                  </div>
                  {paymentProvider === 'NET_BANKING' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentProvider('COD')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentProvider === 'COD'
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Cash on Delivery (COD)</h4>
                      <p className="text-xs text-zinc-400">Pay cash/UPI at doorstep upon delivery</p>
                    </div>
                  </div>
                  {paymentProvider === 'COD' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">
                  Back
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  isLoading={isSubmitting}
                  size="lg"
                  className="w-2/3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatCurrency(total)} & Complete Order</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">Order Summary</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <div className="truncate pr-2">
                    <span className="font-medium text-white">{item.product.title}</span>
                    <span className="text-zinc-500 ml-1">× {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-zinc-300">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-amber-400 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>GST / Tax (18%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Express Courier Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-base font-black text-white">
                <span>Total Payable</span>
                <span className="text-amber-400">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <span>Backed by 100% ZYVORA India Buyer Guarantee & 14-day return protection.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
