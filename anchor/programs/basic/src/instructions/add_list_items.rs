use anchor_lang::prelude::*;

use crate::{state::*, utils::*};

#[derive(Accounts)]
#[instruction(name:String)]
pub struct AddListItems<'info> {
    #[account()]
    pub signer: Signer<'info>,

    #[account(mut, seeds = [signer.key().as_ref(), name.as_bytes()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
}

pub fn add_list_items_handler(ctx: Context<AddListItems>, list_items: Vec<ListItem>) -> Result<()> {
    validate_empty_list_items(&list_items)?;
    let todo_list = &mut ctx.accounts.todo_list;

    let total_len = todo_list.list_items.len() + list_items.len();
    validate_list_items_len(total_len)?;

    for list_item in list_items.iter() {
        validate_list_item_content(&list_item.content)?;
    }

    todo_list.add_list_items(&list_items);
    todo_list.complete();

    Ok(())
}
