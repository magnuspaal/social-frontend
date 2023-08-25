import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone'

const getDateFromISOString = (string: string) => {
  return dayjs(string)
}

export const getPostTimestamp = (string: string, nowString: string) => {
  dayjs.extend(utc)
  dayjs.extend(tz)
  const date = getDateFromISOString(string)
  let now = dayjs()
  now = now.subtract(now.utcOffset(), 'minutes')

  const diffInMinutes = now.diff(date, 'minutes')

  if (diffInMinutes < 2) {
    return nowString
  } else if (diffInMinutes < 60) {
    return diffInMinutes + "m"
  } else if (diffInMinutes < 24 * 60) {
    return (Math.round(diffInMinutes / 60)) + "h"
  } else if (date.year() != now.year()) {
    return date.format("MMM DD YYYY")
  } else {
    return date.format("MMM DD")
  }
}

export const getProfileAge = (
  string: string, 
  time: {days: string, day: string, months: string, month: string, years: string, year: string}
) => {
  dayjs.extend(utc)
  dayjs.extend(tz)
  const date = getDateFromISOString(string)
  let now = dayjs()
  now = now.subtract(now.utcOffset(), 'minutes')

  const diffInMonths = now.diff(date, 'months')
  const diffInDays = now.diff(date, 'days')
  const diffInYears = now.diff(date, 'years')

  if (diffInMonths < 1) {
    return diffInDays + (diffInDays == 1 ? ` ${time.day}` : ` ${time.days}`)
  } else if (diffInMonths < 12) {
    return diffInMonths + (diffInMonths == 1 ? ` ${time.month}` : ` ${time.months}`)
  } else {
    return diffInYears + (diffInYears == 1 ? ` ${time.year}` : ` ${time.years}`)
  }
}