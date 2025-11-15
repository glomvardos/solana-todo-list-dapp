'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { TodoLists } from './todo-lists'

export default function TodoListsLoader() {
  const { publicKey } = useWallet()

  return publicKey ? (
    <TodoLists />
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-16">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  )
}
