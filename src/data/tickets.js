export const defaultTickets = [
  { id: "TKT-001", title: "AI model gave incorrect clause summary", customer: { name: "John Doe", email: "john@example.com" }, status: "Open", priority: "High", created: "Oct 28, 2025",
    description: "The NDA summary generated seems incomplete.",
    comments: [{ author: "Support Team", text: "We are investigating this issue.", createdAt: "October 28, 2025 at 11:45 AM" }]
  },
  { id: "TKT-002", title: "Payment processing issue", customer: { name: "Michael Chen", email: "m.chen@email.com" }, status: "In Progress", priority: "High", created: "Oct 27, 2025",
    description: "Card is declined even though the bank confirms it's active.",
    comments: [{ author: "Support Team", text: "Escalated to payments provider. ETA 24 hrs.", createdAt: "October 27, 2025 at 05:20 PM" }]
  },
  { id: "TKT-003", title: "Feature request: Dark mode", customer: { name: "Emily Rodriguez", email: "emilyr@email.com" }, status: "Open", priority: "Low", created: "Oct 26, 2025",
    description: "Please add dark mode toggle on desktop.", comments: []
  },
  { id: "TKT-004", title: "Data export not working", customer: { name: "James Wilson", email: "j.wilson@email.com" }, status: "Resolved", priority: "Medium", created: "Oct 25, 2025",
    description: "When I try to export to CSV, the file is corrupted and won't open in Excel.",
    comments: [
      { author: "Support Team", text: "This was a known bug in version 2.1.3. We have released a patch update.", createdAt: "October 25, 2025 at 04:00 PM" },
      { author: "James Wilson", text: "Thank you! The export is working perfectly now.", createdAt: "October 25, 2025 at 05:30 PM" },
    ]
  },
  { id: "TKT-005", title: "Mobile app crashes on startup", customer: { name: "Lana Anderson", email: "lisa.anderson@email.com" }, status: "In Progress", priority: "High", created: "Oct 29, 2025",
    description: "The Android app crashes immediately after opening on Pixel 7.",
    comments: [{ author: "Support Team", text: "We reproduced on Pixel 7 (Android 14). A hotfix is in QA.", createdAt: "October 29, 2025 at 02:10 PM" }]
  },
  { id: "TKT-006", title: "Question about pricing plans", customer: { name: "David Warner", email: "david.warner@email.com" }, status: "Open", priority: "Low", created: "Oct 30, 2025",
    description: "I would like to understand the differences between Basic, Pro and Enterprise plans and whether annual billing has a discount.",
    comments: [{ author: "Support Team", text: "Happy to help. I've shared the plan comparison and 10% annual discount details.", createdAt: "October 30, 2025 at 10:05 AM" }]
  },
  { id: "TKT-007", title: "Email notifications not received", customer: { name: "Rachel Green", email: "rachel.green@email.com" }, status: "Open", priority: "Medium", created: "Oct 29, 2025",
    description: "I have email notifications enabled but I'm not receiving any notification emails. Checked spam as well.",
    comments: []
  },
  { id: "TKT-008", title: "Account deletion request", customer: { name: "Thomas Miller", email: "thomas@email.com" }, status: "Resolved", priority: "Medium", created: "Oct 24, 2025",
    description: "Please delete my account and associated billing data.",
    comments: [{ author: "Support Team", text: "Deletion complete. A final email has been sent.", createdAt: "October 24, 2025 at 09:10 AM" }]
  },

  /* Indian customers */
  { id: "TKT-009", title: "Invoice not reflecting GST", customer: { name: "Aarav Sharma", email: "aarav.sharma@example.in" }, status: "Open", priority: "Medium", created: "Oct 30, 2025",
    description: "Invoice total doesn't include GST for Maharashtra.",
    comments: [{ author: "Support Team", text: "Please share your GSTIN and place-of-supply.", createdAt: "October 30, 2025 at 08:40 AM" }]
  },
  { id: "TKT-010", title: "High server error on portal", customer: { name: "Isha Verma", email: "isha.verma@example.in" }, status: "Open", priority: "High", created: "Oct 30, 2025",
    description: "HTTP 500 on dashboard after login.", comments: []
  },
  { id: "TKT-011", title: "Query on contract termination clause", customer: { name: "Rohit Iyer", email: "rohit.iyer@example.in" }, status: "Open", priority: "Low", created: "Oct 29, 2025",
    description: "Need clarity on notice period under the SLA.",
    comments: [{ author: "User", text: "We need this finalized before month-end.", createdAt: "October 29, 2025 at 06:05 PM" }]
  },
  { id: "TKT-012", title: "Difficulty uploading ROC forms", customer: { name: "Kunal Mehta", email: "kunal.mehta@example.in" }, status: "Open", priority: "Medium", created: "Oct 28, 2025",
    description: "Upload fails at 95% for INC-33.", comments: []
  },
  { id: "TKT-013", title: "PAN verification failing", customer: { name: "Neha Kulkarni", email: "neha.kulkarni@example.in" }, status: "Closed", priority: "Low", created: "Oct 28, 2025",
    description: "API returns 422 on PAN validation.",
    comments: [{ author: "Support Team", text: "Resolved. PAN API was rate-limited.", createdAt: "October 28, 2025 at 03:30 PM" }]
  },
  { id: "TKT-014", title: "How to apply for Statutory Bail", customer: { name: "Pratik Singh", email: "pratik.singh@example.in" }, status: "Open", priority: "Medium", created: "Oct 27, 2025",
    description: "Need guidance for statutory bail procedure.", comments: []
  },
  { id: "TKT-015", title: "Bug: OTP not received", customer: { name: "Saanvi Rao", email: "saanvi.rao@example.in" }, status: "Open", priority: "High", created: "Oct 27, 2025",
    description: "OTP SMS not delivered for +91 numbers.",
    comments: [{ author: "Support Team", text: "Carrier outage identified; retry in 30 minutes.", createdAt: "October 27, 2025 at 07:05 PM" }]
  },
  { id: "TKT-016", title: "Request for GSTIN amendment", customer: { name: "Aditi Nair", email: "aditi.nair@example.in" }, status: "In Progress", priority: "Medium", created: "Oct 26, 2025",
    description: "Change principal place of business in GST.", comments: []
  },
  { id: "TKT-017", title: "Need NCD term sheet format", customer: { name: "Vikram Gupta", email: "vikram.gupta@example.in" }, status: "Open", priority: "Low", created: "Oct 26, 2025",
    description: "Please share a sample NCD term sheet.", comments: []
  },
  { id: "TKT-018", title: "Unable to download TDS certificate", customer: { name: "Riya Banerjee", email: "riya.banerjee@example.in" }, status: "Closed", priority: "Medium", created: "Oct 25, 2025",
    description: "Download link expired immediately after request.",
    comments: [{ author: "Support Team", text: "New link sent via email.", createdAt: "October 25, 2025 at 12:00 PM" }]
  },
  { id: "TKT-019", title: "Clarification on Section 138 NI Act", customer: { name: "Arjun Desai", email: "arjun.desai@example.in" }, status: "Open", priority: "High", created: "Oct 24, 2025",
    description: "Need legal strategy for cheque dishonour case.",
    comments: [{ author: "User", text: "Hearing next week; urgent.", createdAt: "October 24, 2025 at 05:45 PM" }]
  },
  { id: "TKT-020", title: "Feature request: export to CSV", customer: { name: "Meera Joshi", email: "meera.joshi@example.in" }, status: "Open", priority: "Low", created: "Oct 23, 2025",
    description: "Export ticket list to CSV.", comments: []
  }
]
