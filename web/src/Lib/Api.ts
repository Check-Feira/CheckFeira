import axios from "axios";
import { WishlistItem, newWishListItem } from '../Types/WishlistItem.interface'

export const axiosConfig = axios.create({
  baseURL: 'http://localhost:3333',
});

const api = {
  getWishList: async () => {
    try {
      const res = await axiosConfig.get('/wishlist');
      return res.data;
    } catch (error) {
      console.error("Error getting wishlist", error);
      throw error;
    }
  },
  getWishListItem: async (itemId: string) => {
    try {
      const res = await axiosConfig.get(`/wishlist/${itemId}`);
      return res.data;
    } catch (error) {
      console.error("Error getting wishlist item", error);
      throw error;
    }
  },
  postWishList: async (item: newWishListItem) => {
    try {
      const res = await axiosConfig.post('/wishlist', item);
      return res.data;
    } catch (error) {
      console.error("Error posting wishlist item:", error);
      throw error;
    }
  },
  putWishList: async (itemId: string, updatedItem: Partial<WishlistItem>) => {
    try {
      const res = await axiosConfig.put(`/wishlist/${itemId}`, updatedItem);
      return res.data;
    } catch (error) {
      console.error("Error updating wishlist item:", error);
      throw error;
    }
  },
  deleteWishList: async (itemId: string) => {
    try {
      const res = await axiosConfig.delete(`/wishlist/${itemId}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      throw error;
    }
  },
};

export default api;