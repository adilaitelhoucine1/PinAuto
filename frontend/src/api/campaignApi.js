import axiosClient from './axiosClient';

export async function createCampaign(data) {
  const response = await axiosClient.post('/api/campaigns', data);
  return response.data;
}

export async function getCampaigns() {
  const response = await axiosClient.get('/api/campaigns');
  return response.data;
}

export async function getCampaign(id) {
  const response = await axiosClient.get(`/api/campaigns/${id}`);
  return response.data;
}

export async function publishCampaign(id) {
  const response = await axiosClient.post(`/api/campaigns/${id}/publish`);
  return response.data;
}
