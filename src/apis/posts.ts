import http from '@/lib/http'
import type { PostListResType } from '@/schemas/post.schema'

const postApiRequest = {
  getPostList: () => http.get<PostListResType>('https://jsonplaceholder.typicode.com/posts')
}

export default postApiRequest
