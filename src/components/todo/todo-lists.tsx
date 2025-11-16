import { useStateAccounts } from '@/services/use-state-accounts'
import { TodoList } from './todo-list'
import { CreateTodoListModal } from './create-todo-list-modal'
import { useMemo } from 'react'

export function TodoLists() {
  const { data: stateAccounts } = useStateAccounts()

  const stateAccountsEmpty = stateAccounts?.length === 0
  const sortedStateAccounts = useMemo(
    () => stateAccounts?.toSorted((a, b) => b.account.createdAt.toNumber() - a.account.createdAt.toNumber()),
    [stateAccounts],
  )

  return !stateAccountsEmpty ? (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      {sortedStateAccounts?.map((sa) => (
        <TodoList
          key={sa.account.name}
          todoList={{
            name: sa.account.name,
            createdAt: sa.account.createdAt,
            completed: sa.account.completed,
            listItems: sa.account.listItems,
          }}
        />
      ))}
    </div>
  ) : (
    <div className="grow flex flex-col gap-4 items-center justify-center">
      <p className="text-accent-foreground text-center text-balance">
        You don't have any todo lists. Create one to begin.
      </p>
      <CreateTodoListModal />
    </div>
  )
}
