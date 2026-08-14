import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user';
import { UserRole } from '../constants/roles';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null, token?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr_demo_customer_1',
        email: 'customer@zyvora.com',
        name: 'Alex Mercer',
        role: UserRole.CUSTOMER,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        phone: '+1 (555) 234-5678',
        createdAt: '2026-01-15T08:00:00.000Z',
        updatedAt: '2026-01-15T08:00:00.000Z',
      },
      token: 'demo_jwt_token_sample',
      isAuthenticated: true,

      setUser: (user, token) =>
        set((state) => ({
          user,
          token: token !== undefined ? token : state.token,
          isAuthenticated: !!user,
        })),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      switchRole: (role: UserRole) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, role }
            : {
                id: 'usr_demo_switched',
                email: `${role.toLowerCase()}@zyvora.com`,
                name: `Demo ${role}`,
                role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
          isAuthenticated: true,
        })),
    }),
    {
      name: 'zyvora-auth-storage',
    }
  )
);
