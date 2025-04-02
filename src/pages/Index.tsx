
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Redirect to dashboard if logged in, otherwise to login
      navigate(isAuthenticated ? '/dashboard' : '/login');
    }
  }, [navigate, isAuthenticated, isLoading]);

  return null;
};

export default Index;
