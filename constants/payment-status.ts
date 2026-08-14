export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, { label: string; color: string }> = {
  [PaymentStatus.PENDING]: { label: 'Pending', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' },
  [PaymentStatus.PAID]: { label: 'Paid', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' },
  [PaymentStatus.FAILED]: { label: 'Failed', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300' },
  [PaymentStatus.REFUNDED]: { label: 'Refunded', color: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300' },
};
