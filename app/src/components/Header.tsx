'use client'

import Link from 'next/link'
import { ConnectWallet } from './ConnectWallet'

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          🤖 AI Payment Agent
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/create" className="text-gray-300 hover:text-white">
            Create Agreement
          </Link>
          <Link href="/agreements" className="text-gray-300 hover:text-white">
            My Agreements
          </Link>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  )
}
