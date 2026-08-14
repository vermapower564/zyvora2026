import { UserRole } from '../constants/roles';

export { UserRole };

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: UserRole | string;
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
}
