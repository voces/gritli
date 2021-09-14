export const randomUUID =
  // deno-lint-ignore no-explicit-any
  () => ((crypto as any) as { randomUUID: () => string }).randomUUID();
