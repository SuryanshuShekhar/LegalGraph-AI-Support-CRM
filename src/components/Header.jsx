import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/legalgraph-logo.jpg'

export default function Header() {
  return (
    <header className="py-4 mb-4">
      <div
        className="
          rounded-2xl px-4 py-3
          bg-gradient-to-br from-[#1f2937] via-[#161b25] to-[#0b1220]
          border border-slate-700/60
          shadow-soft flex items-center justify-between
        "
      >
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Legalgraph AI" className="w-10 h-10 rounded-xl" />
          <div>
            <h1 className="text-xl font-semibold text-white">LegalGraph AI Support</h1>
            <p className="text-sm text-white/80">Customer Relation Support</p>
          </div>
        </Link>

        <a
          href="https://wa.me/7004370495"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white"
          style={{ backgroundColor: '#257cd3ff' }}
          title="Contact us on WhatsApp"
        >
          Contact Us
        </a>
      </div>
    </header>
  )
}
