import useFetch from './useFetch'

/**
 * useAlbums 커스텀 훅
 * 모든 앨범 데이터를 가져옵니다.
 * @returns {object} { albums, loading, error, refetch }
 */
const useAlbums = () => {
  console.log('useAlbums')
  const { data: albums, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/albums',
  )

  return {
    albums: albums || [],
    loading,
    error,
    refetch
  }
}

export default useAlbums 