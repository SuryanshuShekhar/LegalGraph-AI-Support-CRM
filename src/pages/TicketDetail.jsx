import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/Badge'
import { saveTickets } from '../lib/utils'

const norm = s => (s || '').toString().trim()

export default function TicketDetail({ tickets, setTickets }) {
  const { id: rawParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const incomingId = norm(location.state?.ticketId || rawParam || '')
  const t = tickets.find(x => norm(x.id) === incomingId)

  const [status, setStatus] = React.useState(t?.status || 'Open')
  const [priority, setPriority] = React.useState(t?.priority || 'Medium')
  const [comment, setComment] = React.useState('')

  if (!t) {
    return (
      <div className="panel">
        <p className="mb-4">Ticket not found.</p>
        <div className="text-sm text-slate-500 dark:text-[rgb(var(--muted))]">
          Looking for: <code>{incomingId || '(empty)'}</code>
        </div>
        <Link to="/" className="text-blue-600 hover:underline mt-3 inline-block">Back to Tickets</Link>
      </div>
    )
  }

  function applyPatch(patch) {
    const updated = tickets.map(x => (norm(x.id) === incomingId ? { ...x, ...patch } : x))
    setTickets(updated)
    saveTickets(updated)
  }

  function postComment() {
    if (!comment.trim()) return
    const entry = {
      author: 'Support Team',
      text: comment.trim(),
      createdAt: new Date().toLocaleString('en-US', {
        month: 'long', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    }
    applyPatch({ comments: [...(t.comments || []), entry] })
    setComment('')
  }

  React.useEffect(() => {
    setStatus(t.status)
    setPriority(t.priority)
  }, [t.status, t.priority])

  React.useEffect(() => {
    if (!t) return
    if (t.status !== 'Resolved') return

    const comments = Array.isArray(t.comments) ? t.comments : []
    const alreadyHasUserThanks = comments.some(c => {
      const txt = (c.text || '').toLowerCase()
      const isUser = (c.author || '').toLowerCase() !== 'support team'
      return isUser && (txt.includes('thank') || txt.includes('resolved'))
    })
    if (alreadyHasUserThanks || t.autoThanks) return

    const entry = {
      author: t.customer?.name || 'User',
      text: 'Thank you team — the issue is resolved now.',
      createdAt: new Date().toLocaleString('en-US', {
        month: 'long', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    }
    applyPatch({ comments: [...comments, entry], autoThanks: true })
  }, [t.status])

  function deleteMe() {
    if (!window.confirm(`Delete ticket ${t.id}? This cannot be undone.`)) return
    const updated = tickets.filter(x => norm(x.id) !== incomingId)
    setTickets(updated)
    saveTickets(updated)
    navigate('/')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline">
            ← Back to Tickets
          </button>
          <button className="btn" onClick={deleteMe}>🗑 Delete</button>
        </div>

        <div className="panel space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-slate-500 dark:text-[rgb(var(--muted))]">{t.id}</div>
            <div className="flex items-center gap-2">
              <Badge kind={status}>{status}</Badge>
              <Badge kind={priority}>{priority}</Badge>
            </div>
          </div>
          <h2 className="text-lg font-semibold">
            <a className="text-blue-600 dark:text-indigo-300 hover:underline">{t.title}</a>
          </h2>
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-slate-700 dark:text-slate-300">{t.description}</p>
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold">Comments ({t.comments?.length || 0})</h3>
          <div className="mt-4 space-y-3">
            {(t.comments || []).length === 0 && (
              <div className="text-slate-500 dark:text-[rgb(var(--muted))]">No comments yet</div>
            )}
            {(t.comments || []).map((c, i) => (
              <div key={i} className="rounded-xl border p-4 border-slate-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-[rgb(var(--muted))]">
                  <span>{c.author}</span>
                  <span>{c.createdAt}</span>
                </div>
                <p className="mt-2">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Add Comment</h4>
            <textarea
              className="w-full min-h-[90px] rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
              placeholder="Type your comment here..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button onClick={postComment} className="mt-3 btn btn-primary">Post Comment</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="panel">
          <h3 className="font-semibold">Customer Information</h3>
          <div className="mt-3 text-sm">
            <div className="subtle">Name</div>
            <div className="mb-3">{t.customer?.name}</div>
            <div className="subtle">Email</div>
            <div className="mb-3">{t.customer?.email}</div>
            <div className="subtle">Created</div>
            <div>{t.created} at 05:30 AM</div>
          </div>
        </div>

        <div className="panel">
          <h3 className="font-semibold">Ticket Management</h3>
          <div className="mt-3 space-y-3">
            <div>
              <div className="subtle mb-1">Status</div>
              <select
                className="w-full rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                value={status}
                onChange={e => { setStatus(e.target.value); applyPatch({ status: e.target.value }) }}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

            <div>
              <div className="subtle mb-1">Priority</div>
              <select
                className="w-full rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                value={priority}
                onChange={e => { setPriority(e.target.value); applyPatch({ priority: e.target.value }) }}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
