import dayjs, { Dayjs } from 'dayjs'

export const random = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const pipe =
  (...fns: any[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)


type DayProps = string | number | Date | Dayjs | null | undefined

/**
 * @description  排序两个日期的先后
 */
export const compareDate = (a: DayProps, b: DayProps, unit: dayjs.OpUnitType = 'day') =>
  dayjs(a).isBefore(dayjs(b), unit) ? -1 : dayjs(a).isSame(dayjs(b), unit) ? 0 : 1
