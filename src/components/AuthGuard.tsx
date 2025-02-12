import { Navigate, useLocation } from 'react-router-dom';

// Mock auth state management
const isAuthenticated = () => {
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}