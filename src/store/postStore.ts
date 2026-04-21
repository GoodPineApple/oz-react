import { create } from "zustand";
import { API_URL } from "../util/config";
import { axios } from "../util/axios";
import type { Post, PostCreate, PostUpdate } from "../model";

const POST_PATH = "/posts";
const POST_URL = `${API_URL}${POST_PATH}`;

const initialPost: Post = {
  userId: 0,
  id: 0,
  title: "",
  body: "",
};

interface PostState {
  post: Post;
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  getPosts: () => Promise<void>;
  getPost: (postId: number | string) => Promise<void>;
  addPost: (post: PostCreate) => Promise<Post | null>;
  updatePost: (postId: number | string, post: PostUpdate & Post) => Promise<void>;
  deletePost: (postId: number | string) => Promise<void>;
  resetPost: () => void;
  resetPosts: () => void;
  resetError: () => void;
  resetIsLoading: () => void;
}

const usePostStore = create<PostState>((set) => ({
  post: initialPost,
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
  getPosts: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get<Post[]>(POST_URL);
      set({ posts: response.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ isError: true, error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
  getPost: async (postId) => {
    try {
      set({ isLoading: true });
      const response = await axios.get<Post>(`${POST_URL}/${postId}`);
      set({ post: response.data });
    } catch (error) {
      console.error("Error fetching post:", error);
      set({ isError: true, error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
  addPost: async (post) => {
    try {
      set({ isLoading: true });
      const response = await axios.post<Post>(POST_URL, post);
      set((state) => ({ posts: [...state.posts, response.data] }));
      return response.data;
    } catch (error) {
      console.error("Error adding post:", error);
      set({ isError: true, error: error as Error });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  updatePost: async (postId, post) => {
    const idNum = Number(postId);
    try {
      set({ isLoading: true });
      const response = await axios.put<Post>(`${POST_URL}/${postId}`, post);
      set((state) => ({
        posts: state.posts.map((p) => (p.id === idNum ? response.data : p)),
        post: state.post.id === idNum ? response.data : state.post,
      }));
    } catch (error) {
      console.error("Error updating post:", error);
      set({ isError: true, error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
  deletePost: async (postId) => {
    const idNum = Number(postId);
    try {
      set({ isLoading: true });
      await axios.delete(`${POST_URL}/${postId}`);
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== idNum),
        post: state.post.id === idNum ? initialPost : state.post,
      }));
    } catch (error) {
      console.error("Error deleting post:", error);
      set({ isError: true, error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
  resetPost: () => set({ post: initialPost }),
  resetPosts: () => set({ posts: [] }),
  resetError: () => set({ isError: false, error: null }),
  resetIsLoading: () => set({ isLoading: false }),
}));

export default usePostStore;
