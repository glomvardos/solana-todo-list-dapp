use crate::{constants::*, errors::*};
use anchor_lang::prelude::*;

pub fn validate_name(name: &String) -> Result<()> {
    require!(
        name.trim().len() <= MAX_LEN_NAME,
        TodoListError::NameTooLong
    );
    Ok(())
}

pub fn validate_list_items_len(total_len: usize) -> Result<()> {
    require!(
        total_len <= MAX_LEN_LIST_ITEMS,
        TodoListError::MaxListItemsReached
    );
    Ok(())
}
