'use client'
import { createContext, useContext } from 'react'

function show(type: 'success' | 'error', msg: string) {
  // Minimal toast for demo – replace with a library if desired
  const el = document.createElement('div')
  el.textContent = msg
  el.className = `fixed top-4 right-4 px-3 py-2 rounded text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 3000)
}

export const toast = {
  success: (m: string) => show('success', m),
  error: (m: string) => show('error', m),
}

export function Toaster() {
  return null
}
