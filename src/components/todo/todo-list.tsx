import { type TodoList } from '@/lib/types'
import { Card } from '../ui/card'
import { ListPlus } from 'lucide-react'
import { Button } from '../ui/button'
import { DeleteTodoListModal } from './delete-todo-list-modal'
import { Activity, ReactElement, useEffect, useState } from 'react'
import { TodoListItems } from './todo-list-items'
import { TodoListNewItemsToAdd } from './todo-list-new-items-to-add'
import ReactDOM from 'react-dom'

type Props = {
  todoList: TodoList
}

export function TodoList({ todoList }: Props) {
  const [showAddNewItems, setShowAddNewItems] = useState<boolean>(false)

  const showAddNewItemsHandler = () => setShowAddNewItems((prev) => !prev)

  return (
    <Card className="p-5 w-full">
      <div className="space-y-2">
        <TodoListActions
          name={todoList.name}
          showAddNewItemsHandler={showAddNewItemsHandler}
          showAddNewItems={showAddNewItems}
        />
        <h2 className="line-clamp-1 font-medium text-lg">{todoList.name}</h2>
      </div>
      <div className="flex flex-col gap-4">
        <TodoListItems name={todoList.name} listItems={todoList.listItems} />
        <Activity mode={showAddNewItems ? 'visible' : 'hidden'}>
          <TodoListNewItemsToAdd
            name={todoList.name}
            existingListItemsCount={todoList.listItems.length}
            showAddNewItemsHandler={showAddNewItemsHandler}
          />
        </Activity>
      </div>
    </Card>
  )
}

function TodoListActions({
  name,
  showAddNewItems,
  showAddNewItemsHandler,
}: {
  name: string
  showAddNewItems: boolean
  showAddNewItemsHandler: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Button variant={showAddNewItems ? 'default' : 'outline'} onClick={showAddNewItemsHandler}>
        <ListPlus />
      </Button>
      <div id={`save-action-${name}`} />
      <div id={`edit-action-${name}`} />
      <DeleteTodoListModal name={name} />
    </div>
  )
}

export function ListActionButton({
  isActive,
  id,
  disabled,
  icon,
  onClick,
}: {
  isActive: boolean
  id: string
  disabled: boolean
  icon: ReactElement
  onClick: () => void
}) {
  const [isDomReady, setIsDomReady] = useState<boolean>(false)

  useEffect(() => {
    setIsDomReady(true)
  }, [])

  return isDomReady
    ? ReactDOM.createPortal(
        <Button variant={isActive ? 'default' : 'outline'} disabled={disabled} onClick={onClick}>
          {icon}
        </Button>,
        document.getElementById(id) as HTMLElement,
      )
    : null
}
