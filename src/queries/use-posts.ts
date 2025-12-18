import postApiRequest from '@/apis/post.api'
import { useQuery } from '@tanstack/react-query'

export const useGetPostList = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postApiRequest.getPostList
  })
}
