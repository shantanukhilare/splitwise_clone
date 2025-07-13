// src/services/dashboardService.ts
import { apiGet } from './api';

export interface DashboardSummary {
  youOwe: number;
  youAreOwed: number;
  totalBalance: number;
}

export interface ActivityItem {
  id: string;
  description: string;
  amount?: number;
  type: 'expense' | 'settle';
  users: string[];
  createdAt: string;
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  return apiGet<DashboardSummary>('/dashboard/summary');
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  return apiGet<ActivityItem[]>('/dashboard/activity');
}
