import './App.css'

import { Routes, Route } from 'react-router'
import Posts from './posts/Posts'
import Post from './posts/Post'
import FirePosts from './fireposts/FirePosts'
import FirePost from './fireposts/FirePost'
import FirePostCreate from './fireposts/FirePostCreate'
import Todo from './info/todo/Todo'
import Counter from './info/counter/Counter'
import BasicLayout from './components/layouts/BasicLayout'
import PostLayout from './components/layouts/PostLayout'
import NotFound from './components/NotFound'
import Home from './home/Home'
import About from './info/about/About'
import Location from './info/location/Location'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Logout from './auth/Logout'
import EmailVerification from './auth/EmailVerification'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* 인증 관련 라우트 */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/email-verification" element={<EmailVerification />} />
      <Route path="/auth/logout" element={<Logout />} />
      
      {/* 보호된 라우트 */}
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<BasicLayout />}>
        <Route path="about" element={<About />} />
        <Route path="todo" element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        } />
        <Route path="counter" element={<Counter />} />
        <Route path="location" element={<Location />} />
      </Route>
      <Route path="/posts" element={<PostLayout />}>
        <Route index element={<Posts />} />
        <Route path=":postId" element={<Post/>} />
      </Route>
      <Route path="/fireposts" element={<PostLayout />}>
        <Route index element={<FirePosts />} />
        <Route path="create" element={<FirePostCreate />} />
        <Route path=":postId" element={<FirePost />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
