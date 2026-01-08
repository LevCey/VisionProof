'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, keccak256, toBytes } from 'viem'
import { MNEE_ADDRESS, ERC20_ABI } from '@/config/wagmi'
import CreatorEscrowABI from '@/config/CreatorEscrowABI.json'

// TODO: Replace with deployed contract address
const ESCROW_ADDRESS = process.env.NEXT_PUBLIC_ESCROW_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000'

export default function CreateAgreement() {
  const { address, isConnected } = useAccount()
  const [creator, setCreator] = useState('')
  const [amount, setAmount] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [mentions, setMentions] = useState('')
  const [step, setStep] = useState<'form' | 'approve' | 'create' | 'done'>('form')

  const { writeContract: approve, data: approveHash } = useWriteContract()
  const { writeContract: create, data: createHash } = useWriteContract()
  
  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash })
  const { isSuccess: createSuccess } = useWaitForTransactionReceipt({ hash: createHash })

  const rulesHash = keccak256(toBytes(JSON.stringify({ hashtags: hashtags.split(','), mentions: mentions.split(',') })))

  const handleApprove = () => {
    const amountWei = parseUnits(amount, 6) // MNEE has 6 decimals
    approve({
      address: MNEE_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [ESCROW_ADDRESS, amountWei],
    })
    setStep('approve')
  }

  const handleCreate = () => {
    const amountWei = parseUnits(amount, 6)
    create({
      address: ESCROW_ADDRESS,
      abi: CreatorEscrowABI,
      functionName: 'createAgreement',
      args: [creator as `0x${string}`, amountWei, rulesHash],
    })
    setStep('create')
  }

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Please connect your wallet to create an agreement</p>
      </div>
    )
  }

  if (createSuccess) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Agreement Created!</h2>
        <p className="text-gray-400 mb-4">MNEE has been locked in escrow</p>
        <a href={`https://etherscan.io/tx/${createHash}`} target="_blank" className="text-blue-400 hover:underline">
          View on Etherscan
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Agreement</h1>
      
      <div className="bg-gray-900 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Creator Wallet Address</label>
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            placeholder="0x..."
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">MNEE Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Required Hashtags (comma separated)</label>
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="#MNEE, #crypto"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Required Mentions (comma separated)</label>
          <input
            type="text"
            value={mentions}
            onChange={(e) => setMentions(e.target.value)}
            placeholder="@MNEE_io"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        {step === 'form' && (
          <button
            onClick={handleApprove}
            disabled={!creator || !amount}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-xl font-semibold"
          >
            Step 1: Approve MNEE
          </button>
        )}

        {step === 'approve' && !approveSuccess && (
          <div className="text-center py-4 text-yellow-400">
            ⏳ Waiting for approval...
          </div>
        )}

        {(step === 'approve' && approveSuccess) && (
          <button
            onClick={handleCreate}
            className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
          >
            Step 2: Create Agreement
          </button>
        )}

        {step === 'create' && !createSuccess && (
          <div className="text-center py-4 text-yellow-400">
            ⏳ Creating agreement...
          </div>
        )}
      </div>
    </div>
  )
}
