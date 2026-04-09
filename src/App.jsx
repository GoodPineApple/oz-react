import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./main/MainPage";
import Day25Page from "./day25/Day25Page";
import Day26Page from "./day26/Day26Page";
import UserList from "./day26/user/UserList";
import PostList from "./day26/post/PostList";
import UserView from "./day26/user/UserView";
import NotFound from "./layout/NotFound";
import MyPage from "./mypage/MyPage";
import PrivateRoute from "./layout/PrivateRoute";
import AuthPage from "./auth/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/day25" element={<Day25Page />} />
        <Route path="/day26" element={<Day26Page />} />
        <Route path="/day26/user" element={<UserList />} />
        <Route path="/day26/post" element={<PostList />} />
        <Route path="/day26/user/:id" element={<UserView />} />
        <Route path="/login" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
