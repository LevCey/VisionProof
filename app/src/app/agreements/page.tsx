'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { keccak256, toBytes } from 'viem'
import CreatorEscrowABI from '@/config/CreatorEscrowABI.json'

const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000'

interface VerificationResult {
  verified: boolean
  hashtag_check: boolean
  mention_check: boolean
  content_relevant: boolean
  confidence: number
  reasoning: string
}

export default function Agreements() {
  const { isConnected } = useAccount()
  const [agreementId, setAgreementId] = useState('')
  const [tweetUrl, setTweetUrl] = useState('')
  const [tweetContent, setTweetContent] = useState('')
  const [hashtags, setHashtags] = useState('#MNEE')
  const [mentions, setMentions] = useState('@MNEE_io')
  const [verification, setVerification] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const { writeContract, data: txHash } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash: txHash })

  const fetchTweet = async () => {
    setLoading(true)
    const res = await fetch('/api/tweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetUrl }),
    })
    const data = await res.json()
    
    if (data.text) {
      setTweetContent(data.text)
    }
    setLoading(false)
  }

  const verifyContent = async () => {
    setLoading(true)
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweetContent,
        rules: {
          hashtags: hashtags.split(',').map(h => h.trim()),
          mentions: mentions.split(',').map(m => m.trim()),
        },
      }),
    })
    const result = await res.json()
    setVerification(result)
    setLoading(false)
  }

  const submitProof = () => {
    const proofHash = keccak256(toBytes(JSON.stringify(verification)))
    writeContract({
      address: ESCROW_ADDRESS,
      abi: CreatorEscrowABI,
      functionName: 'submitProof',
      args: [BigInt(agreementId), proofHash],
    })
  }

  const releaseFunds = () => {
    writeContract({
      address: ESCROW_ADDRESS,
      abi: CreatorEscrowABI,
      functionName: 'releaseFunds',
      args: [BigInt(agreementId)],
    })
  }

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Please connect your wallet</p>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Transaction Successful!</h2>
        <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" className="text-blue-400 hover:underline">
          View on Etherscan
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Verify & Release Payment</h1>

      <div className="bg-gray-900 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Agreement ID</label>
          <input
            type="number"
            value={agreementId}
            onChange={(e) => setAgreementId(e.target.value)}
            placeholder="0"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tweet URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              placeholder="https://twitter.com/user/status/123..."
              className="flex-1 bg-gray-800 rounded-lg px-4 py-3 text-white"
            />
            <button
              onClick={fetchTweet}
              disabled={loading}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Fetch
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tweet Content (paste manually if fetch fails)</label>
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            rows={4}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
            placeholder="Paste tweet content here..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Required Hashtags</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Required Mentions</label>
            <input
              type="text"
              value={mentions}
              onChange={(e) => setMentions(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
            />
          </div>
        </div>

        <button
          onClick={verifyContent}
          disabled={!tweetContent || loading}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-xl font-semibold"
        >
          {loading ? '⏳ Verifying...' : '🤖 Verify with AI'}
        </button>

        {verification && (
          <div className={`p-4 rounded-xl ${verification.verified ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{verification.verified ? '✅' : '❌'}</span>
              <span className="font-semibold">
                {verification.verified ? 'Verification Passed' : 'Verification Failed'}
              </span>
              <span className="text-sm text-gray-400 ml-auto">
                Confidence: {(verification.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div className={verification.hashtag_check ? 'text-green-400' : 'text-red-400'}>
                {verification.hashtag_check ? '✓' : '✗'} Hashtags
              </div>
              <div className={verification.mention_check ? 'text-green-400' : 'text-red-400'}>
                {verification.mention_check ? '✓' : '✗'} Mentions
              </div>
              <div className={verification.content_relevant ? 'text-green-400' : 'text-red-400'}>
                {verification.content_relevant ? '✓' : '✗'} Relevant
              </div>
            </div>
            <p className="text-sm text-gray-300">{verification.reasoning}</p>
          </div>
        )}

        {verification?.verified && (
          <div className="flex gap-4">
            <button
              onClick={submitProof}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
            >
              Submit Proof On-Chain
            </button>
            <button
              onClick={releaseFunds}
              className="flex-1 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
            >
              Release Funds
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
