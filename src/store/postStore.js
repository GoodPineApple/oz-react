import { create } from "zustand";
import { API_URL } from "../util/config";

const POST_PATH = "/posts";
const POST_URL = `${API_URL}${POST_PATH}`;

const initialPost = {
  userId: 0,
  id: 0,
  title: "",
  body: "",
};

const usePostStore = create((set) => ({
  post: initialPost,
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
  getPosts: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${POST_URL}`);
      const data = await response.json();
      set({ posts: data });
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  getPost: async (postId) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${POST_URL}/${postId}`);
      const data = await response.json();
      set({ post: data });
    } catch (error) {
      console.error("Error fetching post:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  addPost: async (post) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${POST_URL}`, {
        method: "POST",
        body: JSON.stringify(post),
      });
      const data = await response.json();
      set((state) => ({ posts: [...state.posts, data] }));
    } catch (error) {
      console.error("Error adding post:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  updatePost: async (postId, post) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${POST_URL}/${postId}`, {
        method: "PUT",
        body: JSON.stringify(post),
      });
      const data = await response.json();
      set((state) => ({
        posts: state.posts.map((p) => (p.id === postId ? data : p)),
      }));
    } catch (error) {
      console.error("Error updating post:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  deletePost: async (postId) => {
    try {
      set({ isLoading: true });
      await fetch(`${POST_URL}/${postId}`, {
        method: "DELETE",
      });
      set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) }));
    } catch (error) {
      console.error("Error deleting post:", error);
      set({ isError: true, error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  resetPost: () => {
    set({ post: initialPost });
  },
  resetPosts: () => {
    set({ posts: [] });
  },
  resetError: () => {
    set({ isError: false, error: null });
  },
  resetIsLoading: () => {
    set({ isLoading: false });
  },
}));

export default usePostStore;
