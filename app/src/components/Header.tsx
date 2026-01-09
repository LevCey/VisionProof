'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ConnectWallet } from './ConnectWallet'

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="text-lg font-bold text-white hidden sm:block">AI Payment Agent</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link href="/create" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-medium">
            Create
          </Link>
          <Link href="/agreements" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm font-medium">
            Verify
          </Link>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  )
}
