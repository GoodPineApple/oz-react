import useFetch from './useFetch'

/**
 * useUsers 커스텀 훅
 * 모든 사용자 데이터를 가져옵니다.
 * @returns {object} { users, loading, error, refetch }
 */
const useUsers = () => {
  const { data: users, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  return {
    users: users || [],
    loading,
    error,
    refetch
  }
}

export default useUsers 