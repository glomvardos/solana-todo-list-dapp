import { useStateAccounts } from '@/services/use-state-accounts'

export function TodoLists() {
  const { data: stateAccounts } = useStateAccounts()
  console.log(stateAccounts)
  return <div>Test</div>
}
