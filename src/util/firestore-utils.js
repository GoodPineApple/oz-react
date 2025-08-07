import { 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  setDoc
} from 'firebase/firestore'
import { firestore } from './firebase'

// 샘플 포스트 데이터 생성
export const createSamplePosts = async () => {
  const samplePosts = [
    {
      title: "React와 Firebase로 만든 첫 번째 포스트",
      body: "이것은 Firestore를 사용하여 작성된 첫 번째 포스트입니다. React와 Firebase를 함께 사용하면 실시간 데이터베이스 기능을 쉽게 구현할 수 있습니다.",
      userId: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      title: "Firebase Firestore 사용법",
      body: "Firebase Firestore는 NoSQL 문서 데이터베이스입니다. 실시간 업데이트, 오프라인 지원, 자동 확장 등의 기능을 제공합니다.",
      userId: 2,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      title: "React 개발 팁",
      body: "React에서 컴포넌트를 효율적으로 관리하는 방법과 상태 관리를 위한 여러 패턴들을 알아보겠습니다.",
      userId: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      title: "프론트엔드 개발 트렌드",
      body: "2024년 프론트엔드 개발 트렌드와 새로운 기술들에 대해 알아보겠습니다. TypeScript, Next.js, Tailwind CSS 등이 인기를 얻고 있습니다.",
      userId: 3,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      title: "웹 성능 최적화",
      body: "웹 애플리케이션의 성능을 최적화하는 다양한 방법들을 살펴보겠습니다. 이미지 최적화, 코드 분할, 캐싱 전략 등이 포함됩니다.",
      userId: 2,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ]

  try {
    const postsRef = collection(firestore, 'posts')
    const createdPosts = []

    for (const post of samplePosts) {
      const docRef = await addDoc(postsRef, post)
      createdPosts.push({ id: docRef.id, ...post })
    }

    console.log('샘플 포스트가 생성되었습니다:', createdPosts)
    return createdPosts
  } catch (error) {
    console.error('샘플 포스트 생성 중 오류:', error)
    throw error
  }
}

// 샘플 댓글 데이터 생성
export const createSampleComments = async (postId) => {
  const sampleComments = [
    {
      name: "김철수",
      body: "정말 유용한 정보네요! 감사합니다.",
      createdAt: serverTimestamp()
    },
    {
      name: "이영희",
      body: "이 내용으로 프로젝트에 적용해보겠습니다.",
      createdAt: serverTimestamp()
    },
    {
      name: "박민수",
      body: "추가로 더 자세한 설명이 있으면 좋겠어요.",
      createdAt: serverTimestamp()
    }
  ]

  try {
    const commentsRef = collection(firestore, 'posts', postId, 'comments')
    const createdComments = []

    for (const comment of sampleComments) {
      const docRef = await addDoc(commentsRef, comment)
      createdComments.push({ id: docRef.id, ...comment })
    }

    console.log('샘플 댓글이 생성되었습니다:', createdComments)
    return createdComments
  } catch (error) {
    console.error('샘플 댓글 생성 중 오류:', error)
    throw error
  }
}

// 새로운 포스트 생성
export const createPost = async (postData) => {
  try {
    const postsRef = collection(firestore, 'posts')
    const docRef = await addDoc(postsRef, {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    
    console.log('새 포스트가 생성되었습니다:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('포스트 생성 중 오류:', error)
    throw error
  }
}

// 새로운 댓글 생성
export const createComment = async (postId, commentData) => {
  try {
    const commentsRef = collection(firestore, 'posts', postId, 'comments')
    const docRef = await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp()
    })
    
    console.log('새 댓글이 생성되었습니다:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('댓글 생성 중 오류:', error)
    throw error
  }
}

// 모든 샘플 데이터 생성 (포스트 + 댓글)
export const createAllSampleData = async () => {
  try {
    console.log('샘플 데이터 생성을 시작합니다...')
    
    // 먼저 포스트들을 생성
    const posts = await createSamplePosts()
    
    // 각 포스트에 댓글 추가
    for (const post of posts) {
      await createSampleComments(post.id)
    }
    
    console.log('모든 샘플 데이터가 성공적으로 생성되었습니다!')
    return { posts }
  } catch (error) {
    console.error('샘플 데이터 생성 중 오류:', error)
    throw error
  }
} 