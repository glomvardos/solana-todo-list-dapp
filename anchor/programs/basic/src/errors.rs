use anchor_lang::prelude::*;

#[error_code]
pub enum TodoListError {
    #[msg("Name should be less than 50 characters long")]
    NameTooLong,
}
