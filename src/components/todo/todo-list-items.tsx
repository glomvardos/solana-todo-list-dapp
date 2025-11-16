import { ListItem } from '@/lib/types'
import { Checkbox } from '../ui/checkbox'
import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { ListActionButton } from './todo-list'
import { useTodoProgram } from '@/services/use-todo-program'
import { Pencil, Save } from 'lucide-react'

type Props = {
  name: string
  listItems: ListItem[]
}

export function TodoListItems({ name, listItems }: Props) {
  const [storedListItems, setStoredListItems] = useState<ListItem[]>(listItems)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { updateTodoListItems } = useTodoProgram()
  const { mutate, isPending, reset } = updateTodoListItems

  const canSave = useMemo(
    () =>
      listItems.some((item, index) => {
        const storedItem = storedListItems[index]
        return item?.checked !== storedItem?.checked
      }),
    [listItems, storedListItems],
  )

  const onSaveHandler = () => {
    if (isPending || !canSave) return

    mutate(
      { name, listItems: storedListItems },
      {
        onSettled: () => {
          reset()
        },
      },
    )
  }

  const onEditHandler = () => setIsEdit((prev) => !prev)

  const onChangeHandler = (index: number, value: CheckedState) => {
    if (typeof value !== 'boolean') return
    const copiedListItems = [...storedListItems]
    const existingListItem = { ...copiedListItems[index] }

    existingListItem.checked = value
    copiedListItems[index] = existingListItem

    setStoredListItems(copiedListItems)
  }

  useEffect(() => {
    if (listItems) {
      setStoredListItems(listItems)
    }
  }, [listItems])

  return (
    <>
      <div className="flex flex-col gap-4">
        {storedListItems.map((li, index) => (
          <TodoListItem
            key={li.id}
            listItem={li}
            index={index + 1}
            onChangeHandler={(value: CheckedState) => onChangeHandler(index, value)}
          />
        ))}
      </div>
      <ListActionButton
        icon={<Pencil />}
        isActive={isEdit}
        id={`edit-action-${name}`}
        disabled={isPending}
        onClick={onEditHandler}
      />
      <ListActionButton
        icon={<Save />}
        isActive={canSave}
        id={`save-action-${name}`}
        disabled={!canSave}
        onClick={onSaveHandler}
      />
    </>
  )
}

function TodoListItem({
  listItem,
  index,
  onChangeHandler,
}: {
  listItem: ListItem
  index: number
  onChangeHandler: (value: CheckedState) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-accent-foreground">{index}</span>
      <p
        title={listItem.content}
        className={cn('text-accent-foreground line-clamp-3', {
          'line-through': listItem.checked,
        })}
      >
        {listItem.content}
      </p>
      <Checkbox className="ml-auto" checked={listItem.checked} onCheckedChange={onChangeHandler} />
    </div>
  )
}
