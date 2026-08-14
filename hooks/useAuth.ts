import { useAuthStore } from '../store/auth-store';
import { UserRole } from '../constants/roles';

export function useAuth() {
  const { user, token, isAuthenticated, setUser, logout, switchRole } = useAuthStore();

  const isCustomer = user?.role === UserRole.CUSTOMER;
  const isSeller = user?.role === UserRole.SELLER;
  const isAdmin = user?.role === UserRole.ADMIN;
  const isEmployee = user?.role === UserRole.EMPLOYEE || user?.role === UserRole.HR;

  return {
    user,
    token,
    isAuthenticated,
    isCustomer,
    isSeller,
    isAdmin,
    isEmployee,
    setUser,
    logout,
    switchRole,
  };
}
