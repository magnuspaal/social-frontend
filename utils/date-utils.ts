import dayjs, { Dayjs } from "dayjs";

const getDateFromISOString = (string: string) => {
  return dayjs(string)
}

export const getPostTimestamp = (string: string) => {
  const date = getDateFromISOString(string)
  const now = dayjs()

  const diffInMinutes = now.diff(date, 'minutes')

  if (diffInMinutes < 2) {
    return "now"
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

export const getProfileAge = (string: string) => {
  const date = getDateFromISOString(string)
  const now = dayjs()

  const diffInMonths = now.diff(date, 'months')
  const diffInDays = now.diff(date, 'days')
  const diffInYears = now.diff(date, 'years')

  if (diffInMonths < 1) {
    return diffInDays + " days"
  } else if (diffInMonths < 12) {
    return diffInMonths + " months"
  } else {
    return diffInYears + " years"
  }
}