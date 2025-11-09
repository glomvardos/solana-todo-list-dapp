use anchor_lang::prelude::*;

#[error_code]
pub enum TodoListError {
    #[msg("Name should be less than 30 characters long")]
    NameTooLong,
    #[msg("Content should be less than 200 characters long")]
    ContentTooLong,
    #[msg("Todo list items should be less than 20")]
    MaxListItemsReached,
    #[msg("List items should not be empty")]
    EmptyListItems,
}
