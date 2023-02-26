export { compareDate } from './date'
export { default as readFiles } from './read-file'
export type { FileReturnType } from './read-file'

export const random = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)
