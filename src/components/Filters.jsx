import React from 'react'

export default function Filters({
  query, setQuery,
  idQuery, setIdQuery,
  dateQuery, setDateQuery,
  status, setStatus,
  sort, setSort
}) {
  return (
    <div className="panel mb-4">
      <h2 className="subtle mb-3">Filters</h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <input
          type="text"
          className="w-full rounded-xl border text-white placeholder-white caret-white"
          placeholder="Search by customer or title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            backgroundColor: '#2196F3',
            borderColor: '#2196F3'
          }}
        />
        <input
          type="text"
          className="w-full rounded-xl border text-white placeholder-white caret-white"
          placeholder="Search by Ticket ID (e.g., TKT-010)"
          value={idQuery}
          onChange={(e) => setIdQuery(e.target.value)}
          style={{
            backgroundColor: '#2196F3',
            borderColor: '#2196F3'
          }}
        />
        <input
          type="date"
          className="w-full rounded-xl border"
          value={dateQuery}
          onChange={(e) => setDateQuery(e.target.value)}
          style={{
            backgroundColor: '#2196F3',
            borderColor: '#2196F3',
            color: '#ffffff'
          }}
        />
        <select
          className="w-full rounded-xl border text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            backgroundColor: '#040300ff',
            borderColor: '#ffffff',
            color: '#ffffff'
          }}
        >
          <option>All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <button
          onClick={() => setSort(s => (s === 'Priority' ? 'Created' : 'Priority'))}
          className="btn text-sm w-full"
        >
          Sort by {sort}
        </button>
      </div>
    </div>
  )
}
