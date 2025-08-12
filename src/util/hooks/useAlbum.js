import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

/**
 * useAlbum 커스텀 훅
 * 특정 앨범 정보와 해당 앨범의 사진들을 가져옵니다.
 * @param {string|number} albumId - 앨범 ID
 * @returns {object} { album, photos, loading, error, refetch }
 */
const useAlbum = (albumId) => {
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAlbumData = useCallback(async () => {
    if (!albumId) return

    try {
      setLoading(true)
      setError(null)

      // 앨범 정보와 사진들을 병렬로 가져오기
      const [albumResponse, photosResponse] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      ])

      setAlbum(albumResponse.data)
      setPhotos(photosResponse.data)
    } catch (err) {
      console.error('Album fetch error:', err)
      if (err.response?.status === 404) {
        setError('앨범을 찾을 수 없습니다.')
      } else {
        setError(err.response?.data?.message || err.message || '앨범 데이터를 불러오는데 실패했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }, [albumId])

  useEffect(() => {
    fetchAlbumData()
  }, [fetchAlbumData])

  const refetch = useCallback(() => {
    fetchAlbumData()
  }, [fetchAlbumData])

  return {
    album,
    photos,
    loading,
    error,
    refetch
  }
}

export default useAlbum 