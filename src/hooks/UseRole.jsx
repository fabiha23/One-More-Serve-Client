import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

const useRole = () => {
  const { user, loading } = useAuth()
  // const axiosSecure = useAxios()
  const axiosInstance=useAxios()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosInstance(`/users/role/${user?.email}`)
      return data
    },
  })
  console.log(role, isRoleLoading)
  
  return [role?.role, isRoleLoading]
}

export default useRole