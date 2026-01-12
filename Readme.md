# VisionProof - AI Payment Agent for Creator Economy

> AI-powered proof-to-pay for trustless creator payments using MNEE stablecoin.

[![Demo Video](https://img.shields.io/badge/Demo-YouTube-red)](https://youtu.be/07b1jN3-qt0)
[![Live Demo](https://img.shields.io/badge/Live-visionproof.xyz-blue)](https://visionproof.xyz)
[![Contract](https://img.shields.io/badge/Contract-Etherscan-green)](https://etherscan.io/address/0x056e4680a3d13a454e8cc1ea06b9c7df9e2c5f5a)

## Problem

Creator–brand payments frequently fail due to disputes:
- Brands claim deliverables were not met
- Creators claim content was delivered
- Payments are delayed, canceled, or resolved manually

## Solution

An autonomous AI agent that verifies creator deliverables and triggers MNEE payments automatically.

1. **Brand** locks MNEE in escrow + defines campaign rules
2. **Creator** delivers content (tweets)
3. **AI Agent** verifies delivery against rules using Gemini
4. **Smart Contract** releases funds automatically

✅ No trust required  
✅ No manual approvals  
✅ No intermediaries

## Why MNEE

MNEE is not just a payment rail — it's **programmable money**:
- USD-backed stability
- On-chain settlement
- Condition-based release
- Global, permissionless payments

**This project would not work with traditional payment systems.**

## Demo

🎬 **[Watch Demo Video](https://youtu.be/07b1jN3-qt0)** | 🌐 **[Live Demo](https://visionproof.xyz)**

![VisionProof Screenshot](./docs/screenshot.png)

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Next.js   │────▶│  AI Agent   │────▶│   Gemini    │
│   Frontend  │     │   (API)     │     │   2.5 Flash │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  Twitter    │     │  Ethereum   │
│  API/Input  │     │  Contract   │
└─────────────┘     └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │    MNEE     │
                   │  Stablecoin │
                   └─────────────┘
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Wallet:** wagmi, viem
- **AI:** Google Gemini 2.5 Flash Lite
- **Blockchain:** Ethereum Mainnet
- **Stablecoin:** MNEE (0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF)
- **Contract:** 0x056e4680a3d13a454e8cc1ea06b9c7df9e2c5f5a

## Quickstart

```bash
# Install dependencies
cd app && pnpm install

# Set environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY

# Run development server
pnpm dev
```

## Smart Contract

```bash
cd contracts
pnpm install
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

## How It Works

1. **Create Agreement:** Brand connects wallet, enters creator address, MNEE amount, and campaign rules (hashtags, mentions)
2. **Lock Funds:** Brand approves MNEE and creates agreement - funds locked in escrow
3. **Deliver Content:** Creator posts tweet with required hashtags/mentions
4. **AI Verification:** System fetches tweet, Gemini verifies against rules
5. **Auto Release:** If verified, proof submitted on-chain, funds released to creator

## Roadmap

### ✅ Completed (v1.0)
- Trustless escrow with MNEE stablecoin
- AI verification via Google Gemini
- Twitter/X platform support
- Creator reputation tracking on-chain

### 🚧 In Progress (v1.1)
- Multi-platform support (Instagram, TikTok, YouTube)
- Instant Cash (Factoring) - 95% advance on pending payments

### 📋 Planned (v2.0)
- **Twitter API integration** - Auto-fetch tweets, verify account ownership
- **Account verification** - Link X account to wallet address
- Decentralized oracle network for verification
- Dispute arbitration with staking
- SDK for brand integrations
- Mobile app
- Multi-chain deployment (Base, Polygon)

## Current Limitations (MVP)

This is a hackathon MVP demonstrating the core concept:

- **Manual tweet input:** Demo uses copy-paste. Production will use Twitter API ($200/mo) for automatic tweet fetching and verification.
- **No account verification:** Production will verify that the tweet author matches the creator's linked X account.
- **Single platform:** Currently Twitter/X only. Multi-platform support planned.

## Team

Built by Levent for MNEE Hackathon 2026

## Links

- 🌐 **Live Demo:** https://visionproof.xyz
- 🎬 **Video:** https://youtu.be/07b1jN3-qt0
- 📝 **Contract:** https://etherscan.io/address/0x056e4680a3d13a454e8cc1ea06b9c7df9e2c5f5a
- 🐦 **Twitter:** https://x.com/MNEE_cash

## License

MIT
