use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(name: String)]
pub struct DeleteTodoList<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut, close = signer, seeds=[signer.key().as_ref(), name.as_bytes()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
}

pub fn delete_todo_list_handler() -> Result<()> {
    Ok(())
}
