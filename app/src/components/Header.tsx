'use client'

import Link from 'next/link'
import { ConnectWallet } from './ConnectWallet'

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">AI Payment Agent</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/create" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Create Agreement
          </Link>
          <Link href="/agreements" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Verify & Release
          </Link>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  )
}
