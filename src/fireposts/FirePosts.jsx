import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '../util/firebase'
import { createAllSampleData } from '../util/firestore-utils'
import Header from '../components/posts/Header'
import PostList from '../components/posts/PostList'
import UserFilter from '../components/posts/UserFilter'
import SearchFilter from '../components/posts/SearchFilter'
import RefreshControl from '../components/posts/RefreshControl'
import Pagination from '../components/posts/Pagination'
import { Button, Alert, Box } from '@mui/material'
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material'
import { Link } from 'react-router'

function FirePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userIdFilter, setUserIdFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [highlightEnabled, setHighlightEnabled] = useState(true)
  const [creatingSampleData, setCreatingSampleData] = useState(false)
  const [sampleDataMessage, setSampleDataMessage] = useState(null)
  
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

  // Firestore에서 데이터를 가져오는 함수
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const postsRef = collection(firestore, 'posts')
      const q = query(postsRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const postsData = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        postsData.push({
          id: doc.id,
          ...data,
          // Firestore timestamp를 Date로 변환
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        })
      })
      
      console.log('Firestore posts:', postsData)
      setPosts(postsData)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Firestore fetch error:', err)
      setError('데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  // 샘플 데이터 생성 함수
  const handleCreateSampleData = async () => {
    try {
      setCreatingSampleData(true)
      setSampleDataMessage(null)
      
      await createAllSampleData()
      setSampleDataMessage({
        type: 'success',
        message: '샘플 데이터가 성공적으로 생성되었습니다!'
      })
      
      // 데이터 새로고침
      await fetchPosts()
    } catch (error) {
      setSampleDataMessage({
        type: 'error',
        message: '샘플 데이터 생성 중 오류가 발생했습니다: ' + error.message
      })
    } finally {
      setCreatingSampleData(false)
    }
  }

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
      
      {/* 액션 버튼들 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          component={Link}
          to="/fireposts/create"
          variant="contained"
          startIcon={<EditIcon />}
          size="large"
        >
          새 포스트 작성
        </Button>
        
        {posts.length === 0 && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleCreateSampleData}
            disabled={creatingSampleData}
          >
            {creatingSampleData ? '생성 중...' : '샘플 데이터 생성'}
          </Button>
        )}
      </Box>
      
      {/* 샘플 데이터 생성 섹션 */}
      {posts.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>아직 포스트가 없습니다. 새 포스트를 작성하거나 샘플 데이터를 생성해보세요!</span>
          </Box>
        </Alert>
      )}
      
      {/* 샘플 데이터 생성 결과 메시지 */}
      {sampleDataMessage && (
        <Alert 
          severity={sampleDataMessage.type} 
          sx={{ mb: 3 }}
          onClose={() => setSampleDataMessage(null)}
        >
          {sampleDataMessage.message}
        </Alert>
      )}
      
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

export default FirePosts 