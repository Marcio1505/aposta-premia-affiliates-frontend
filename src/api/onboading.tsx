import api from "./baseUrl";

export const completeOnboarding = async (step: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const data = { step: step };
  const response = await api.post("onboarding/complete", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const onboardingStatus = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await api.get("/onboarding/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const resetOnboarding = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await api.post(
    "/onboarding/reset",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const resetOnboardingStep = async (step: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await api.patch(
    `/onboarding/reset/${step}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
