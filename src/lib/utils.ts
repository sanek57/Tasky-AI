import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Node modules
import {
  format,
  formatRelative,
  isBefore,
  isSameYear,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns'

export function toTitleCase(str: string): string {
  return str[0].toLocaleUpperCase() + str.slice(1)
}

/**
 * Formats a date string to a custom format
 * (e.g. 'Today', 'Tomorrow; 'Yesterday', 'dd MMM' 'dd MMM yyyy')
 *  */
export function formatCustomDate(date: string | number | Date): string {
  const today = new Date()

  // get the relative day string
  const relativeDay = toTitleCase(formatRelative(date, today).split(' at ')[0])

  // list of relatice keywords to check
  const relativeDays: string[] = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ]

  // return the relative day if it mathes
  if (relativeDays.includes(relativeDay)) {
    return relativeDay
  }

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM')
  } else {
    return format(date, 'dd MMM yyyy')
  }
}

/**
 * Returns a color class based on the due date of a task
 */
export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) {
    return
  }

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500'
  }

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500'
  }

  if (isToday(dueDate)) {
    return 'text-emerald-500'
  }

  if (isTomorrow(dueDate) && !completed) {
    return 'text-amber-500'
  }
}

export const getUserId = () => {
  return localStorage.getItem('clerkUserId')
}

export const trancateString = (str: string, maxLength: number = 48) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...'
  } else {
    return str
  }
}
