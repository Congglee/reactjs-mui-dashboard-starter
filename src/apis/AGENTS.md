## Package identity

- **Purpose**: Axios-based API client functions for backend communication
- **Tech**: Axios + TypeScript + Zod (for response types)

## Current API clients

| File          | Endpoints                                        |
| ------------- | ------------------------------------------------ |
| `posts.ts` | `getPostList()` — GET posts from JSONPlaceholder |

## Patterns & conventions

### API client structure (REQUIRED pattern)

```ts
// ✅ DO: Follow this pattern (see src/apis/posts.ts)
import http from '@/lib/http'
import type { PostListResType } from '@/schemas/post.schema'

const postApiRequest = {
  // Note: demo uses an absolute URL; for real APIs prefer relative paths + env baseUrl.
  getPostList: () => http.get<PostListResType>('https://jsonplaceholder.typicode.com/posts')
}

export default postApiRequest
```

### Naming conventions

| Pattern     | Example                                                     |
| ----------- | ----------------------------------------------------------- |
| File name   | `{resource}.ts` → `posts.ts`, `users.ts`                    |
| Export name | `{resource}ApiRequest` → `postApiRequest`, `userApiRequest` |
| GET list    | `get{Resource}List` → `getPostList`, `getUserList`          |
| GET single  | `get{Resource}` → `getPost`, `getUser`                      |
| POST        | `create{Resource}` → `createPost`, `createUser`             |
| PUT         | `update{Resource}` → `updatePost`, `updateUser`             |
| DELETE      | `delete{Resource}` → `deletePost`, `deleteUser`             |

### Adding a new API client

1. Create schema in `src/schemas/resource.schema.ts` (defines types)
2. Create API client in `src/apis/resources.ts`:

```ts
import http from '@/lib/http'
import type { ResourceType, ResourceListResType, CreateResourceBody } from '@/schemas/resource.schema'

const resourceApiRequest = {
  getResourceList: () => http.get<ResourceListResType>('/resources'),
  getResource: (id: number) => http.get<ResourceType>(`/resources/${id}`),
  createResource: (body: CreateResourceBody) => http.post<ResourceType>('/resources', body),
  updateResource: (id: number, body: Partial<CreateResourceBody>) => http.put<ResourceType>(`/resources/${id}`, body),
  deleteResource: (id: number) => http.delete(`/resources/${id}`)
}

export default resourceApiRequest
```

3. Create query hooks in `src/queries/use-resource.ts`

### HTTP client usage

The shared Axios instance is in `src/lib/http.ts`:

```ts
import http from '@/lib/http'

// GET request
http.get<ResponseType>('/endpoint')

// POST request
http.post<ResponseType>('/endpoint', bodyData)

// PUT request
http.put<ResponseType>('/endpoint', bodyData)

// DELETE request
http.delete('/endpoint')
```

### Type imports

```ts
// ✅ DO: Import types from schemas
import type { PostType, PostListResType } from '@/schemas/post.schema'

// ❌ DON'T: Define types in API files
interface Post { ... }  // Put this in schemas/
```

## Data flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   schemas/  │───▶│    apis/    │───▶│  queries/   │
│  (Zod)      │    │  (Axios)    │    │  (TanStack) │
└─────────────┘    └─────────────┘    └─────────────┘
     Types      →    HTTP calls   →    React hooks
```

## JIT hints

```bash
# Find all API clients
rg -n "const.*ApiRequest" src/apis

# Find all endpoints in an API client
rg -n "http\.(get|post|put|delete)" src/apis/posts.ts

# Find usage of an API client
rg -n "postApiRequest" src

# List API modules tracked by git
git ls-files "src/apis/*.ts"
```

## Common gotchas

- **Types from schemas**: Import types from `src/schemas/`, don't define in API files
- **Use http instance**: Always use `http` from `@/lib/http`, not raw Axios
- **Return type**: Generic type in `http.get<T>()` should match schema type
- **File naming**: `{resource}.ts` in kebab-case

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```
