import { useState, useEffect, useCallback } from 'react'
// import './Posts.css'
import Header from '../components/posts/Header'
import PostList from '../components/posts/PostList'
import UserFilter from '../components/posts/UserFilter'
import SearchFilter from '../components/posts/SearchFilter'
import RefreshControl from '../components/posts/RefreshControl'
import Pagination from '../components/posts/Pagination'

function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userIdFilter, setUserIdFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [highlightEnabled, setHighlightEnabled] = useState(true)
  
  const itemsPerPage = 6

  // 필터링된 포스트 계산 (사용자 필터 + 검색 필터)
  const filteredPosts = posts.filter(post => {
    // 사용자 ID 필터 적용
    const matchesUserId = userIdFilter === '' || post.userId === parseInt(userIdFilter)
    
    // 검색어 필터 적용 (제목 또는 본문에서 검색)
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesUserId && matchesSearch
  })

  // 페이징 계산
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // 데이터를 가져오는 함수 (useCallback으로 최적화)
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.')
      }
      const data = await response.json()
      console.log(data);
      setPosts(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // 초기 데이터 로드
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleFilterChange = (value) => {
    setUserIdFilter(value)
    setCurrentPage(1) // 필터 변경시 첫 페이지로 이동
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1) // 검색어 변경시 첫 페이지로 이동
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // 페이지 변경시 스크롤을 맨 위로 이동
    // window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRefresh = () => {
    fetchPosts()
    setCurrentPage(1) // 새로고침 시 첫 페이지로 이동
  }

  const handleHighlightToggle = (enabled) => {
    setHighlightEnabled(enabled)
  }

  return (
    <div className="space-y-6">
      <Header postsCount={filteredPosts.length} />
      
      <RefreshControl 
        onRefresh={handleRefresh}
        loading={loading}
        lastUpdated={lastUpdated}
      />
      
      <div className="space-y-6">
        <UserFilter 
          userIdFilter={userIdFilter}
          onFilterChange={handleFilterChange}
          totalPosts={posts.length}
          filteredCount={filteredPosts.length}
        />
        
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          searchResults={filteredPosts.length}
          highlightEnabled={highlightEnabled}
          onHighlightToggle={handleHighlightToggle}
        />
      </div>
      
      <PostList 
        from={'posts'}
        posts={currentPosts} 
        loading={loading} 
        error={error}
        searchTerm={searchTerm}
        highlightEnabled={highlightEnabled}
      />
      
      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredPosts.length}
        />
      )}
    </div>
  )
}

export default Posts
