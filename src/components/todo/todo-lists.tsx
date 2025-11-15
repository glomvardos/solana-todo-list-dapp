import { useStateAccounts } from '@/services/use-state-accounts'
import { TodoList } from './todo-list'
import { CreateTodoListModal } from './create-todo-list-modal'

export function TodoLists() {
  const { data: stateAccounts } = useStateAccounts()
  console.log(stateAccounts)
  const stateAccountsEmpty = stateAccounts?.length === 0
  return !stateAccountsEmpty ? (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      {stateAccounts?.map((sa) => (
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
