import { Navigate } from 'react-router';
import useRole from '../hooks/UseRole';
import Loading from '../Components/Loading';

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading />;

  if (role !== 'charity') {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdminRoute;
