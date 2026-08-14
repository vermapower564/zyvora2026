import {
  Employee,
  AttendanceRecord,
  LeaveRequest,
  DailyWork,
  Department,
  Project,
  Client,
  SalesDeal,
  FinanceTransaction,
  PayrollRecord,
  Resignation,
  InternStudent,
  DevCommit,
  SeoKeyword,
  AdCampaign,
  DesignAsset,
  VideoProduction,
  ITAsset,
  PdfDocument,
  AuditLog,
  Notification,
} from '../types/hrms';
import { prisma } from '../lib/prisma';

class HRMSServiceClass {
  // 1. Employees
  private employees: Employee[] = [
    {
      id: 'emp_1',
      employeeCode: 'EMP-1001',
      name: 'Roushan Verma',
      email: 'roushan.verma@zyvora.com',
      role: 'SUPER_ADMIN',
      department: 'Executive Management',
      designation: 'Managing Director & CTO',
      joinDate: '2022-01-15',
      salary: 185000,
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      phone: '+1 (555) 019-2831',
    },
    {
      id: 'emp_2',
      employeeCode: 'EMP-1002',
      name: 'Elena Rostova',
      email: 'elena.rostova@zyvora.com',
      role: 'PROJECT_MANAGER',
      department: 'Software Engineering',
      designation: 'Lead Project Manager',
      joinDate: '2022-06-10',
      salary: 120000,
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
      phone: '+1 (555) 019-4822',
    },
    {
      id: 'emp_3',
      employeeCode: 'EMP-1003',
      name: 'Marcus Vance',
      email: 'marcus.vance@zyvora.com',
      role: 'DEVELOPER',
      department: 'Software Engineering',
      designation: 'Senior Full Stack Engineer',
      joinDate: '2023-02-01',
      salary: 95000,
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      phone: '+1 (555) 018-9921',
    },
    {
      id: 'emp_4',
      employeeCode: 'EMP-1004',
      name: 'Sarah Connor',
      email: 'sarah.connor@zyvora.com',
      role: 'HR',
      department: 'Human Resources',
      designation: 'Head of People Ops',
      joinDate: '2023-04-12',
      salary: 88000,
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      phone: '+1 (555) 017-3312',
    },
    {
      id: 'emp_5',
      employeeCode: 'EMP-1005',
      name: 'David Sterling',
      email: 'david.sterling@zyvora.com',
      role: 'FINANCE',
      department: 'Finance & Accounting',
      designation: 'Finance Controller',
      joinDate: '2023-05-20',
      salary: 105000,
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      phone: '+1 (555) 016-5541',
    },
  ];

