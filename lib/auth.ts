import { UserRole } from '../constants/roles';
import { User } from '../types/user';

export interface AuthSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export function generateToken(user: Partial<User>): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  return btoa(JSON.stringify(payload));
}

export function decodeToken(token: string): any {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

export function mockHashPassword(password: string): string {
  return `hashed_${password}_secret_salt`;
}

export function mockComparePassword(password: string, hash: string): boolean {
  return mockHashPassword(password) === hash || hash.includes(password);
}
