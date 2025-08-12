import useFetch from './useFetch'

/**
 * usePosts 커스텀 훅
 * 모든 포스트 데이터를 가져옵니다.
 * @returns {object} { posts, loading, error, refetch }
 */
const usePosts = () => {
  const { data: posts, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  )

  return {
    posts: posts || [],
    loading,
    error,
    refetch
  }
}

export default usePosts 