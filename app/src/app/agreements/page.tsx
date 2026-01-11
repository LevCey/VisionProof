'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { keccak256, toBytes, formatUnits } from 'viem'
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
  const { address, isConnected } = useAccount()
  const [agreementId, setAgreementId] = useState('')
  const [tweetUrl, setTweetUrl] = useState('')
  const [tweetContent, setTweetContent] = useState('')
  const [hashtags, setHashtags] = useState('#MNEE')
  const [mentions, setMentions] = useState('@MNEE_cash')
  const [verification, setVerification] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [proofSubmitted, setProofSubmitted] = useState(false)

  const { writeContract: submitProofTx, data: proofTxHash } = useWriteContract()
  const { writeContract: releaseFundsTx, data: releaseTxHash } = useWriteContract()
  
  const { isSuccess: proofSuccess } = useWaitForTransactionReceipt({ hash: proofTxHash })
  const { isSuccess: releaseSuccess } = useWaitForTransactionReceipt({ hash: releaseTxHash })

  // Track proof submission
  if (proofSuccess && !proofSubmitted) {
    setProofSubmitted(true)
  }

  // Fetch creator reputation
  const { data: reputation } = useReadContract({
    address: ESCROW_ADDRESS,
    abi: CreatorEscrowABI,
    functionName: 'getCreatorReputation',
    args: address ? [address] : undefined,
  }) as { data: [bigint, bigint] | undefined }

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
    submitProofTx({
      address: ESCROW_ADDRESS,
      abi: CreatorEscrowABI,
      functionName: 'submitProof',
      args: [BigInt(agreementId), proofHash],
    })
  }

  const releaseFunds = () => {
    releaseFundsTx({
      address: ESCROW_ADDRESS,
      abi: CreatorEscrowABI,
      functionName: 'releaseFunds',
      args: [BigInt(agreementId)],
    })
  }

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-300">Please connect your wallet</p>
      </div>
    )
  }

  if (releaseSuccess) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2 text-white">Payment Released!</h2>
        <p className="text-gray-300 mb-4">MNEE has been sent to the creator</p>
        <a href={`https://etherscan.io/tx/${releaseTxHash}`} target="_blank" className="text-blue-400 hover:underline">
          View on Etherscan
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Verify & Release Payment</h1>

      {/* Creator Reputation Badge */}
      {reputation && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Your Creator Reputation</p>
              <div className="flex items-center gap-4">
                <span className="text-white font-semibold">{reputation[0].toString()} deals completed</span>
                <span className="text-green-400 font-semibold">{parseFloat(formatUnits(reputation[1], 18)).toFixed(2)} MNEE earned</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900/80 rounded-xl p-6 space-y-6 border border-gray-800">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Agreement ID</label>
          <input
            type="number"
            value={agreementId}
            onChange={(e) => setAgreementId(e.target.value)}
            placeholder="0"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Tweet URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              placeholder="https://twitter.com/user/status/123..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
            />
            <button
              onClick={fetchTweet}
              disabled={loading}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium"
            >
              Fetch
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Tweet Content (paste manually if fetch fails)</label>
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
            placeholder="Paste tweet content here..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Required Hashtags</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Required Mentions</label>
            <input
              type="text"
              value={mentions}
              onChange={(e) => setMentions(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
          </div>
        </div>

        <button
          onClick={verifyContent}
          disabled={!tweetContent || loading}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:text-gray-300 rounded-xl font-semibold text-white transition-colors"
        >
          {loading ? 'Verifying...' : 'Verify with AI'}
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

        {verification?.verified && !proofSubmitted && (
          <>
            <div className="p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
              <p className="text-yellow-300 text-sm">
                ⚠️ <strong>Step 1:</strong> Submit proof to record verification on-chain.
              </p>
            </div>
            <button
              onClick={submitProof}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white"
            >
              Submit Proof On-Chain
            </button>
          </>
        )}

        {verification?.verified && proofSubmitted && (
          <>
            <div className="p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
              <p className="text-green-300 text-sm">
                ✅ <strong>Proof submitted!</strong> Now release the funds to complete payment.
              </p>
            </div>
            <button
              onClick={releaseFunds}
              className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-semibold text-white"
            >
              Release Funds
            </button>
          </>
        )}
      </div>
    </div>
  )
}
