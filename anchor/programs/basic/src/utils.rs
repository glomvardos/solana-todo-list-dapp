use crate::{constants::*, errors::*};
use anchor_lang::prelude::*;

pub fn validate_name(name: &String) -> Result<()> {
    require!(
        name.trim().len() <= MAX_LEN_NAME,
        TodoListError::NameTooLong
    );

    Ok(())
}
