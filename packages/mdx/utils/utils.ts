export const fileEndWith = (filename: string, type: string[]) => type.some(i => filename.endsWith(i))

export const isMd = (filename: string) => fileEndWith(filename, ['.md', '.mdx'])
