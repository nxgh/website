export { compareDate } from './date'
export { default as readFileFn } from './read-file'
export * from './read-file'
export type { FileReturnType } from './read-file'
export { default as color } from './color'
export { default as useTheme } from './use-theme'
export { default as parseMarkdown } from './parse-markdown'

export const random = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)
