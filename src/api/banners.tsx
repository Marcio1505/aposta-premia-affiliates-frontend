import api from "./baseUrl";

export const getBanners = async () => {
  try {
    const response = await api.get("/banners");
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};
