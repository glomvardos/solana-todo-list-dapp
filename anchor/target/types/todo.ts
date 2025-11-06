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
      "msg": "Name should be less than 50 characters long"
    }
  ],
  "types": [
    {
      "name": "listItem",
      "type": {
        "kind": "struct",
        "fields": [
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
