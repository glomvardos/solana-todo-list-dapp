import { type TodoList } from '@/lib/types'
import { Card } from '../ui/card'
import { ListPlus } from 'lucide-react'
import { Button } from '../ui/button'
import { DeleteTodoListModal } from './delete-todo-list-modal'
import { Activity, useState } from 'react'
import { TodoListItems } from './todo-list-items'
import { TodoListNewItemsToAdd } from './todo-list-new-items-to-add'

type Props = {
  todoList: TodoList
}

export function TodoList({ todoList }: Props) {
  const [showAddNewItems, setShowAddNewItems] = useState<boolean>(false)

  const showAddNewItemsHandler = () => setShowAddNewItems((prev) => !prev)

  return (
    <Card className="p-5 w-full">
      <div className="flex items-center justify-between gap-3">
        <h2 className="line-clamp-1 font-medium text-lg">{todoList.name}</h2>
        <TodoListActions name={todoList.name} showAddNewItemsHandler={showAddNewItemsHandler} />
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

function TodoListActions({ name, showAddNewItemsHandler }: { name: string; showAddNewItemsHandler: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={showAddNewItemsHandler}>
        <ListPlus />
      </Button>
      <DeleteTodoListModal name={name} />
    </div>
  )
}
