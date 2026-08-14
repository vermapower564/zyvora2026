import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Please enter a valid email or 10-digit mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerCustomerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit Indian mobile number'),
});

export const registerSellerSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid business email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  storeName: z.string().min(3, 'Store name must be at least 3 characters'),
  description: z.string().min(10, 'Store description must be at least 10 characters'),
  bankAccount: z.object({
    accountHolder: z.string().min(2, 'Account holder name is required'),
    bankName: z.string().min(2, 'Bank name is required'),
    accountNumber: z.string().min(5, 'Account number is required'),
    routingNumber: z.string().min(4, 'IFSC / Routing code is required'),
  }),
});

export const productSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  originalPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  categoryId: z.string().min(1, 'Please select a category'),
  images: z.array(z.string()).min(1, 'At least one product image is required'),
});

export const checkoutAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(3, 'PIN code / Postal code is required'),
  country: z.string().default('India'),
  phone: z.string().min(10, '10-digit mobile number is required'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  category: z.enum([
    'General Inquiry',
    'Order Support',
    'Seller Support',
    'Payment Issue',
    'Return / Refund',
    'Technical Support',
    'Business Partnership',
    'Other',
  ]).default('General Inquiry'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message cannot exceed 2000 characters'),
});

export const updateContactStatusSchema = z.object({
  id: z.string().min(1, 'Message ID is required'),
  status: z.enum(['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
});
