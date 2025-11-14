use anchor_lang::prelude::*;

declare_id!("2ePmXY7aBQYpd7fcBpBkUt5k4cjZ8G2Y86MVJk4S5dne");

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
pub mod utils;

use crate::{instructions::*, state::*};

#[program]
pub mod todo {

    use super::*;
    pub fn create_todo_list(ctx: Context<CreateTodoList>, name: String) -> Result<()> {
        create_todo_list_handler(ctx, name)
    }

    pub fn add_list_items(
        ctx: Context<AddListItems>,
        _name: String,
        list_items: Vec<ListItem>,
    ) -> Result<()> {
        add_list_items_handler(ctx, list_items)
    }

    pub fn update_list_items(
        ctx: Context<UpdateListItems>,
        _name: String,
        list_items: Vec<ListItem>,
    ) -> Result<()> {
        update_list_items_handler(ctx, list_items)
    }

    pub fn delete_list_items(
        ctx: Context<DeleteListItems>,
        _name: String,
        list_items_ids: Vec<u32>,
    ) -> Result<()> {
        delete_list_items_handler(ctx, list_items_ids)
    }

    pub fn delete_todo_list(_ctx: Context<DeleteTodoList>, _name: String) -> Result<()> {
        delete_todo_list_handler()
    }
}
