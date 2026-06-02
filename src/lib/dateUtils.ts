export function getMonthBoundaries(year: number, month: number) {
  // month is 0-indexed (0 = Jan, 11 = Dec)
  const timeMin = new Date(year, month, 1, 0, 0, 0).toISOString()
  const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString()
  return { timeMin, timeMax }
}

export function getCalendarDays(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - startDate.getDay()) // Start from the previous Sunday

  const endDate = new Date(lastDayOfMonth)
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay())) // End on the next Saturday

  const days: Date[] = []
  const current = new Date(startDate)
  while (current <= endDate) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  // Ensure we have 6 weeks (42 days) for consistent layout
  while (days.length < 42) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return days
}

export function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
}
