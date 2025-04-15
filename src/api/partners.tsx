import api from "./baseUrl";

export const allPartners = async (limit: number, authToken: string) => {
  const response = await api.get(`partners/all-partners?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data.partners;
};
export const getPartnerById = async (partnerId: string) => {
  const response = await api.get(`/partners/partner/${partnerId}`, {});
  return response.data;
};

export const searchPartners = async (
  limit: number,
  page?: number,
  name?: string,
  tags?: string[],
  sortBy?: string,
  sortOrder?: string,
  active?: boolean | null,
  has_active_sorteio?: boolean | null
) => {
  const tk = localStorage.getItem("token");
  const token = tk ?? false;
  const endpoint = token ? "/users/partners/search" : "/partners/search";
  const response = await api.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      page,
      name,
      tags,
      sortBy,
      sortOrder,
      active,
      has_active_sorteio,
    },
  });
  return response.data;
};
