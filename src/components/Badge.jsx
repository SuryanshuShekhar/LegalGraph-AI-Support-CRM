import React from 'react'
import { classNames } from '../lib/utils'

const colorMap = {
  High: 'bg-red-500/10 text-red-600 ring-red-500/30 dark:text-red-400',
  Medium: 'bg-yellow-500/10 text-yellow-700 ring-yellow-500/30 dark:text-yellow-300',
  Low: 'bg-green-500/10 text-green-700 ring-green-500/30 dark:text-green-300',
  Open: 'bg-blue-500/10 text-blue-700 ring-blue-500/30 dark:text-blue-300',
  'In Progress': 'bg-purple-500/10 text-purple-700 ring-purple-500/30 dark:text-purple-300',
  Resolved: 'bg-green-500/15 text-green-700 ring-green-500/30 dark:text-green-300',
  Closed: 'bg-neutral-500/10 text-neutral-700 ring-neutral-500/30 dark:text-neutral-300',
}

export default function Badge({ children, kind }) {
  return (
    <span className={classNames('badge', colorMap[kind] || 'bg-slate-200 text-slate-700')}>
      {children}
    </span>
  )
}
