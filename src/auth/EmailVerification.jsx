import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../util/firebase';

function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL 파라미터나 state에서 데이터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const stateData = location.state;
  
  const [email, setEmail] = useState(urlParams.get('email') || stateData?.email || '');
  const [password, setPassword] = useState(urlParams.get('password') || stateData?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(urlParams.get('confirmPassword') || stateData?.confirmPassword || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: 입력, 1: 이메일 확인, 2: 완료
  const [user, setUser] = useState(null);

  // 데이터가 없으면 회원가입 페이지로 리다이렉트
  useEffect(() => {
    if (!email || !password || !confirmPassword) {
      navigate('/auth/signup');
    }
  }, [email, password, confirmPassword, navigate]);

  // 인증 상태 확인
  useEffect(() => {
    if (user) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser && currentUser.emailVerified) {
          setStep(2);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      });

      return () => unsubscribe();
    }
  }, [user, navigate]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    }
    return null;
  };

  const handleStep1 = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      
      // 이메일 인증 메일 발송
      await sendEmailVerification(userCredential.user);
      
      setStep(1);
    } catch (error) {
      console.error('Signup error:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('이미 사용 중인 이메일입니다.');
          break;
        case 'auth/invalid-email':
          setError('올바른 이메일 형식이 아닙니다.');
          break;
        case 'auth/weak-password':
          setError('비밀번호가 너무 약합니다. 더 강한 비밀번호를 사용해주세요.');
          break;
        case 'auth/operation-not-allowed':
          setError('이메일/비밀번호 로그인이 비활성화되어 있습니다.');
          break;
        default:
          setError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');

    try {
      await sendEmailVerification(user);
      setError('인증 메일을 다시 발송했습니다.');
    } catch (error) {
      console.error('Resend error:', error);
      setError('인증 메일 발송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!user) return;
    
    try {
      await user.reload();
      if (user.emailVerified) {
        setStep(2);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('아직 이메일이 인증되지 않았습니다. 메일함을 확인해주세요.');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      setError('인증 상태 확인 중 오류가 발생했습니다.');
    }
  };

  const steps = ['정보 입력', '이메일 인증', '가입 완료'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: 'text.primary',
            mb: 3
          }}>
            회원가입
          </Typography>

          <Stepper activeStep={step} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {step === 0 && (
            <Box component="form" onSubmit={handleStep1}>
              <TextField
                fullWidth
                label="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
              />
              <TextField
                fullWidth
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="new-password"
                helperText="최소 6자 이상"
              />
              <TextField
                fullWidth
                label="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                {loading ? '처리 중...' : '다음 단계'}
              </Button>
            </Box>
          )}

          {step === 1 && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <EmailIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  이메일 인증
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {email}로 인증 메일을 발송했습니다.
                  <br />
                  메일함을 확인하여 링크를 클릭해주세요.
                </Typography>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleRefresh}
                disabled={loading}
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                {loading ? '확인 중...' : '인증 확인'}
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={handleResendEmail}
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                인증 메일 다시 발송
              </Button>
            </Box>
          )}

          {step === 2 && (
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ color: 'success.main' }}>
                회원가입 완료!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                이메일 인증이 완료되었습니다.
                <br />
                잠시 후 홈으로 이동합니다...
              </Typography>
              <CircularProgress sx={{ mt: 3 }} />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default EmailVerification; 