import { create } from 'zustand'

const useBearStore = create((set) => ({
  // Counter state
  count: 0,
  
  // Posts state
  currentPost: null,
  loading: false,
  error: null,
  lastFetchedId: null,
  
  // Counter actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementByAmount: (amount) => set((state) => ({ count: state.count + amount })),
  reset: () => set({ count: 0 }),
  
  // Posts actions
  fetchPostById: async (postId) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await response.json()
      set({ 
        currentPost: data, 
        loading: false, 
        lastFetchedId: data.id,
        error: null 
      })
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message, 
        currentPost: null 
      })
    }
  },
  
  clearPost: () => set({ 
    currentPost: null, 
    error: null, 
    lastFetchedId: null 
  }),
  
  clearError: () => set({ error: null }),
}))

export default useBearStore 