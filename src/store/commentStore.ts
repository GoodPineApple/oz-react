import { create } from "zustand";
import { API_URL } from "../util/config";
import { axios } from "../util/axios";
import type { Comment, CommentCreate } from "../model";

const COMMENT_PATH = "/comments";
const COMMENT_URL = `${API_URL}${COMMENT_PATH}`;

interface CommentState {
  comments: Comment[];
  commentsPostId: number | null;
  isListLoading: boolean;
  isMutating: boolean;
  isError: boolean;
  error: Error | null;
  getCommentsByPostId: (postId: number | string) => Promise<void>;
  addComment: (payload: CommentCreate) => Promise<Comment | null>;
  updateComment: (
    commentId: number | string,
    payload: Partial<Comment> & { postId: number },
  ) => Promise<Comment | null>;
  deleteComment: (commentId: number | string) => Promise<boolean>;
  resetComments: () => void;
  resetError: () => void;
}

const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  commentsPostId: null,
  isListLoading: false,
  isMutating: false,
  isError: false,
  error: null,

  getCommentsByPostId: async (postId) => {
    const pid = Number(postId);
    try {
      set({ isListLoading: true, isError: false, error: null });
      const response = await axios.get<Comment[]>(COMMENT_URL, {
        params: { postId: pid },
      });
      set({ comments: response.data, commentsPostId: pid });
    } catch (error) {
      console.error("Error fetching comments:", error);
      set({ isError: true, error: error as Error });
    } finally {
      set({ isListLoading: false });
    }
  },

  addComment: async (payload) => {
    try {
      set({ isMutating: true, isError: false, error: null });
      const response = await axios.post<Comment>(COMMENT_URL, payload);
      set((state) => ({
        comments:
          state.commentsPostId === Number(payload.postId)
            ? [...state.comments, response.data]
            : state.comments,
      }));
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      set({ isError: true, error: error as Error });
      return null;
    } finally {
      set({ isMutating: false });
    }
  },

  updateComment: async (commentId, payload) => {
    const idNum = Number(commentId);
    try {
      set({ isMutating: true, isError: false, error: null });
      const response = await axios.put<Comment>(
        `${COMMENT_URL}/${commentId}`,
        payload,
      );
      set((state) => ({
        comments: state.comments.map((c) =>
          c.id === idNum ? response.data : c,
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      set({ isError: true, error: error as Error });
      return null;
    } finally {
      set({ isMutating: false });
    }
  },

  deleteComment: async (commentId) => {
    const idNum = Number(commentId);
    try {
      set({ isMutating: true, isError: false, error: null });
      await axios.delete(`${COMMENT_URL}/${commentId}`);
      set((state) => ({
        comments: state.comments.filter((c) => c.id !== idNum),
      }));
      return true;
    } catch (error) {
      console.error("Error deleting comment:", error);
      set({ isError: true, error: error as Error });
      return false;
    } finally {
      set({ isMutating: false });
    }
  },

  resetComments: () => set({ comments: [], commentsPostId: null }),
  resetError: () => set({ isError: false, error: null }),
}));

export default useCommentStore;
