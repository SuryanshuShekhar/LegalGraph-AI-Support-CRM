import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Filters from './components/Filters'
import TicketTable from './components/TicketTable'
import TicketDetail from './pages/TicketDetail'
import NewTicketModal from './components/NewTicketModal'
import Pagination from './components/Pagination'
import { defaultTickets } from './data/tickets'
import { PRIORITY_ORDER, loadTickets, saveTickets, nextTicketId } from './lib/utils'

function formatDateKey(d) {
  const dt = new Date(d)
  const y = dt.getFullYear()
  const m = String(dt.getMonth()+1).padStart(2,'0')
  const day = String(dt.getDate()).padStart(2,'0')
  return `${y}-${m}-${day}`
}

function SummaryCards({ allTickets }) {
  const total = allTickets.length
  const open = allTickets.filter(t => t.status === 'Open').length
  const prog = allTickets.filter(t => t.status === 'In Progress').length
  const res = allTickets.filter(t => t.status === 'Resolved').length
  const closed = allTickets.filter(t => t.status === 'Closed').length

  const Box = ({ label, value, gradient }) => (
    <div
      className={
        `rounded-2xl text-center text-white
         bg-gradient-to-br ${gradient}
         shadow-soft transition-transform duration-200
         hover:-translate-y-0.5 hover:shadow-xl
         flex items-center justify-center flex-col
         px-3 py-2` 
      }
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="text-xs opacity-80 leading-none">{label}</div>
      <div className="mt-1 text-xl font-semibold leading-none">{value}</div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
      <Box label="Total Tickets" value={total}           gradient="from-[#6366F1] to-[#8B5CF6]" />
      <Box label="Open" value={open}       gradient="from-[#EF4444] to-[#DC2626]" />
      <Box label="In Progress" value={prog} gradient="from-[#F59E0B] to-[#F97316]" />
      <Box label="Resolved" value={res}    gradient="from-[#3B82F6] to-[#06B6D4]" />
      <Box label="Closed" value={closed}   gradient="from-[#22C55E] to-[#16A34A]" />
    </div>
  )
}

function TicketsPage({ tickets, setTickets }) {
  const [inputQuery, setInputQuery] = useState('')
  const [query, setQuery] = useState('')    
  const [idQuery, setIdQuery] = useState('')  
  const [dateQuery, setDateQuery] = useState('') 
  const [status, setStatus] = useState('All Statuses')
  const [sort, setSort] = useState('Created')

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  // Debounce search input (300ms)
  useEffect(() => {
    const id = setTimeout(() => setQuery(inputQuery), 300)
    return () => clearTimeout(id)
  }, [inputQuery])

  useEffect(() => { setPage(1) }, [query, idQuery, dateQuery, status, sort, perPage])

  const filtered = useMemo(() => {
    let t = [...tickets]


    if (idQuery.trim()) {
      const q = idQuery.trim().toLowerCase()
      t = t.filter(x => (x.id || '').toLowerCase().includes(q))
    }

    if (dateQuery) {
      t = t.filter(x => {
        const k = formatDateKey(x.created)
        return k === dateQuery
      })
    }

    if (query) {
      const q = query.toLowerCase()
      t = t.filter(x =>
        (x.title || '').toLowerCase().includes(q) ||
        (x.customer?.name || '').toLowerCase().includes(q) ||
        (x.customer?.email || '').toLowerCase().includes(q)
      )
    }

    if (status !== 'All Statuses') t = t.filter(x => x.status === status)

    if (sort === 'Priority') t.sort((a,b) => (PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]))
    else t.sort((a,b) => new Date(b.created) - new Date(a.created))

    return t
  }, [tickets, query, idQuery, dateQuery, status, sort])

  const total = filtered.length
  const startIndex = (page - 1) * perPage
  const currentPageItems = filtered.slice(startIndex, startIndex + perPage)

  function handleCreate({ title, name, email, priority, description }) {
    const id = nextTicketId(tickets)
    const created = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    const newT = {
      id, title, created, status: 'Open', priority,
      description: description || '',
      customer: { name, email },
      comments: []
    }
    const next = [newT, ...tickets]
    setTickets(next)
    saveTickets(next)
  }

  function handleDelete(id) {
    const next = tickets.filter(t => t.id !== id)
    setTickets(next)
    saveTickets(next)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setOpen(true)}
          className="btn"
          style={{
            backgroundColor: '#4CAF50',   // GREEN
            borderColor: '#388E3C',
            color: '#ffffff'
          }}
        >
          + New Ticket
        </button>
      </div>
      <SummaryCards allTickets={tickets} />
      
      <Filters
        query={inputQuery} setQuery={setInputQuery}
        idQuery={idQuery} setIdQuery={setIdQuery}
        dateQuery={dateQuery} setDateQuery={setDateQuery}
        status={status} setStatus={setStatus}
        sort={sort} setSort={setSort}
      />

      <TicketTable tickets={currentPageItems} onDelete={handleDelete} />

      <Pagination
        page={page} setPage={setPage}
        perPage={perPage} setPerPage={setPerPage}
        total={total}
      />

      <NewTicketModal open={open} onClose={() => setOpen(false)} onCreate={handleCreate} />
    </>
  )
}

export default function App() {
  const [tickets, setTickets] = useState(() => loadTickets(defaultTickets))
  useEffect(() => saveTickets(tickets), [tickets])

  return (
  <div className="min-h-screen flex flex-col px-3 sm:px-4 md:px-6 lg:px-8 py-4 gap-4 w-full">
    <Header />
    <Routes>
      <Route path="/" element={<TicketsPage tickets={tickets} setTickets={setTickets} />} />
      <Route path="/ticket/:id" element={<TicketDetail tickets={tickets} setTickets={setTickets} />} />
    </Routes>
  </div>
)
}
