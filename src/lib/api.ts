import { Project } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper para manejar errores de fetch
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// GET todas las categorías
export async function getCategories() {
  const response = await fetch(`${API_URL}/api/categories`);
  return handleResponse(response);
}

// GET todos los proyectos
export async function getProjects(filters?: {
  category?: string;
  search?: string;
  featured?: boolean;
  status?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.featured) params.append('featured', 'true');
  if (filters?.status) params.append('status', filters.status);
  
  const url = `${API_URL}/api/projects${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);
  return handleResponse<Project[]>(response);
}

// GET proyectos destacados
export async function getFeaturedProjects() {
  const response = await fetch(`${API_URL}/api/projects/featured`);
  return handleResponse<Project[]>(response);
}

// GET un proyecto por ID
export async function getProjectById(id: string) {
  const response = await fetch(`${API_URL}/api/projects/${id}`);
  return handleResponse<Project>(response);
}

// POST crear proyecto (requiere autenticación)
export async function createProject(projectData: Partial<Project>, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(projectData),
  });
  
  return handleResponse<Project>(response);
}

// POST crear donación (requiere autenticación)
export async function createDonation(projectId: string, amount: number, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/donations`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ projectId, amount }),
  });
  
  return handleResponse(response);
}

// GET proyectos del usuario actual (requiere autenticación)
export async function getMyProjects(token?: string) {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/projects/my-projects`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  
  return handleResponse<Project[]>(response);
}

// ADMIN: GET proyectos pendientes
export async function getPendingProjects(token?: string) {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/projects/pending`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  
  return handleResponse<Project[]>(response);
}

// ADMIN: POST aprobar proyecto
export async function approveProject(projectId: string, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/projects/${projectId}/approve`, {
    method: 'POST',
    headers,
    credentials: 'include',
  });
  
  return handleResponse(response);
}

// ADMIN: POST rechazar proyecto
export async function rejectProject(projectId: string, reason: string, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/projects/${projectId}/reject`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ reason }),
  });
  
  return handleResponse(response);
}

// ADMIN: Promocionar a admin
export async function promoteToAdmin(secret: string, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/admin/promote`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ secret }),
  });
  
  return handleResponse(response);
}

// ADMIN: Verificar si es admin
export async function checkIsAdmin(token?: string) {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api/admin/check`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  
  return handleResponse<{ isAdmin: boolean }>(response);
}
