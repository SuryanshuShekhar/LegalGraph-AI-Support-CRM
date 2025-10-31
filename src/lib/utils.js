export const PRIORITY_ORDER = { High: 3, Medium: 2, Low: 1 }

export function classNames(...arr) { return arr.filter(Boolean).join(' ') }
export function nextTicketId(existing) {
  const nums = existing.map(t => parseInt(String(t.id || '').split('-')[1], 10) || 0)
  const next = Math.max(...nums, 0) + 1
  return `TKT-${String(next).padStart(3, '0')}`
}

const norm = s => (s ?? '').toString().trim()

function normalizeTicket(t) {
  if (!t || typeof t !== 'object') t = {}
  const id = norm(t.id) || 'TKT-000'
  const title = t.title ?? '(no title)'
  const customer = t.customer && typeof t.customer === 'object'
    ? { name: t.customer.name ?? '', email: t.customer.email ?? '' }
    : { name: '', email: '' }
  const status = ['Open','In Progress','Resolved','Closed'].includes(t.status) ? t.status : 'Open'
  const priority = ['High','Medium','Low'].includes(t.priority) ? t.priority : 'Medium'
  const created = t.created || new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  const description = t.description ?? ''
  const comments = Array.isArray(t.comments) ? t.comments : []
  return { id, title, customer, status, priority, created, description, comments }
}

function migrateTickets(saved, seed) {
  const base = Array.isArray(saved) ? saved : Array.isArray(seed) ? seed : []
  const map = new Map()
  ;[...base].forEach(x => {
    const n = normalizeTicket(x)
    map.set(norm(n.id), n)
  })
  if (Array.isArray(seed)) {
    seed.forEach(x => {
      const n = normalizeTicket(x)
      const key = norm(n.id)
      if (!map.has(key)) map.set(key, n)
    })
  }
  return [...map.values()]
}

export function saveTickets(tickets) {
  try { localStorage.setItem('lg_tickets', JSON.stringify(tickets)) } catch {}
}

export function loadTickets(seed) {
  try {
    const raw = localStorage.getItem('lg_tickets')
    const parsed = raw ? JSON.parse(raw) : null
    return migrateTickets(parsed, seed)
  } catch {
    return migrateTickets(null, seed)
  }
}

