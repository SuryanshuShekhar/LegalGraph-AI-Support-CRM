import React from 'react'

export default function Pagination({ page, setPage, perPage, total }) {
  const pages = Math.max(1, Math.ceil(total / perPage))
  const start = total === 0 ? 0 : (page - 1) * perPage + 1
  const end = Math.min(total, page * perPage)

  function go(delta) {
    setPage(p => Math.min(pages, Math.max(1, p + delta)))
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4">
      <div className="subtle">
        Showing <strong>{start}</strong> to <strong>{end}</strong> of <strong>{total}</strong> tickets
      </div>
      <div className="flex items-center gap-2">
        <button className="btn" onClick={() => go(-1)} disabled={page <= 1}>Prev</button>
        <div className="px-3 py-2 rounded-xl border" style={{borderColor: 'rgb(var(--ring))'}}>
          Page {page} / {pages}
        </div>
        <button className="btn" onClick={() => go(1)} disabled={page >= pages}>Next</button>
      </div>
    </div>
  )
}
