import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge'

function Row({ t, onDelete }) {
  const cust = t.customer ?? { name: '', email: '' }
  const href = `/ticket/${encodeURIComponent((t.id || '').trim())}`

  return (
    <tr className="border-b border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900/40">
      <td className="px-4 py-3 text-base text-slate-200/80 dark:text-[rgb(var(--muted))]">{t.id}</td>
      <td className="px-4 py-3 text-base">
        <Link to={href} state={{ ticketId: (t.id || '').trim() }} className="hover:underline">
          {t.title}
        </Link>
      </td>
      <td className="px-4 py-3 text-base">
        <div className="flex flex-col">
          <span>{cust.name}</span>
          {/* Email up from text-xs → text-sm */}
          <span className="text-sm text-slate-600 dark:text-[rgb(var(--muted))]">{cust.email}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-base"><Badge kind={t.status}>{t.status}</Badge></td>
      <td className="px-4 py-3 text-base"><Badge kind={t.priority}>{t.priority}</Badge></td>
      <td className="px-4 py-3 text-base text-slate-600 dark:text-[rgb(var(--muted))]">{t.created}</td>
      <td className="px-4 py-3">
        <button
          className="btn"
          onClick={() => {
            if (window.confirm(`Delete ticket ${t.id}? This cannot be undone.`)) {
              onDelete(t.id)
            }
          }}
          title="Delete ticket"
        >
          🗑 Delete
        </button>
      </td>
    </tr>
  )
}

export default function TicketTable({ tickets, onDelete }) {
  if (!tickets.length) return <div className="panel">No tickets found.</div>
  return (
    <div className="card overflow-x-auto">

      <table className="min-w-full text-base">
        <thead className="text-left">
          <tr className="border-b border-slate-200 dark:border-neutral-800">
            <th className="px-4 py-3 font-semibold text-lg">Ticket ID</th>
            <th className="px-4 py-3 font-semibold text-lg">Title</th>
            <th className="px-4 py-3 font-semibold text-lg">Customer</th>
            <th className="px-4 py-3 font-semibold text-lg">Status</th>
            <th className="px-4 py-3 font-semibold text-lg">Priority</th>
            <th className="px-4 py-3 font-semibold text-lg">Created</th>
            <th className="px-4 py-3 font-semibold text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>{tickets.map(t => <Row key={t.id} t={t} onDelete={onDelete} />)}</tbody>
      </table>
    </div>
  )
}
