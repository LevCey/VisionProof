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
