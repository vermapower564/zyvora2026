export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  HR = 'HR',
}

export const ROLES = {
  CUSTOMER: UserRole.CUSTOMER,
  SELLER: UserRole.SELLER,
  ADMIN: UserRole.ADMIN,
  EMPLOYEE: UserRole.EMPLOYEE,
  HR: UserRole.HR,
} as const;
