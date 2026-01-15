## Package identity

- **Purpose**: TanStack Query hooks for server state management
- **Tech**: TanStack Query v5 + TypeScript

## Current query hooks

| File | Hooks |
|------|-------|
| `use-posts.ts` | `useGetPostList()` — Fetch posts list |

## Patterns & conventions

### Query hook structure (REQUIRED pattern)

```ts
// ✅ DO: Follow this pattern (see src/queries/use-posts.ts)
import postApiRequest from '@/apis/posts'
import { useQuery } from '@tanstack/react-query'

export const useGetPostList = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postApiRequest.getPostList
  })
}

// With parameters (only if the API client exposes `getPost`)
export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postApiRequest.getPost(id),
    enabled: !!id
  })
}
```

### Mutation hook structure

```ts
// ✅ DO: Mutation pattern
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postApiRequest from '@/apis/posts'
import type { CreatePostBody } from '@/schemas/post.schema'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (body: CreatePostBody) => postApiRequest.createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => postApiRequest.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
```

### Naming conventions

| Pattern | Example |
|---------|---------|
| File name | `use-{resource}.ts` → `use-posts.ts`, `use-users.ts` |
| GET list hook | `useGet{Resource}List` → `useGetPostList` |
| GET single hook | `useGet{Resource}` → `useGetPost` |
| POST hook | `useCreate{Resource}` → `useCreatePost` |
| PUT hook | `useUpdate{Resource}` → `useUpdatePost` |
| DELETE hook | `useDelete{Resource}` → `useDeletePost` |

### Query key conventions

```ts
// ✅ DO: Hierarchical query keys
queryKey: ['posts']                    // List
queryKey: ['posts', id]                // Single by ID
queryKey: ['posts', { status: 'active' }]  // Filtered list
queryKey: ['users', userId, 'posts']   // Nested resource

// ❌ DON'T: Flat, non-hierarchical keys
queryKey: ['post-123']
queryKey: ['user-posts']
```

### Adding a new query hook file

1. Ensure API client exists in `src/apis/`
2. Create `src/queries/use-{resource}.ts`:

```ts
import resourceApiRequest from '@/apis/resource.api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateResourceBody } from '@/schemas/resource.schema'

// GET list
export const useGetResourceList = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: resourceApiRequest.getResourceList
  })
}

// GET single
export const useGetResource = (id: number) => {
  return useQuery({
    queryKey: ['resources', id],
    queryFn: () => resourceApiRequest.getResource(id),
    enabled: !!id
  })
}

// CREATE
export const useCreateResource = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateResourceBody) => resourceApiRequest.createResource(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
    }
  })
}

// UPDATE
export const useUpdateResource = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<CreateResourceBody> }) =>
      resourceApiRequest.updateResource(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
    }
  })
}

// DELETE
export const useDeleteResource = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => resourceApiRequest.deleteResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
    }
  })
}
```

### Using in components

```tsx
// ✅ DO: Use hooks in components
import { useGetPostList } from '@/queries/use-posts'

function PostList() {
  const { data: posts, isLoading, error } = useGetPostList()

  if (isLoading) return <Skeleton />
  if (error) return <Error error={error} />

  return (
    <>
      {posts?.map(post => <PostItem key={post.id} post={post} />)}
    </>
  )
}
```

## QueryClient configuration

Default options in `src/lib/query-client.ts`:

```ts
{
  queries: {
    staleTime: 5 * 60 * 1000,      // 5 minutes fresh
    gcTime: 10 * 60 * 1000,        // 10 minutes cache
    retry: 1,
    refetchOnWindowFocus: false
  },
  mutations: {
    retry: 0
  }
}
```

## JIT hints

```bash
# Find all query hooks
rg -n "export const use" src/queries

# Find hooks for a resource
rg -n "useGet|useCreate|useUpdate|useDelete" src/queries/use-posts.ts

# Find usage of a hook
rg -n "useGetPostList" src

# Find all query keys
rg -n "queryKey:" src/queries
```

## Common gotchas

- **Invalidate after mutations**: Always invalidate related queries on mutation success
- **Query keys**: Use hierarchical arrays, not flat strings
- **Enabled option**: Use `enabled: !!id` for dependent queries
- **File naming**: `use-{resource}.ts` in kebab-case
- **Import from apis**: Query hooks call API clients, not raw Axios

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```

