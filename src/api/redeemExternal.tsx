import api from "./baseUrl";

export const RedeemExternal = async (
  data: Record<string, unknown>,
  token: string | null
) => {
  const response = await api.post("users/rewards/external/redeem", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
