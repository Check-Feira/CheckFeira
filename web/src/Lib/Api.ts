import axios from "axios";
import { WishlistItem, newWishListItem } from "../Types/WishlistItem.interface";

export const axiosConfig = axios.create({
  baseURL: "https://parseapi.back4app.com/parse/classes",
  headers: {
    "X-Parse-Application-Id": "uoNeJLIaeD5HTPWRPcWYiQH0KvG3WcIglzYE6tE1",
    "X-Parse-REST-API-Key": "dTuCzfM0wa5LyhHMIiPhjzlpGLYksk92YmIveraq",
      "Content-type": "application/json"
  
  },
});

const api = {
  getWishList: async () => {
    try {
      const res = await axiosConfig.get("/produto");
      return res.data.results;
    } catch (error) {
      console.error("Error getting wishlist", error);
      throw error;
    }
  },
  getWishListItem: async (itemId: string) => {
    try {
      const res = await axiosConfig.get(`/produto/${itemId}`);
      return res.data.results;
    } catch (error) {
      console.error("Error getting wishlist item", error);
      throw error;
    }
  },
  postWishList: async (item: newWishListItem) => {
    try {
      const res = await axiosConfig.post("/produto", item);
      return res.data.results;
    } catch (error) {
      console.error("Error posting wishlist item:", error);
      throw error;
    }
  },
  putWishList: async (itemId: string, updatedItem: Partial<WishlistItem>) => {
    try {
      const res = await axiosConfig.put(`/produto/${itemId}`, updatedItem);
      return res.data.results;
    } catch (error) {
      console.error("Error updating wishlist item:", error);
      throw error;
    }
  },
  deleteWishList: async (itemId: string) => {
    try {
      const res = await axiosConfig.delete(`/produto/${itemId}`);
      return res.data.results;
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      throw error;
    }
  },
};

export default api;
