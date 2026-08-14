export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  role: string;
  department: string;
  designation: string;
  joinDate: string;
  salary: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
  avatar?: string;
  phone?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'HALF_DAY';
  workHours: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'CASUAL' | 'SICK' | 'ANNUAL' | 'MATERNITY';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface DailyWork {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  taskTitle: string;
  description: string;
  hoursSpent: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  gitCommits?: string;
  driveLinks?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  employeeCount: number;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  budget: number;
  startDate: string;
  deadline: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  completionPercentage: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  activeProjects: number;
  totalSpent: number;
}

export interface SalesDeal {
  id: string;
  title: string;
  clientName: string;
  value: number;
  stage: 'PROSPECT' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  probability: number;
  closeDate: string;
}

export interface FinanceTransaction {
  id: string;
  title: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING';
  description?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  monthYear: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'DISBURSED';
  paymentDate?: string;
}

export interface Resignation {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;
  resignationDate: string;
  noticePeriod: number;
  lastWorkingDay: string;
  reason: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
}

export interface InternStudent {
  id: string;
  name: string;
  university: string;
  degree: string;
  department: string;
  mentor: string;
  stipend: number;
  startDate: string;
  endDate: string;
  performance: number;
  tasksCompleted: number;
  githubRepo?: string;
  fullTimeOfferStatus: 'UNDER_REVIEW' | 'OFFERED' | 'DECLINED';
}

export interface DevCommit {
  id: string;
  developer: string;
  repository: string;
  branch: string;
  commitHash: string;
  message: string;
  linesAdded: number;
  linesDeleted: number;
  timestamp: string;
}

export interface SeoKeyword {
  id: string;
  keyword: string;
  searchVolume: number;
  currentRank: number;
  previousRank: number;
  rankChange: 'IMPROVED' | 'DECLINED' | 'STABLE';
  targetUrl: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: string;
  budget: number;
  adSpend: number;
  leads: number;
  cpl: number;
  roas: number;
  ctr: number;
  impressions: number;
}

export interface DesignAsset {
  id: string;
  title: string;
  platform: string;
  format: string;
  designer: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  assetUrl?: string;
  createdAt: string;
}

export interface VideoProduction {
  id: string;
  projectTitle: string;
  shootLocation: string;
  cameraLead: string;
  editor: string;
  renderStage: 'PRE_PRODUCTION' | 'SHOOTING' | 'EDITING' | 'REVIEW' | 'RENDERING' | 'FINAL_APPROVED';
  status: string;
  version: string;
}

export interface ITAsset {
  id: string;
  assetTag: string;
  name: string;
  category: 'LAPTOP' | 'MONITOR' | 'MOBILE' | 'FURNITURE' | 'SERVER';
  assignedTo?: string;
  serialNumber: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE';
  purchaseDate: string;
}

export interface PdfDocument {
  id: string;
  fileName: string;
  category: 'HR' | 'FINANCE' | 'PROJECT' | 'CONTRACT' | 'PAYROLL';
  fileSize: string;
  uploadedBy: string;
  fileUrl: string;
  verification: 'VERIFIED' | 'PENDING' | 'EXPIRED';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';
}
