import { create } from 'zustand'

const useUsersStore = create((set, get) => ({
  // Users list state
  users: [],
  loading: false,
  error: null,
  lastUpdated: null,

  // Single user state
  currentUser: null,
  userLoading: false,
  userError: null,

  // Filters state
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 6,

  // Actions for users list
  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      set({ 
        users: data, 
        loading: false, 
        lastUpdated: new Date(),
        error: null 
      })
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message, 
        users: [] 
      })
    }
  },

  // Actions for single user
  fetchUserById: async (userId) => {
    set({ userLoading: true, userError: null })
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      if (!response.ok) {
        throw new Error('User not found')
      }
      const data = await response.json()
      set({ 
        currentUser: data, 
        userLoading: false, 
        userError: null 
      })
    } catch (error) {
      set({ 
        userLoading: false, 
        userError: error.message, 
        currentUser: null 
      })
    }
  },

  // Filter actions
  setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),

  // Clear actions
  clearUsers: () => set({ 
    users: [], 
    error: null, 
    lastUpdated: null 
  }),
  
  clearCurrentUser: () => set({ 
    currentUser: null, 
    userError: null 
  }),

  clearError: () => set({ error: null }),
  clearUserError: () => set({ userError: null }),

  // Computed values (using selectors)
  getFilteredUsers: () => {
    const { users, searchTerm } = get()
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  },

  getPaginatedUsers: () => {
    const { currentPage, itemsPerPage } = get()
    const filteredUsers = get().getFilteredUsers()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return {
      users: filteredUsers.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredUsers.length / itemsPerPage),
      totalUsers: filteredUsers.length
    }
  }
}))

export default useUsersStore 