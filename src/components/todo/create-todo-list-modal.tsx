import { useState } from 'react'
import { AppModal } from '../app-modal'
import { Input } from '../ui/input'
import { useTodoProgram } from '@/services/use-todo-program'

export function CreateTodoListModal() {
  const [name, setName] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isNameEmpty = name.trim().length === 0
  const { createTodoList } = useTodoProgram()
  const { mutate, isPending } = createTodoList
  const onSaveHandler = () => {
    if (isNameEmpty) return
    mutate(
      { name },
      {
        onSuccess: () => {
          setName('')
          setIsOpen(false)
        },
      },
    )
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onCancelHandler = () => {
    setName('')
  }

  const submitLabel = isPending ? 'Saving...' : 'Save'
  return (
    <AppModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Create"
      submitLabel={submitLabel}
      submit={onSaveHandler}
      cancel={onCancelHandler}
      submitDisabled={isNameEmpty || isPending}
    >
      <Input placeholder="Name" value={name} onChange={onChangeHandler} />
    </AppModal>
  )
}
