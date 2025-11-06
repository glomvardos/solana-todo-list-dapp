use crate::{constants::*, state::*, utils::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(name:String)]
pub struct CreateTodoList<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(init, payer=signer, space=ANCHOR_DISCRIMINATOR_SIZE + TodoList::INIT_SPACE, seeds = [signer.key().as_ref(), name.as_bytes()], bump)]
    pub todo_list: Account<'info, TodoList>,

    pub system_program: Program<'info, System>,
}

pub fn create_todo_list_handler(ctx: Context<CreateTodoList>, name: String) -> Result<()> {
    validate_name(&name)?;

    let created_at = Clock::get()?.unix_timestamp;
    let name_lower_case = name.trim().to_lowercase();

    let todo_list = TodoList::new(name_lower_case, created_at);
    ctx.accounts.todo_list.set_inner(todo_list);

    Ok(())
}
