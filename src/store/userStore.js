import { create } from "zustand";

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
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      set({ users: data });
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
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      const data = await response.json();
      set({ user: data });
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
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "POST",
          body: JSON.stringify(user),
        },
      );
      const data = await response.json();
      set((state) => ({ users: [...state.users, data] }));
    } catch (error) {
      console.error("Error adding user:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  updateUser: async (userId, user) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
        },
      );
      const data = await response.json();
      set((state) => ({
        users: state.users.map((u) => (u.id === userId ? data : u)),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async (userId) => {
    try {
      set({ isLoading: true });
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      });
      set((state) => ({ users: state.users.filter((u) => u.id !== userId) }));
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
