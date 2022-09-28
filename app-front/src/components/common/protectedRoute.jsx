import { Navigate } from 'react-router-dom'
import userService from '../../services/userService'

const ProtectedRoute = ({ children, bizOnly }) => {
  const currentUser = userService.getUser()

  if (!currentUser || (bizOnly && !currentUser.biz)) {
    return <Navigate to="/signin" />
  }
  return children
}

export default ProtectedRoute
