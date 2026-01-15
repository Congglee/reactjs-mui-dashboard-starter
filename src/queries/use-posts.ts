import postApiRequest from '@/apis/posts'
import { useQuery } from '@tanstack/react-query'

export const useGetPostList = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postApiRequest.getPostList
  })
}
