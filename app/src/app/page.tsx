import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="mb-4">
            <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full border border-blue-500/20">
              Powered by MNEE Stablecoin
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
            AI Payment Agent
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Programmable money that enforces creator agreements
          </p>
          <p className="text-gray-500 mb-8">
            Brands lock payments in escrow. Creators deliver content. 
            AI verifies delivery. Smart contracts release funds automatically.
          </p>
          
          <div className="flex gap-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-lg font-semibold text-white transition-all shadow-lg shadow-blue-600/25"
            >
              Create Agreement
            </Link>
            <Link
              href="/agreements"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-lg font-semibold text-white border border-gray-700 transition-all"
            >
              View Agreements
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
          <Image
            src="/hero.png"
            alt="AI Payment Agent"
            width={600}
            height={400}
            className="relative rounded-2xl border border-gray-800 shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Factoring Banner - Coming Soon */}
      <div className="mb-16 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-800/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">Instant Cash</h3>
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Coming Soon</span>
              </div>
              <p className="text-sm text-gray-400">Get 95% of pending payments instantly. No more waiting 30-90 days.</p>
            </div>
          </div>
          <button disabled className="px-6 py-3 bg-green-600/50 rounded-xl text-white font-medium cursor-not-allowed opacity-60">
            Get Paid Now
          </button>
        </div>
      </div>

      {/* Multi-platform Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Twitter - Active */}
          <div className="p-6 bg-gray-800 rounded-2xl border-2 border-blue-500 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-1">Twitter/X</h3>
            <span className="text-xs text-green-400">✓ Active</span>
          </div>

          {/* Instagram - Coming Soon */}
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 text-center opacity-60">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-400 mb-1">Instagram</h3>
            <span className="text-xs text-yellow-400">Coming Soon</span>
          </div>

          {/* TikTok - Coming Soon */}
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 text-center opacity-60">
            <div className="w-12 h-12 bg-gray-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-400 mb-1">TikTok</h3>
            <span className="text-xs text-yellow-400">Coming Soon</span>
          </div>

          {/* YouTube - Coming Soon */}
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 text-center opacity-60">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-400 mb-1">YouTube</h3>
            <span className="text-xs text-yellow-400">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-2">Trustless Escrow</h3>
          <p className="text-sm text-gray-400">MNEE locked in smart contract until conditions are met</p>
        </div>
        
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-2">AI Verification</h3>
          <p className="text-sm text-gray-400">Automated content verification with proof generation</p>
        </div>
        
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-2">Instant Release</h3>
          <p className="text-sm text-gray-400">Automatic payment release upon successful verification</p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-12 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          Built for the MNEE Hackathon 2026 • Programmable Money for the Creator Economy
        </p>
      </div>
    </div>
  )
}
