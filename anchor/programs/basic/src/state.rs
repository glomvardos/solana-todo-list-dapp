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
    pub id: Option<u32>,
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

    pub fn add_list_items(self: &mut Self, list_items: &Vec<ListItem>) {
        for list_item in list_items.iter() {
            let list_item = ListItem::new(
                self.next_item_id,
                list_item.content.clone(),
                list_item.checked,
            );
            self.list_items.push(list_item);
            self.next_item_id += 1;
        }
    }

    pub fn update_list_items(self: &mut Self, list_items: &Vec<ListItem>) {
        for list_item in list_items.iter() {
            let existing_list_item = self.list_items.iter_mut().find(|li| li.id == list_item.id);
            if let Some(li) = existing_list_item {
                li.content = list_item.content.clone();
                li.checked = list_item.checked;
            }
        }
    }

    pub fn delete_list_items(self: &mut Self, list_items: &Vec<ListItem>) {
        todo!()
    }

    pub fn complete(self: &mut Self) {
        self.completed = self.list_items.iter().all(|li| li.checked);
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
