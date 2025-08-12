import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../util/firebase/firebase';
import { useNavigate } from 'react-router';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // 컴포넌트가 마운트되면 자동으로 로그아웃 실행
  React.useEffect(() => {
    handleLogout();
  }, []);

  return null; // 로그아웃 중에는 아무것도 렌더링하지 않음
}

export default Logout; 