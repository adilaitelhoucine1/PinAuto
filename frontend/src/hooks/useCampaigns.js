import { useState, useCallback } from 'react';
import * as campaignApi from '../api/campaignApi';
import { useToast } from './useToast';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const data = await campaignApi.getCampaigns();
      setCampaigns(data.campaigns || data || []);
    } catch (err) {
      addToast('Failed to fetch campaigns', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const createCampaign = useCallback(
    async (campaignData) => {
      setLoading(true);
      try {
        const data = await campaignApi.createCampaign(campaignData);
        const campaign = data.campaign || data;
        setCampaigns((prev) => [...prev, campaign]);
        addToast('Campaign created successfully', 'success');
        return campaign;
      } catch (err) {
        addToast('Failed to create campaign', 'error');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const publishCampaign = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const data = await campaignApi.publishCampaign(id);
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: 'published', ...data } : c))
        );
        addToast('Campaign published to Pinterest!', 'success');
        return data;
      } catch (err) {
        addToast('Failed to publish campaign', 'error');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return {
    campaigns,
    loading,
    fetchCampaigns,
    createCampaign,
    publishCampaign,
  };
}
