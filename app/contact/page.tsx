'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const categories = [
    'General Inquiry',
    'Order Support',
    'Seller Support',
    'Payment Issue',
    'Return / Refund',
    'Technical Support',
    'Business Partnership',
    'Other',
  ];

  const faqs = [
    {
      question: 'How quickly will I receive a response to my inquiry?',
      answer:
        'Our dedicated support team reviews inquiries 24/7. Most customer and seller inquiries receive a response within 2 to 4 business hours.',
    },
    {
      question: 'How do I register as a seller vendor on ZYVORA?',
      answer:
        'Visit our Seller Portal at /seller/register to complete vendor onboarding. You will be prompted to submit store details and business credentials for verification.',
    },
    {
      question: 'Where can I track my recent orders?',
      answer:
        'Sign in to your customer account and navigate to Account > Orders. Live shipping numbers and carrier tracking links are updated in real-time.',
    },
    {
      question: 'What is ZYVORA’s buyer protection policy?',
      answer:
        'Every purchase on ZYVORA is backed by our 100% Buyer Guarantee, covering verified seller authenticity, secure payment escrows, and hassle-free 14-day returns.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'Failed to submit contact message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'General Inquiry',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/90 border border-zinc-700 text-xs font-semibold text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>24/7 Global Client & Vendor Support</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Get in Touch with ZYVORA.
            </h1>

            <p className="text-lg text-zinc-400 font-normal leading-relaxed">
              Have questions about an order, seller store verification, payment disbursals, or enterprise partnerships? Our support team is here to assist you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Email Support</h3>
            <p className="text-sm text-zinc-400 mb-3">Direct response within hours</p>
            <a href="mailto:support@zyvora.com" className="text-sm font-semibold text-amber-400 hover:underline">
              support@zyvora.com
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Customer Care</h3>
            <p className="text-sm text-zinc-400 mb-3">Toll-free 24/7 hotline</p>
            <a href="tel:+18005559876" className="text-sm font-semibold text-amber-400 hover:underline">
              +1 (800) 555-ZYVORA
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Global HQ</h3>
            <p className="text-sm text-zinc-400 mb-3">Enterprise Headquarters</p>
            <span className="text-sm text-zinc-300">
              100 Luxury Plaza, Fifth Ave, New York, NY 10001
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Support Hours</h3>
            <p className="text-sm text-zinc-400 mb-3">Always available</p>
            <span className="text-sm text-zinc-300">
              Mon – Sun: 24 Hours / 365 Days
            </span>
          </div>
        </div>

        {/* Main Grid: Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Thank you for contacting ZYVORA. Your ticket has been logged into our support queue. A representative will contact you shortly.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-zinc-700 text-zinc-200"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexandra Wright"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexandra@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Topic Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide relevant order IDs, store names, or question details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 text-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full gap-2 text-base font-bold bg-amber-500 hover:bg-amber-600 text-zinc-950 shadow-lg shadow-amber-500/20"
                >
                  {loading ? (
                    'Submitting Message...'
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-zinc-500 text-center">
                  Protected by ZYVORA Security Escrows. Messages are logged to secure audit records.
                </p>
              </form>
            )}
          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/60 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full p-4 text-left font-semibold text-zinc-200 text-sm flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <span className="text-amber-400 text-lg font-bold">
                        {activeFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    {activeFaq === index && (
                      <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">ZYVORA Admin Support Desk</h4>
                <p className="text-xs text-zinc-400">View and respond to client messages in Admin Portal</p>
              </div>
              <Link href="/admin/contact-messages">
                <Button size="sm" variant="outline" className="gap-1 text-xs border-amber-500/40 text-amber-400">
                  <span>Manage Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
