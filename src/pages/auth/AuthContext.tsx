import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../../util/firebase/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 서버 기반 auth 상태 변경 감지
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch('http://localhost:3000/api/auth/user', {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     const data = await response.json();
  //     setUser(data);
  //     setLoading(false);
  //   };
  //   fetchUser();
  // }, []);


  // firebase 기반 auth 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 