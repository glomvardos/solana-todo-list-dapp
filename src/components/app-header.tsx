'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'
import { CreateTodoListModal } from './todo/create-todo-list-modal'
import { useWallet } from '@solana/wallet-adapter-react'

export function AppHeader() {
  const [showMenu, setShowMenu] = useState(false)
  const { publicKey } = useWallet()
  return (
    <header className="relative z-50 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-400">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-baseline gap-4">
          <p className="text-xl hover:text-neutral-500 dark:hover:text-white">Todo Lists</p>
          {publicKey && <CreateTodoListModal />}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton />
          <ClusterUiSelect />
          <ThemeSelect />
        </div>

        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[52px] bottom-0 bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t dark:border-neutral-800">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 w-full">
                  <WalletButton />
                  <ClusterUiSelect />
                  <ThemeSelect />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
