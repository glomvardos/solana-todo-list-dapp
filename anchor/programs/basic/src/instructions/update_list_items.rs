use crate::{state::*, utils::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(name:String)]
pub struct UpdateListItems<'info> {
    #[account()]
    pub signer: Signer<'info>,

    #[account(mut, seeds=[signer.key().as_ref(), name.as_bytes()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
}

pub fn update_list_items_handler(
    ctx: Context<UpdateListItems>,
    list_items: Vec<ListItem>,
) -> Result<()> {
    validate_empty_list_items(&list_items)?;
    for list_item in list_items.iter() {
        validate_list_item_content(&list_item.content)?;
    }

    let todo_list = &mut ctx.accounts.todo_list;

    todo_list.update_list_items(&list_items);
    todo_list.complete();

    Ok(())
}
