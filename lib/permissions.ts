import { UserRole } from '../types/user';

export type Permission =
  | 'overview.view'
  | 'command_center.view'
  | 'employees.view'
  | 'employees.manage'
  | 'attendance.view'
  | 'attendance.manage'
  | 'daily_work.view'
  | 'daily_work.submit'
  | 'daily_work.approve'
  | 'projects.view'
  | 'projects.manage'
  | 'clients.view'
  | 'clients.manage'
  | 'sales.view'
  | 'sales.manage'
  | 'finance.view'
  | 'finance.manage'
  | 'payroll.view'
  | 'payroll.approve'
  | 'leave.view'
  | 'leave.approve'
  | 'resignations.view'
  | 'resignations.approve'
  | 'interns.view'
  | 'interns.manage'
  | 'developer.view'
  | 'seo.view'
  | 'marketing.view'
  | 'design.view'
  | 'video.view'
  | 'it_assets.view'
  | 'it_assets.manage'
  | 'documents.view'
  | 'documents.upload'
  | 'audit.view'
  | 'settings.manage';

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  SUPER_ADMIN: [
    'overview.view',
    'command_center.view',
    'employees.view',
    'employees.manage',
    'attendance.view',
    'attendance.manage',
    'daily_work.view',
    'daily_work.submit',
    'daily_work.approve',
    'projects.view',
    'projects.manage',
    'clients.view',
    'clients.manage',
    'sales.view',
    'sales.manage',
    'finance.view',
    'finance.manage',
    'payroll.view',
    'payroll.approve',
    'leave.view',
    'leave.approve',
    'resignations.view',
    'resignations.approve',
    'interns.view',
    'interns.manage',
    'developer.view',
    'seo.view',
    'marketing.view',
    'design.view',
    'video.view',
    'it_assets.view',
    'it_assets.manage',
    'documents.view',
    'documents.upload',
    'audit.view',
    'settings.manage',
  ],
  DIRECTOR: [
    'overview.view',
    'command_center.view',
    'employees.view',
    'attendance.view',
    'projects.view',
    'clients.view',
    'sales.view',
    'finance.view',
    'payroll.view',
    'payroll.approve',
    'leave.view',
    'resignations.view',
    'resignations.approve',
    'audit.view',
  ],
  HR: [
    'overview.view',
    'employees.view',
    'employees.manage',
    'attendance.view',
    'attendance.manage',
    'payroll.view',
    'payroll.approve',
    'leave.view',
    'leave.approve',
    'resignations.view',
    'resignations.approve',
    'interns.view',
    'interns.manage',
    'documents.view',
  ],
  FINANCE: [
    'overview.view',
    'finance.view',
    'finance.manage',
    'payroll.view',
    'payroll.approve',
    'clients.view',
    'sales.view',
    'documents.view',
  ],
  SALES_MANAGER: [
    'overview.view',
    'sales.view',
    'sales.manage',
    'clients.view',
    'clients.manage',
    'projects.view',
  ],
  PROJECT_MANAGER: [
    'overview.view',
    'projects.view',
    'projects.manage',
    'daily_work.view',
    'daily_work.approve',
    'developer.view',
    'design.view',
    'video.view',
  ],
  DEVELOPER: [
    'overview.view',
    'projects.view',
    'daily_work.submit',
    'daily_work.view',
    'developer.view',
  ],
  SEO_EXECUTIVE: [
    'overview.view',
    'seo.view',
    'marketing.view',
    'daily_work.submit',
  ],
  DIGITAL_MARKETING_MANAGER: [
    'overview.view',
    'marketing.view',
    'seo.view',
    'sales.view',
    'daily_work.submit',
  ],
  GRAPHIC_DESIGNER: [
    'overview.view',
    'design.view',
    'daily_work.submit',
  ],
  VIDEO_EDITOR: [
    'overview.view',
    'video.view',
    'daily_work.submit',
  ],
  INTERN: [
    'overview.view',
    'daily_work.submit',
    'interns.view',
  ],
  CLIENT: [
    'overview.view',
    'projects.view',
    'documents.view',
  ],
  ADMIN: [
    'overview.view',
    'command_center.view',
    'employees.view',
    'employees.manage',
    'attendance.view',
    'projects.view',
    'audit.view',
  ],
  EMPLOYEE: [
    'overview.view',
    'attendance.view',
    'daily_work.submit',
    'leave.view',
  ],
};

export function hasPermission(role: UserRole | string, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.EMPLOYEE;
  return perms.includes(permission);
}

export function canAccessRoute(role: UserRole | string, pathname: string): boolean {
  if (role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'DIRECTOR') return true;
  if (pathname.startsWith('/dashboard/command-center') && (role === 'DIRECTOR' || role === 'SUPER_ADMIN')) return true;
  if (pathname.startsWith('/finance') && (role === 'FINANCE' || role === 'DIRECTOR')) return true;
  if (pathname.startsWith('/payroll') && (role === 'HR' || role === 'FINANCE' || role === 'DIRECTOR')) return true;
  if (pathname.startsWith('/sales') && (role === 'SALES_MANAGER' || role === 'SALES_EXECUTIVE')) return true;
  return true;
}
