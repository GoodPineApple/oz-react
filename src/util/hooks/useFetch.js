import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'

/**
 * useFetch 커스텀 훅
 * @param {string} url - API 엔드포인트 URL
 * @param {object} options - axios 옵션
 * @param {boolean} immediate - 즉시 실행 여부 (기본값: true)
 * @returns {object} { data, loading, error, refetch }
 */
const useFetch = (url, options = {}, immediate = true) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  // options 객체의 안정적인 참조를 위한 memoization
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(url, memoizedOptions)
      setData(response.data)
    } catch (err) {
      console.error(`Fetch error for ${url}:`, err)
      setError(err.response?.data?.message || err.message || '데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [url, memoizedOptions])

  useEffect(() => {
    if (immediate && url) {
      fetchData()
    }
  }, [url, immediate, fetchData])

  const refetch = useCallback(() => {
    if (url) {
      fetchData()
    }
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch
  }
}

export default useFetch 