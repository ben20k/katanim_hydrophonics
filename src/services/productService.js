import { baseUrl } from "../components/constants.js"

export const getProducts = async () => {
  try {
    const response = await fetch(baseUrl + "/products");
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(baseUrl + "/categories/");
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};