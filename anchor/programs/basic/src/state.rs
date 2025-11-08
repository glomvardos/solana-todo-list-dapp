use crate::constants::*;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct TodoList {
    #[max_len(MAX_LEN_NAME)]
    pub name: String,
    pub created_at: i64,
    pub next_item_id: u32,
    pub completed: bool,
    pub bump: u8,
    #[max_len(MAX_LEN_LIST_ITEMS)]
    pub list_items: Vec<ListItem>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct ListItem {
    id: Option<u32>,
    #[max_len(MAX_LEN_CONTENT)]
    pub content: String,
    pub checked: bool,
}

impl TodoList {
    pub fn new(name: String, created_at: i64, bump: u8) -> Self {
        Self {
            name,
            created_at,
            next_item_id: 0,
            completed: false,
            bump,
            list_items: vec![],
        }
    }
}

impl ListItem {
    pub fn new(id: u32, content: String, checked: bool) -> Self {
        Self {
            id: Some(id),
            content,
            checked,
        }
    }
}
