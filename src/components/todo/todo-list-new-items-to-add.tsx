import { ListItem } from '@/lib/types'
import { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Plus, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useTodoProgram } from '@/services/use-todo-program'

type Props = {
  name: string
  existingListItemsCount: number
  showAddNewItemsHandler: () => void
}

const MIN_LIST_ITEMS_ALLOWED = 1
const MAX_LIST_ITEMS_ALLOWED = 20

export function TodoListNewItemsToAdd({ name, existingListItemsCount, showAddNewItemsHandler }: Props) {
  const [newListItems, setNewListItems] = useState<ListItem[]>([{ id: null, content: '', checked: false }])

  const { addTodoListItems } = useTodoProgram()
  const { mutate, isPending, reset } = addTodoListItems
  console.log(newListItems)

  const totalListItemsCount = existingListItemsCount + newListItems.length

  const hasValidItems = newListItems.some((li) => li.content.trim() !== '')
  const canAdd = totalListItemsCount < MAX_LIST_ITEMS_ALLOWED
  const canRemove = newListItems.length !== MIN_LIST_ITEMS_ALLOWED
  const canSave = hasValidItems && !isPending

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const copiedListItems = [...newListItems]
    const selectedListItemIndex = copiedListItems.findIndex((_, i) => i === index)

    if (selectedListItemIndex !== -1) {
      const selectedListItem = { ...copiedListItems[selectedListItemIndex] }
      selectedListItem.content = e.target.value
      copiedListItems[selectedListItemIndex] = selectedListItem
      setNewListItems(copiedListItems)
    }
  }

  const onAddNewListItem = () => {
    if (isPending || !canAdd) return
    const newListItem: ListItem = {
      id: null,
      content: '',
      checked: false,
    }
    setNewListItems((prev) => [...prev, newListItem])
  }

  const onRemoveNewListItem = (index: number) => {
    if (isPending || !canRemove) return
    setNewListItems((prev) => prev.filter((_, i) => i !== index))
  }

  const onRemoveAllNewListItems = () => {
    if (isPending || !canRemove) return
    setNewListItems([{ id: null, content: '', checked: false }])
  }

  const onSaveNewListItems = () => {
    if (!canSave) return
    mutate(
      { name, listItems: newListItems },
      {
        onSuccess: () => {
          setNewListItems([{ id: null, content: '', checked: false }])
          showAddNewItemsHandler()
        },
        onSettled: () => {
          reset()
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {newListItems.map((li, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-accent-foreground text-xs">{existingListItemsCount + (index + 1)}</span>
          <Input
            disabled={isPending}
            placeholder="Name"
            value={li.content}
            onChange={(e) => onChangeHandler(e, index)}
          />
          {canRemove && (
            <Button disabled={isPending} variant="outline" onClick={() => onRemoveNewListItem(index)}>
              <Trash />
            </Button>
          )}
        </div>
      ))}
      {canAdd && (
        <Button disabled={isPending} variant="outline" className="ml-auto w-max" onClick={onAddNewListItem}>
          <Plus />
        </Button>
      )}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="w-[calc(50%-8px)]"
          disabled={!canRemove || isPending}
          onClick={onRemoveAllNewListItems}
        >
          Remove items
        </Button>
        <Button className="w-[calc(50%-8px)]" disabled={!canSave} onClick={onSaveNewListItems}>
          {isPending ? 'Signing...' : 'Save Items'}
        </Button>
      </div>
    </div>
  )
}
