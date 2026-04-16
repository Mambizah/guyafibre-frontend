import api from './axios';

export interface Devis {
  id: string;
  reference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company?: string;
  services: string[];
  location: string;
  address?: string;
  description: string;
  urgency: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  status: 'NEW' | 'PENDING' | 'IN_PROGRESS' | 'QUOTE_SENT' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  amount?: string;
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DevisNote {
  id: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export interface DevisResponse {
  id: string;
  subject: string;
  body: string;
  sentAt: string;
  sentBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface DevisQuery {
  page?: number;
  limit?: number;
  status?: string;
  location?: string;
  urgency?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateDevisRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company?: string;
  services: string[];
  location: string;
  address?: string;
  description: string;
  urgency?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  website?: string; // honeypot
}

export const devisApi = {
  // Public - submit a new devis
  create: async (data: CreateDevisRequest): Promise<Devis> => {
    const response = await api.post<Devis>('/api/devis', data);
    return response.data;
  },

  // Admin - get all devis
  findAll: async (query?: DevisQuery) => {
    const response = await api.get('/api/devis', { params: query });
    return response.data;
  },

  // Admin - get single devis
  findOne: async (id: string): Promise<Devis & { notes: DevisNote[]; responses: DevisResponse[] }> => {
    const response = await api.get(`/api/devis/${id}`);
    return response.data;
  },

  // Admin - update status
  updateStatus: async (id: string, data: { status: string; amount?: string }): Promise<Devis> => {
    const response = await api.patch<Devis>(`/api/devis/${id}/status`, data);
    return response.data;
  },

  // Admin - add note
  addNote: async (id: string, content: string): Promise<DevisNote> => {
    const response = await api.post<DevisNote>(`/api/devis/${id}/note`, { content });
    return response.data;
  },

  // Admin - respond to client
  respond: async (id: string, data: { subject: string; body: string }): Promise<DevisResponse> => {
    const response = await api.post<DevisResponse>(`/api/devis/${id}/respond`, data);
    return response.data;
  },

  // Admin - assign devis
  assign: async (id: string, assignedToId: string): Promise<Devis> => {
    const response = await api.patch<Devis>(`/api/devis/${id}/assign`, { assignedToId });
    return response.data;
  },

  // Admin - delete devis
  remove: async (id: string): Promise<void> => {
    await api.delete(`/api/devis/${id}`);
  },

  // Admin - export CSV
  exportCsv: async (query?: DevisQuery): Promise<string> => {
    const response = await api.get('/api/devis/export', { params: query });
    return response.data;
  },
};

export default devisApi;