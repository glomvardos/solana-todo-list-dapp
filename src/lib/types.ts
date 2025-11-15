import BN from 'bn.js'

export type TodoList = {
  name: string
  createdAt: BN
  completed: boolean
  listItems: ListItem[]
}

export type ListItem = {
  id: number | null
  content: string
  checked: boolean
}
