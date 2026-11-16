export interface Age {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  // Years, with the fraction of the way from the last birthday to the next
  exact: number
}

// The date a number of whole months after birth, at the same local time of day
function monthsAfter(birth: Date, months: number): Date {
  const date = new Date(birth)
  date.setMonth(birth.getMonth() + months)
  return date
}

export function ageAt(birth: Date, now: Date): Age {
  const seconds = Math.floor((now.getTime() - birth.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  // Calendar months between the two dates, less one while this month's anniversary is still ahead
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()
  if (monthsAfter(birth, months) > now) months--
  const years = Math.floor(months / 12)

  const lastBirthday = monthsAfter(birth, years * 12).getTime()
  const nextBirthday = monthsAfter(birth, (years + 1) * 12).getTime()
  const exact = years + (now.getTime() - lastBirthday) / (nextBirthday - lastBirthday)

  return { years, months, weeks, days, hours, minutes, seconds, exact }
}
