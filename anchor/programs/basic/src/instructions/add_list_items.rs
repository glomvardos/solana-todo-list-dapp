use anchor_lang::prelude::*;

use crate::{
    state::*,
    utils::{validate_list_item_content, validate_list_items_len},
};

#[derive(Accounts)]
#[instruction(name:String)]
pub struct AddListItems<'info> {
    #[account()]
    pub signer: Signer<'info>,

    #[account(mut, seeds = [signer.key().as_ref(), name.as_bytes()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
}

pub fn add_list_items_handler(ctx: Context<AddListItems>, list_items: Vec<ListItem>) -> Result<()> {
    let todo_list = &mut ctx.accounts.todo_list;

    let total_len = todo_list.list_items.len() + list_items.len();
    validate_list_items_len(total_len)?;

    // Solution 1 with for_each
    // let mut id: u32 = todo_list.next_item_id;
    // list_items.iter().for_each(|item| {
    //     let list_item = ListItem::new(id, item.content.clone(), item.checked);
    //     todo_list.list_items.push(list_item);
    //     id += 1;
    // });
    // todo_list.next_item_id = id;

    // Solution 2 with for loop
    for item in list_items.iter() {
        validate_list_item_content(&item.content)?;
        let list_item = ListItem::new(todo_list.next_item_id, item.content.clone(), item.checked);
        todo_list.list_items.push(list_item);
        todo_list.next_item_id += 1;
    }

    Ok(())
}
