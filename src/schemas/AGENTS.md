## Package identity

- **Purpose**: Zod schemas for data validation and TypeScript type generation
- **Tech**: Zod v4 + TypeScript

## Current schemas

| File | Schemas |
|------|---------|
| `post.schema.ts` | `PostSchema`, `PostListRes` — Post entity and list response |

## Patterns & conventions

### Schema structure (REQUIRED pattern)

```ts
// ✅ DO: Follow this pattern (see src/schemas/post.schema.ts)
import { z } from 'zod'

// 1. Define base entity schema
export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
})

// 2. Export inferred type
export type PostType = z.infer<typeof PostSchema>

// 3. Define response schemas (for API responses)
export const PostListRes = z.array(PostSchema)
export type PostListResType = z.infer<typeof PostListRes>

// 4. Define request body schemas (for mutations)
export const CreatePostBody = PostSchema.omit({ id: true })
export type CreatePostBodyType = z.infer<typeof CreatePostBody>

export const UpdatePostBody = PostSchema.partial().omit({ id: true })
export type UpdatePostBodyType = z.infer<typeof UpdatePostBody>
```

### Naming conventions

| Pattern | Example |
|---------|---------|
| File name | `{resource}.schema.ts` → `post.schema.ts`, `user.schema.ts` |
| Base schema | `{Resource}Schema` → `PostSchema`, `UserSchema` |
| Base type | `{Resource}Type` → `PostType`, `UserType` |
| List response | `{Resource}ListRes` → `PostListRes` |
| List response type | `{Resource}ListResType` → `PostListResType` |
| Create body | `Create{Resource}Body` → `CreatePostBody` |
| Update body | `Update{Resource}Body` → `UpdatePostBody` |

### Adding a new schema file

Create `src/schemas/resource.schema.ts`:

```ts
import { z } from 'zod'

// Base entity
export const ResourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  status: z.enum(['active', 'inactive', 'pending'])
})

export type ResourceType = z.infer<typeof ResourceSchema>

// API responses
export const ResourceListRes = z.array(ResourceSchema)
export type ResourceListResType = z.infer<typeof ResourceListRes>

export const ResourceRes = ResourceSchema
export type ResourceResType = z.infer<typeof ResourceRes>

// Request bodies
export const CreateResourceBody = ResourceSchema.omit({ id: true, createdAt: true })
export type CreateResourceBodyType = z.infer<typeof CreateResourceBody>

export const UpdateResourceBody = CreateResourceBody.partial()
export type UpdateResourceBodyType = z.infer<typeof UpdateResourceBody>
```

### Common Zod patterns

```ts
// String validations
z.string().min(1, 'Required')
z.string().email('Invalid email')
z.string().url('Invalid URL')
z.string().datetime()

// Number validations
z.number().positive()
z.number().int()
z.number().min(0).max(100)

// Optional fields
z.string().optional()
z.string().nullable()
z.string().nullish()  // optional | null

// Enums
z.enum(['admin', 'user', 'guest'])

// Arrays
z.array(PostSchema)
z.array(z.string()).min(1)

// Objects
z.object({ ... }).partial()        // All fields optional
z.object({ ... }).pick({ id: true })  // Only id
z.object({ ... }).omit({ id: true })  // Everything except id
z.object({ ... }).extend({ extra: z.string() })  // Add fields

// Union types
z.union([z.string(), z.number()])
z.discriminatedUnion('type', [
  z.object({ type: z.literal('a'), a: z.string() }),
  z.object({ type: z.literal('b'), b: z.number() })
])
```

### Using schemas for validation

```ts
// Parse (throws on invalid)
const post = PostSchema.parse(data)

// Safe parse (returns result object)
const result = PostSchema.safeParse(data)
if (result.success) {
  console.log(result.data)
} else {
  console.error(result.error)
}
```

## Data flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   schemas/  │───▶│    apis/    │───▶│  queries/   │
│  (Zod)      │    │  (Axios)    │    │  (TanStack) │
└─────────────┘    └─────────────┘    └─────────────┘
  Types & validation → HTTP calls → React hooks
```

## JIT hints

```bash
# Find all schemas
rg -n "export const.*Schema" src/schemas

# Find all types
rg -n "export type" src/schemas

# Find schema usage
rg -n "PostSchema" src

# Find all schema files
fd ".schema.ts" src/schemas
```

## Common gotchas

- **Export both**: Always export both schema (`XxxSchema`) and type (`XxxType`)
- **Type inference**: Use `z.infer<typeof Schema>` for types, don't duplicate
- **Response vs Body**: Separate response schemas (from API) and body schemas (to API)
- **File naming**: `{resource}.schema.ts` in kebab-case

## Pre-PR checks

```bash
npm run lint && npm run prettier && npm run build
```

