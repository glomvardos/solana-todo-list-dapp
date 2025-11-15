import { AnchorError } from '@coral-xyz/anchor'
import { SendTransactionError } from '@solana/web3.js'
import { toast } from 'sonner'

export function parseError(error: Error) {
  if (error instanceof SendTransactionError) {
    const logs = error.logs
    if (logs?.some((log: string) => log.includes('already in use'))) {
      toast.error('Account already exists')
      return
    }
    toast.error('Failed to run program')
  } else if (error instanceof AnchorError) {
    console.error('Anchor Error:', error.error.errorMessage)
    toast.error(error.error.errorMessage)
  } else {
    console.error('Unknown error:', error)
    toast.error('Failed to run program')
  }
}
