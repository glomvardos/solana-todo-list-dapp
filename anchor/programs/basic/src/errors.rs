use anchor_lang::prelude::*;

#[error_code]
pub enum TodoListError {
    #[msg("Name should be less than 30 characters long")]
    NameTooLong,
    #[msg("Todo list items should be less than 20")]
    MaxListItemsReached,
}
