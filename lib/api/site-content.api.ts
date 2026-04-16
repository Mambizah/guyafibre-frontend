import api from './axios';

export interface SiteContent {
  id: string;
  section: string;
  content: Record<string, any>;
  updatedAt: string;
  updatedBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export const siteContentApi = {
  get: async (section: string): Promise<SiteContent> => {
    const response = await api.get(`/api/site-content/${section}`);
    return response.data;
  },

  getAll: async (): Promise<SiteContent[]> => {
    const response = await api.get('/api/site-content');
    return response.data;
  },

  update: async (section: string, content: Record<string, any>): Promise<SiteContent> => {
    const response = await api.put(`/api/site-content/${section}`, { content });
    return response.data;
  },

  reset: async (section: string): Promise<SiteContent> => {
    const response = await api.post(`/api/site-content/${section}/reset`);
    return response.data;
  },
};

export default siteContentApi;
