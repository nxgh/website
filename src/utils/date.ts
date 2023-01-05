import dayjs from 'dayjs'

type DayProps = string | number | Date | Dayjs | null | undefined

/**
 * @description  排序两个日期的先后
 */
export const compareDate = (a: DayProps, b: DayProps, unit: dayjs.OpUnitType = 'day') =>
  dayjs(a).isBefore(dayjs(b), unit) ? -1 : dayjs(a).isSame(dayjs(b), unit) ? 0 : 1
