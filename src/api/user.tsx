import UserData from "../pages/authenticate/profile/UserData";
import api from "./baseUrl";

export const registerUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/register", data);
  return response.data;
};

export const loginUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/login", data);
  const token = response.data.token;

  if (token) {
    sessionStorage.setItem("authToken", token); // Armazena o token
  }

  return response.data;
};

export const verificationUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/verify", data);
  return response.data;
};

export const resendVerificationUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/resend-verification", data);
  return response.data;
};

export const newPasswordUser = async (data: Record<string, unknown>) => {
  const { token, newPassword } = data as { token: string; newPassword: string };
  const response = await api.post(`users/new-password/${token}`, {
    newPassword,
  });
  return response.data;
};

export const passwordResetUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/request-password-reset", data);
  return response.data;
};

export const authFacebookUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/auth/facebook", data);
  return response.data;
};

export const authGoogleUser = async (data: Record<string, unknown>) => {
  const response = await api.post("users/auth/google", data);
  return response.data;
};
export const transactionsUser = async (token: string | null) => {
  const response = await api.get("users/transactions?limit=2000", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const rewardUser = async (token: string | null) => {
  const response = await api.get("users/rewards", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const userProfile = async (token: string | null) => {
  const response = await api.get("users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const changePassword = async (
  token: string | null,
  data: { oldPassword: string; newPassword: string }
) => {
  const response = await api.put("users/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const userProfileUpdate = async (
  token: string | null,
  data: UserData | null
) => {
  const response = await api.put("users/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const updateProfilePicture = async (
  token: string | null,
  profilePicture: File
) => {
  const formData = new FormData();
  formData.append("profilePicture", profilePicture);

  const response = await api.put("users/profile-picture", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProfilePicture = async (token: string | null) => {
  const response = await api.delete("users/profile-picture", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
