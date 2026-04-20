# UI Components
---
description: Read this file before implementing or modifying any UI components in the project.
---
## Rules

- ALL UI elements must use **shadcn/ui** components. Never create custom components from scratch.
- Never install or use any alternative component library (e.g. Radix primitives directly, MUI, Chakra, Headless UI) unless it is already an internal dependency of shadcn/ui.
- Never write raw HTML elements (`<button>`, `<input>`, `<dialog>`, etc.) where an equivalent shadcn/ui component exists.
- Always use the `cn()` utility from `@/lib/utils` when applying conditional or merged class names.

---

## Adding Components

Add new shadcn/ui components using the CLI. Do **not** hand-write component files in `components/ui/`.

```bash
npx shadcn@latest add <component-name>
# e.g.
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
```

Components are scaffolded into `components/ui/` and are part of the codebase — you may read them but treat them as generated files.

---

## Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MyForm() {
  return (
    <form>
      <Input placeholder="Enter a URL" />
      <Button type="submit">Shorten</Button>
    </form>
  );
}
```
