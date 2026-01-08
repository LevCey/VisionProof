import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6">
        AI Payment Agent
      </h1>
      <p className="text-xl text-gray-400 mb-4">
        Programmable money that enforces creator agreements using MNEE stablecoin
      </p>
      <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
        Brands lock payments in escrow. Creators deliver content. 
        AI verifies delivery. Smart contracts release funds automatically.
      </p>
      
      <div className="flex gap-4 justify-center mb-16">
        <Link
          href="/create"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold"
        >
          Create Agreement
        </Link>
        <Link
          href="/agreements"
          className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-lg font-semibold"
        >
          View Agreements
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-xl">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="font-semibold mb-2">Trustless Escrow</h3>
          <p className="text-sm text-gray-400">MNEE locked until conditions met</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="font-semibold mb-2">AI Verification</h3>
          <p className="text-sm text-gray-400">GPT-4 verifies content delivery</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-semibold mb-2">Auto Release</h3>
          <p className="text-sm text-gray-400">Instant payment on verification</p>
        </div>
      </div>
    </div>
  )
}
