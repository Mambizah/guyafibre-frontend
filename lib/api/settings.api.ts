import api from './axios';

export interface Setting {
  id: string;
  group: string;
  key: string;
  value: string;
  type: 'string' | 'boolean' | 'number' | 'json';
}

export interface SettingsGroup {
  [key: string]: string;
}

export const settingsApi = {
  getGroup: async (group: string): Promise<SettingsGroup> => {
    const response = await api.get(`/api/settings/${group}`);
    return response.data;
  },

  updateGroup: async (group: string, settings: Record<string, string>): Promise<Setting[]> => {
    const response = await api.put(`/api/settings/${group}`, { settings });
    return response.data;
  },
};

export default settingsApi;
