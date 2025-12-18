import { z } from 'zod'

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
})

export type PostType = z.infer<typeof PostSchema>

export const PostListRes = z.array(PostSchema)

export type PostListResType = z.infer<typeof PostListRes>
