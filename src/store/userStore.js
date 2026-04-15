import { create } from "zustand";
import { API_URL } from "../util/config";
import { axios } from "../util/axios";

const USER_PATH = "/users";
const USER_URL = `${API_URL}${USER_PATH}`;

const initialUser = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

const useUserStore = create((set) => ({
  user: initialUser,
  users: [],
  isLoading: false,
  isError: false,
  error: null,
  getUsers: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${USER_URL}`);
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  getUser: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${USER_URL}/${userId}`);
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  addUser: async (user) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${USER_URL}`, user);
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.error("Error adding user:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  updateUser: async (userId, user) => {
    const idNum = Number(userId);
    try {
      set({ isLoading: true });
      const response = await axios.put(`${USER_URL}/${userId}`, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === idNum ? response.data : u)),
        user: state.user.id === idNum ? response.data : state.user,
      }));
    } catch (error) {
      console.error("Error updating user:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async (userId) => {
    const idNum = Number(userId);
    try {
      set({ isLoading: true });
      await axios.delete(`${USER_URL}/${userId}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== idNum),
        user: state.user.id === idNum ? initialUser : state.user,
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  resetUser: () => {
    set({ user: initialUser });
  },
  resetUsers: () => {
    set({ users: [] });
  },
  resetError: () => {
    set({ isError: false, error: null });
  },
  resetIsLoading: () => {
    set({ isLoading: false });
  },
}));

export default useUserStore;
