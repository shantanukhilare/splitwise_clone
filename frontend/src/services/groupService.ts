import axios from 'axios';
import { environment } from '../environment';

const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

export interface Group {
  groupName: string;
  memberCount: number;
  groupId?: number;
}

export interface CreateGroupPayload {
  name: string;
  createdBy: number;
  userIds: number[];
}

export const groupService = {
  getGroupsByUser: async (userId: number) => {
    const res = await api.get<Group[]>(`/groups?userId=${userId}`);
    return res.data;
  },
  createGroup: async (payload: CreateGroupPayload) => {
    const res = await api.post('/groups', payload);
    return res.data;
  },
  getGroupMembers: async (groupId: number) => {
    const res = await api.get(`/groups/${groupId}`);
    return res.data;
  },
  getGroupsForUser: async (userId: number) => {
    const res = await api.get(`/groups/user/${userId}`);
    return res.data;
  },
};