  async getEmployees(): Promise<Employee[]> {
    try {
      const records = await prisma.employee.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          employeeCode: r.employeeCode,
          name: r.name,
          email: r.email,
          role: r.role,
          department: r.department,
          designation: r.designation,
          joinDate: r.joinDate.toISOString().split('T')[0],
          salary: r.salary,
          status: r.status as any,
        }));
      }
    } catch {}
    return this.employees;
  }

  // 2. Attendance
  private attendance: AttendanceRecord[] = [
    { id: 'att_1', employeeId: 'emp_1', employeeName: 'Roushan Verma', date: '2026-08-14', clockIn: '09:00 AM', clockOut: '06:00 PM', status: 'PRESENT', workHours: 9.0 },
    { id: 'att_2', employeeId: 'emp_2', employeeName: 'Elena Rostova', date: '2026-08-14', clockIn: '09:12 AM', clockOut: '06:15 PM', status: 'PRESENT', workHours: 9.0 },
    { id: 'att_3', employeeId: 'emp_3', employeeName: 'Marcus Vance', date: '2026-08-14', clockIn: '09:45 AM', clockOut: '06:30 PM', status: 'LATE', workHours: 8.75 },
    { id: 'att_4', employeeId: 'emp_4', employeeName: 'Sarah Connor', date: '2026-08-14', clockIn: '08:55 AM', clockOut: '05:55 PM', status: 'PRESENT', workHours: 9.0 },
    { id: 'att_5', employeeId: 'emp_5', employeeName: 'David Sterling', date: '2026-08-14', clockIn: '10:00 AM', status: 'LATE', workHours: 5.0 },
  ];

  async getAttendance(): Promise<AttendanceRecord[]> {
    try {
      const records = await prisma.attendance.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          employeeId: r.employeeId,
          employeeName: r.employeeName,
          date: r.date.toISOString().split('T')[0],
          clockIn: r.clockIn,
          clockOut: r.clockOut || undefined,
          status: r.status as any,
          workHours: r.workHours,
        }));
      }
    } catch {}
    return this.attendance;
  }

  // 3. Projects
  private projects: Project[] = [
    { id: 'proj_1', name: 'Zyvora Next.js OMS Platform', clientName: 'Enterprise Core', budget: 145000, startDate: '2026-01-10', deadline: '2026-09-30', status: 'IN_PROGRESS', completionPercentage: 78 },
    { id: 'proj_2', name: 'Aura Sound Labs E-Commerce Store', clientName: 'Aura Sound Labs', budget: 85000, startDate: '2026-02-15', deadline: '2026-10-15', status: 'IN_PROGRESS', completionPercentage: 62 },
    { id: 'proj_3', name: 'OmniPay Mobile Payment Gateway', clientName: 'Global FinTech', budget: 210000, startDate: '2026-03-01', deadline: '2026-12-01', status: 'PLANNING', completionPercentage: 25 },
    { id: 'proj_4', name: 'Nexus Logistics AI Router', clientName: 'Nexus Freight', budget: 98000, startDate: '2025-11-01', deadline: '2026-05-01', status: 'COMPLETED', completionPercentage: 100 },
  ];

  async getProjects(): Promise<Project[]> {
    try {
      const records = await prisma.project.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          name: r.name,
          clientName: r.clientName,
          budget: r.budget,
          startDate: r.startDate.toISOString().split('T')[0],
          deadline: r.deadline.toISOString().split('T')[0],
          status: r.status as any,
          completionPercentage: r.completionPercentage,
        }));
      }
    } catch {}
    return this.projects;
  }

  // 4. Clients
  private clients: Client[] = [
    { id: 'cli_1', name: 'Aura Sound Labs', company: 'Aura Audio Inc', email: 'contact@aurasound.com', phone: '+1 (555) 901-2211', activeProjects: 2, totalSpent: 270000 },
    { id: 'cli_2', name: 'Global FinTech Corp', company: 'Global Financial Solutions', email: 'billing@globalfintech.com', phone: '+1 (555) 888-4422', activeProjects: 1, totalSpent: 420000 },
    { id: 'cli_3', name: 'Nexus Freight', company: 'Nexus Logistics International', email: 'ops@nexusfreight.com', phone: '+1 (555) 321-7788', activeProjects: 1, totalSpent: 195000 },
  ];

  async getClients(): Promise<Client[]> {
    try {
      const records = await prisma.client.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          name: r.name,
          company: r.company,
          email: r.email,
          phone: r.phone,
          activeProjects: r.activeProjects,
          totalSpent: r.totalSpent,
        }));
      }
    } catch {}
    return this.clients;
  }

  // 5. Sales Deals
  private salesDeals: SalesDeal[] = [
    { id: 'deal_1', title: 'Enterprise OMS Expansion', clientName: 'Aura Sound Labs', value: 95000, stage: 'PROPOSAL', probability: 80, closeDate: '2026-09-15' },
    { id: 'deal_2', title: 'AI Logistics Router v2', clientName: 'Nexus Freight', value: 140000, stage: 'NEGOTIATION', probability: 90, closeDate: '2026-10-01' },
    { id: 'deal_3', title: 'FinTech Payment Integration', clientName: 'Global FinTech', value: 220000, stage: 'WON', probability: 100, closeDate: '2026-08-01' },
    { id: 'deal_4', title: 'Cloud Infrastructure Migration', clientName: 'Starlight Media', value: 65000, stage: 'QUALIFIED', probability: 50, closeDate: '2026-11-20' },
  ];

  async getSalesDeals(): Promise<SalesDeal[]> {
    try {
      const records = await prisma.salesDeal.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          title: r.title,
          clientName: r.clientName,
          value: r.value,
          stage: r.stage as any,
          probability: r.probability,
          closeDate: r.closeDate.toISOString().split('T')[0],
        }));
      }
    } catch {}
    return this.salesDeals;
  }

  // 6. Finance Transactions
  private financeTransactions: FinanceTransaction[] = [
    { id: 'tx_1', title: 'Client Payment - Global FinTech', type: 'INCOME', category: 'Project Invoice', amount: 110000, date: '2026-08-10', status: 'COMPLETED' },
    { id: 'tx_2', title: 'AWS Cloud Hosting Services', type: 'EXPENSE', category: 'Infrastructure', amount: 14200, date: '2026-08-05', status: 'COMPLETED' },
    { id: 'tx_3', title: 'Monthly Staff Payroll Disbursal', type: 'EXPENSE', category: 'Payroll', amount: 513000, date: '2026-08-01', status: 'COMPLETED' },
    { id: 'tx_4', title: 'Client Deposit - Aura Sound', type: 'INCOME', category: 'Project Deposit', amount: 45000, date: '2026-07-28', status: 'COMPLETED' },
  ];

  async getFinanceTransactions(): Promise<FinanceTransaction[]> {
    try {
      const records = await prisma.financeTransaction.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          title: r.title,
          type: r.type as any,
          category: r.category,
          amount: r.amount,
          date: r.date.toISOString().split('T')[0],
          status: r.status as any,
          description: r.description || undefined,
        }));
      }
    } catch {}
    return this.financeTransactions;
  }

  // 7. Payroll
  private payrollRecords: PayrollRecord[] = [
    { id: 'pay_1', employeeId: 'emp_1', employeeName: 'Roushan Verma', monthYear: 'August 2026', baseSalary: 185000, bonuses: 15000, deductions: 25000, netPay: 175000, status: 'APPROVED', paymentDate: '2026-08-01' },
    { id: 'pay_2', employeeId: 'emp_2', employeeName: 'Elena Rostova', monthYear: 'August 2026', baseSalary: 120000, bonuses: 8000, deductions: 14000, netPay: 114000, status: 'APPROVED', paymentDate: '2026-08-01' },
    { id: 'pay_3', employeeId: 'emp_3', employeeName: 'Marcus Vance', monthYear: 'August 2026', baseSalary: 95000, bonuses: 5000, deductions: 10000, netPay: 90000, status: 'PENDING' },
    { id: 'pay_4', employeeId: 'emp_4', employeeName: 'Sarah Connor', monthYear: 'August 2026', baseSalary: 88000, bonuses: 4000, deductions: 9000, netPay: 83000, status: 'PENDING' },
  ];

  async getPayroll(): Promise<PayrollRecord[]> {
    try {
      const records = await prisma.payrollRecord.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          employeeId: r.employeeId,
          employeeName: r.employeeName,
          monthYear: r.monthYear,
          baseSalary: r.baseSalary,
          bonuses: r.bonuses,
          deductions: r.deductions,
          netPay: r.netPay,
          status: r.status as any,
          paymentDate: r.paymentDate ? r.paymentDate.toISOString().split('T')[0] : undefined,
        }));
      }
    } catch {}
    return this.payrollRecords;
  }

  // 8. Daily Work Updates
  private dailyWork: DailyWork[] = [
    { id: 'dw_1', employeeId: 'emp_3', employeeName: 'Marcus Vance', date: '2026-08-14', taskTitle: 'Prisma ORM Integration & Auth Guard', description: 'Refactored backend services to query MySQL with fallback stores and added RBAC guards.', hoursSpent: 7.5, status: 'APPROVED', gitCommits: 'commit a4f81b2: Add Prisma models & RBAC helpers' },
    { id: 'dw_2', employeeId: 'emp_2', employeeName: 'Elena Rostova', date: '2026-08-14', taskTitle: 'Sprint 14 Client Sync & Milestone Review', description: 'Conducted sprint review with Aura Sound team and signed off deliverables.', hoursSpent: 8.0, status: 'APPROVED' },
  ];

  async getDailyWork(): Promise<DailyWork[]> {
    try {
      const records = await prisma.dailyWorkUpdate.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          employeeId: r.employeeId,
          employeeName: r.employeeName,
          date: r.date.toISOString().split('T')[0],
          taskTitle: r.taskTitle,
          description: r.description,
          hoursSpent: r.hoursSpent,
          status: r.status as any,
          gitCommits: r.gitCommits || undefined,
          driveLinks: r.driveLinks || undefined,
        }));
      }
    } catch {}
    return this.dailyWork;
  }

  // 9. Leave Requests
  private leaveRequests: LeaveRequest[] = [
    { id: 'lv_1', employeeId: 'emp_3', employeeName: 'Marcus Vance', type: 'CASUAL', startDate: '2026-08-20', endDate: '2026-08-22', reason: 'Personal family event', status: 'APPROVED', createdAt: '2026-08-10' },
    { id: 'lv_2', employeeId: 'emp_5', employeeName: 'David Sterling', type: 'SICK', startDate: '2026-08-18', endDate: '2026-08-19', reason: 'Medical consultation', status: 'PENDING', createdAt: '2026-08-12' },
  ];

  async getLeaveRequests(): Promise<LeaveRequest[]> {
    try {
      const records = await prisma.leaveRequest.findMany();
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          employeeId: r.employeeId,
          employeeName: r.employeeName,
          type: r.type as any,
          startDate: r.startDate.toISOString().split('T')[0],
          endDate: r.endDate.toISOString().split('T')[0],
          reason: r.reason,
          status: r.status as any,
          createdAt: r.createdAt.toISOString().split('T')[0],
        }));
      }
    } catch {}
    return this.leaveRequests;
  }

  // 10. Audit Logs
  private auditLogs: AuditLog[] = [
    { id: 'aud_1', user: 'Roushan Verma', action: 'SYSTEM_UPGRADE', module: 'System Shell', timestamp: '2026-08-14 11:00 AM', ipAddress: '192.168.1.1', details: 'Initialized Enterprise OMS AppShell & RBAC Matrix' },
    { id: 'aud_2', user: 'Sarah Connor', action: 'PAYROLL_APPROVE', module: 'Payroll', timestamp: '2026-08-14 09:30 AM', ipAddress: '192.168.1.42', details: 'Approved August 2026 Payroll Batch' },
    { id: 'aud_3', user: 'Elena Rostova', action: 'PROJECT_CREATE', module: 'Projects', timestamp: '2026-08-13 04:15 PM', ipAddress: '192.168.1.18', details: 'Created Project: Aura Sound Labs E-Commerce' },
  ];

  async getAuditLogs(): Promise<AuditLog[]> {
    try {
      const records = await prisma.auditLog.findMany({ orderBy: { timestamp: 'desc' } });
      if (records.length > 0) {
        return records.map((r) => ({
          id: r.id,
          user: r.user,
          action: r.action,
          module: r.module,
          timestamp: r.timestamp.toLocaleString(),
          ipAddress: r.ipAddress,
          details: r.details,
        }));
      }
    } catch {}
    return this.auditLogs;
  }

  // 11. Notifications
  private notifications: Notification[] = [
    { id: 'not_1', title: 'Payroll Approved', message: 'August 2026 staff payroll batch has been approved for disbursal.', timestamp: '10 min ago', read: false, type: 'SUCCESS' },
    { id: 'not_2', title: 'Leave Request Received', message: 'David Sterling submitted a sick leave request for Aug 18-19.', timestamp: '1 hour ago', read: false, type: 'INFO' },
    { id: 'not_3', title: 'Project Milestone', message: 'Zyvora Next.js OMS Platform reached 78% completion.', timestamp: '3 hours ago', read: true, type: 'SUCCESS' },
  ];

  async getNotifications(): Promise<Notification[]> {
    return this.notifications;
  }
}

export const HRMSService = new HRMSServiceClass();
