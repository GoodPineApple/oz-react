import './App.css'

import { Routes, Route } from 'react-router'
import Posts from './pages/posts/Posts'
import Post from './pages/posts/Post'
import Users from './pages/users/Users'
import User from './pages/users/User'
import FirePosts from './pages/fireposts/FirePosts'
import FirePost from './pages/fireposts/FirePost'
import FirePostCreate from './pages/fireposts/FirePostCreate'
import Todo from './pages/info/todo/Todo'
import Counter from './pages/info/counter/Counter'
import BearCounter from './pages/info/bearcounter/BearCounter'
import BasicLayout from './components/layouts/BasicLayout'
import PostLayout from './components/layouts/PostLayout'
import NotFound from './components/NotFound'
import Home from './pages/home/Home'
import About from './pages/info/about/About'
import Location from './pages/info/location/Location'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Logout from './pages/auth/Logout'
import EmailVerification from './pages/auth/EmailVerification'
import ProtectedRoute from './pages/auth/ProtectedRoute'
import Albums from './pages/albums/Albums'
import Album from './pages/albums/Album'

function App() {
  // 사용자 로그인했나요? isAuthenticated
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/email-verification" element={<EmailVerification />} />
      <Route path="/auth/logout" element={<Logout />} />
      
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<BasicLayout />}>
        <Route path="about" element={<About />} />
        <Route path="todo" element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        } />
        <Route path="counter" element={<Counter />} />
        <Route path="bearcounter" element={<BearCounter />} />
        <Route path="location" element={<Location />} />
      </Route>
      <Route path="/posts" element={<PostLayout />}>
        <Route index element={<Posts />} />
        <Route path=":postId" element={<Post/>} />
      </Route>
      <Route path="/users" element={<PostLayout />}>
        <Route index element={<Users />} />
        <Route path=":userId" element={<User />} />
      </Route>
      <Route path="/fireposts" element={<PostLayout />}>
        <Route index element={<FirePosts />} />
        <Route path="create" element={<FirePostCreate />} />
        <Route path=":postId" element={<FirePost />} />
      </Route>
      <Route path="/albums">
        <Route index element={<Albums />} />
        <Route path=":albumId" element={<Album />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
