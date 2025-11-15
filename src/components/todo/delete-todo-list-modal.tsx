import { Trash } from 'lucide-react'
import { AppModal } from '../app-modal'
import { useState } from 'react'
import { useTodoProgram } from '@/services/use-todo-program'

type Props = {
  name: string
}
export function DeleteTodoListModal({ name }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { deleteTodoList } = useTodoProgram()
  const { mutate, isPending, reset } = deleteTodoList
  const onDeleteHandler = () => {
    mutate(
      { name },
      {
        onSuccess: () => {
          setIsOpen(false)
        },
        onSettled: () => {
          reset()
        },
      },
    )
  }

  return (
    <AppModal
      triggerElement={<Trash />}
      title="Delete Todo List"
      open={isOpen}
      onOpenChange={setIsOpen}
      submit={onDeleteHandler}
      submitLabel="Delete"
      submitDisabled={isPending}
    >
      <p>{`Are you sure you want to delete your ${name} Todo list?`}</p>
    </AppModal>
  )
}
