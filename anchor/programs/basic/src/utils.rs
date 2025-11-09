use crate::{constants::*, errors::*, state::ListItem};
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

pub fn validate_list_item_content(content: &String) -> Result<()> {
    require!(
        content.trim().len() <= MAX_LEN_CONTENT,
        TodoListError::ContentTooLong
    );
    Ok(())
}

pub fn validate_empty_list_items(list_items: &Vec<ListItem>) -> Result<()> {
    require!(!list_items.is_empty(), TodoListError::EmptyListItems);
    Ok(())
}
