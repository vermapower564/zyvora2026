export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  [OrderStatus.PENDING]: { label: 'Pending Payment', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  [OrderStatus.PROCESSING]: { label: 'Processing', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  [OrderStatus.SHIPPED]: { label: 'Shipped', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  [OrderStatus.DELIVERED]: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  [OrderStatus.CANCELLED]: { label: 'Cancelled', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300' },
  [OrderStatus.RETURNED]: { label: 'Returned', color: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300' },
};
