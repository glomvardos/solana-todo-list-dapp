use crate::{state::*, utils::validate_empty_list_items};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(name:String)]
pub struct DeleteListItems<'info> {
    #[account()]
    pub signer: Signer<'info>,

    #[account(mut, seeds=[signer.key().as_ref(), name.as_bytes()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
}

pub fn delete_list_items_handler(
    ctx: Context<DeleteListItems>,
    list_items_ids: Vec<u32>,
) -> Result<()> {
    validate_empty_list_items(&list_items_ids)?;
    let todo_list = &mut ctx.accounts.todo_list;

    todo_list.delete_list_items(&list_items_ids);
    todo_list.complete();
    Ok(())
}
