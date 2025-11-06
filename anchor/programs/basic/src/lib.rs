use anchor_lang::prelude::*;

declare_id!("2ePmXY7aBQYpd7fcBpBkUt5k4cjZ8G2Y86MVJk4S5dne");

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
pub mod utils;

use crate::instructions::*;

#[program]
pub mod todo {
    use super::*;

    pub fn create_todo_list(ctx: Context<CreateTodoList>, name: String) -> Result<()> {
        create_todo_list_handler(ctx, name)
    }
}
