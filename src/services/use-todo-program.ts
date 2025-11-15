'use client'

import { useCluster } from '@/components/cluster/cluster-data-access'
import { useAnchorProvider } from '@/components/solana/solana-provider'
import { useTransactionToast } from '@/components/use-transaction-toast'
import { parseError } from '@/lib/parse-error'
import { ListItem } from '@/lib/types'
import { getTodoProgram, getTodoProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Cluster, SendTransactionError } from '@solana/web3.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useTodoProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const { publicKey } = useWallet()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getTodoProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getTodoProgram(provider, programId), [provider, programId])
  const queryClient = useQueryClient()
  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const invalidateAccounts = () => {
    queryClient.invalidateQueries({
      queryKey: ['state-accounts', { cluster, publicKey }],
      exact: true,
    })
  }

  const createTodoList = useMutation({
    mutationKey: ['todo', 'create', { cluster }],
    mutationFn: ({ name }: { name: string }) => program.methods.createTodoList(name).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      invalidateAccounts()
    },
    onError: parseError,
  })

  const addTodoListItems = useMutation({
    mutationKey: ['todo', 'addListItems', { cluster }],
    mutationFn: ({ name, listItems }: { name: string; listItems: ListItem[] }) =>
      program.methods.addListItems(name, listItems).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      invalidateAccounts()
    },
    onError: parseError,
  })

  const deleteTodoList = useMutation({
    mutationKey: ['todo', 'delete', { cluster }],
    mutationFn: ({ name }: { name: string }) => program.methods.deleteTodoList(name).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      invalidateAccounts()
    },
    onError: parseError,
  })

  return {
    program,
    programId,
    getProgramAccount,
    createTodoList,
    addTodoListItems,
    deleteTodoList,
  }
}
