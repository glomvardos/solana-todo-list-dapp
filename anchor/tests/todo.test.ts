import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Todo } from '../target/types/todo'

describe('basic', () => {
  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Todo as Program<Todo>

  let name: string
  const signer = program.provider.wallet as anchor.Wallet
  let todoListPda: anchor.web3.PublicKey
  beforeAll(async () => {
    name = 'Test todo list'
    const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
      [signer.publicKey.toBuffer(), Buffer.from(name)],
      program.programId,
    )
    todoListPda = pda
  })

  it('Create todo list', async () => {
    const tx = await program.methods.createTodoList(name).rpc()
    const account = await program.account.todoList.fetch(todoListPda)
    console.log('Account', account)
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=custom&customUrl=http://localhost:8899`)
  })
})
