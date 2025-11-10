/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/todo.json`.
 */
export type Todo = {
  "address": "2ePmXY7aBQYpd7fcBpBkUt5k4cjZ8G2Y86MVJk4S5dne",
  "metadata": {
    "name": "todo",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addListItems",
      "discriminator": [
        237,
        135,
        29,
        117,
        29,
        87,
        67,
        149
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "listItems",
          "type": {
            "vec": {
              "defined": {
                "name": "listItem"
              }
            }
          }
        }
      ]
    },
    {
      "name": "createTodoList",
      "discriminator": [
        243,
        146,
        199,
        82,
        117,
        163,
        206,
        135
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteListItems",
      "discriminator": [
        147,
        226,
        65,
        14,
        239,
        244,
        249,
        60
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "listItemsIds",
          "type": {
            "vec": "u32"
          }
        }
      ]
    },
    {
      "name": "updateListItems",
      "discriminator": [
        230,
        234,
        169,
        64,
        150,
        232,
        165,
        117
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "listItems",
          "type": {
            "vec": {
              "defined": {
                "name": "listItem"
              }
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "todoList",
      "discriminator": [
        237,
        16,
        56,
        14,
        45,
        138,
        67,
        245
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooLong",
      "msg": "Name should be less than 30 characters long"
    },
    {
      "code": 6001,
      "name": "contentTooLong",
      "msg": "Content should be less than 200 characters long"
    },
    {
      "code": 6002,
      "name": "maxListItemsReached",
      "msg": "Todo list items should be less than 20"
    },
    {
      "code": 6003,
      "name": "emptyListItems",
      "msg": "List items should not be empty"
    }
  ],
  "types": [
    {
      "name": "listItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "checked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "todoList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "nextItemId",
            "type": "u32"
          },
          {
            "name": "completed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "listItems",
            "type": {
              "vec": {
                "defined": {
                  "name": "listItem"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
