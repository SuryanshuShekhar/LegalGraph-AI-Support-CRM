import React, { useState } from 'react'

export default function NewTicketModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [description, setDescription] = useState('')

  if (!open) return null

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v)
  }

  function submit() {
    if (!title.trim()) { alert('Title is required'); return }
    if (!name.trim()) { alert('Customer name is required'); return }
    if (!email.trim()) { alert('Email is required'); return }
    if (!validateEmail(email.trim())) { alert('Please enter a valid email address'); return }
    onCreate({
      title: title.trim(),
      name: name.trim(),
      email: email.trim(),
      priority,
      description: description.trim(),
    })
    setTitle(''); setName(''); setEmail(''); setPriority('Medium'); setDescription('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xl p-4">
      <div className="card w-full max-w-xl bg-[rgb(var(--panel))] bg-opacity-100">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold">New Ticket</h3>
          <button onClick={onClose} className="btn">✕</button>
        </div>

        <div className="p-5 space-y-3">
          <label className="block">
            <span className="subtle">Title *</span>
            <input
              required
              className="mt-1 w-full rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
              placeholder="Short summary"
              value={title}
              onChange={e=>setTitle(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block">
              <span className="subtle">Customer name *</span>
              <input
                required
                className="mt-1 w-full rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                placeholder="e.g., Aarav Sharma"
                value={name}
                onChange={e=>setName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="subtle">Email *</span>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
                placeholder="name@example.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </label>
          </div>

          <label className="block">
            <span className="subtle">Priority *</span>
            <select
              required
              className="mt-1 w-full rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
              value={priority}
              onChange={e=>setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>

          <label className="block">
            <span className="subtle">Description *</span>
            <textarea
              required
              className="mt-1 w-full min-h-[100px] rounded-xl bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
              placeholder="Add a brief description..."
              value={description}
              onChange={e=>setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="px-5 py-4 border-t border-slate-200 dark:border-neutral-800 flex justify-end gap-2">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={submit} className="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  )
}
