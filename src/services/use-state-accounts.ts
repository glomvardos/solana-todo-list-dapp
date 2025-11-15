import { useCluster } from '@/components/cluster/cluster-data-access'
import { useAnchorProvider } from '@/components/solana/solana-provider'
import { getTodoProgram, getTodoProgramId } from '@project/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { Cluster } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useStateAccounts() {
  const { publicKey } = useWallet()
  const { cluster } = useCluster()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getTodoProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getTodoProgram(provider, programId), [provider, programId])

  return useQuery({
    queryKey: ['state-accounts', { cluster, publicKey }],
    queryFn: async () => {
      return await program.account.todoList.all([
        {
          memcmp: {
            offset: 8,
            bytes: publicKey!.toBase58(),
          },
        },
      ])
    },
    enabled: !!program && !!publicKey,
  })
}
