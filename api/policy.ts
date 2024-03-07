import { axiosInstance } from "./axiosClient";

const API_URL = process.env.API_URL || "http://localhost:8099/api";

export const API_pOLICY = {
  POST_OFFER: `${API_URL}/Offers`,
  POST_POLICY: `${API_URL}/Policies`,
  GET_POLICY_SEARCH: `${API_URL}/PolicySearch`,
};

const postOffer = async (data: any, config = {}) => {
  const res = await axiosInstance.post(API_pOLICY.POST_OFFER, data, config);

  if (res.status === 200) {
    return res;
  }
  return null;
};

const postPolicy = async (data: any, config = {}) => {
  const res = await axiosInstance.post(API_pOLICY.POST_POLICY, data, config);

  if (res.status === 200) {
    return res;
  }
  return null;
};

const searchPolicy = async (queryText: string, config = {}) => {
  const res = await axiosInstance.get(API_pOLICY.GET_POLICY_SEARCH, {
    ...config,
    params: {
      q: queryText,
    },
  });

  if (res.status === 200) {
    return res;
  }
  return null;
};

export const handlePolicyRequest = {
  postOffer,
  postPolicy,
  searchPolicy,
};
