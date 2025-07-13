// src/services/api.ts
// Centralized API service for Splitwise clone

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPut<T>(endpoint: string, data: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
