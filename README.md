# Vibe Sort [![github](https://img.shields.io/badge/GitHub-repository-blue)](https://github.com/amalej/vibe-sort-util) [![npm](https://img.shields.io/npm/v/vibe-sort-util)](https://www.npmjs.com/package/vibe-sort-util) [![npm](https://img.shields.io/npm/dt/vibe-sort-util)](https://www.npmjs.com/package/vibe-sort-util?activeTab=versions)

## Description

A library that sorts in O(n^(vibes)) time complexity.

## How to use

### Simple numbers

```js
import { vibeSort } from "vibe-sort-util";

async function main() {
  process.env.GEMINI_API_KEY = "REDACTED_API_KEY";
  const numList = [2, 3, 5, 7, 1, 2, 12, 27, 11, 13];
  const sorted = await vibeSort(numList);
  console.log(sorted);
}

main();
```

output

```json
[1, 2, 2, 3, 5, 7, 11, 12, 13, 27]
```

### Complex objects

```js
import { vibeSort } from "vibe-sort-util";

async function main() {
  process.env.GEMINI_API_KEY = "REDACTED_API_KEY";
  const userList = [
    {
      name: "Bob",
      pii: {
        age: 20,
        bankBalance: 100,
      },
    },
    {
      name: "Emma",
      pii: {
        age: 27,
        bankBalance: -13,
      },
    },
    {
      name: "Alice",
      pii: {
        age: 30,
        bankBalance: 225,
      },
    },
    {
      name: "Charlie",
      pii: {
        age: 35,
        bankBalance: 175,
      },
    },
    {
      name: "David",
      pii: {
        age: 45,
        bankBalance: 450,
      },
    },
    {
      name: "Eve",
      pii: {
        age: 22,
        bankBalance: 75,
      },
    },
    {
      name: "Frank",
      pii: {
        age: 55,
        bankBalance: 600,
      },
    },
  ];
  const sorted = await vibeSort(userList, {
    propertyToSort: "bankBalance",
    sortDirection: "descending",
  });
  console.log(sorted);
}

main();
```

output

```json
[
  { "name": "Frank", "pii": { "age": 55, "bankBalance": 600 } },
  { "name": "David", "pii": { "age": 45, "bankBalance": 450 } },
  { "name": "Alice", "pii": { "age": 30, "bankBalance": 225 } },
  { "name": "Charlie", "pii": { "age": 35, "bankBalance": 175 } },
  { "name": "Bob", "pii": { "age": 20, "bankBalance": 100 } },
  { "name": "Eve", "pii": { "age": 22, "bankBalance": 75 } },
  { "name": "Emma", "pii": { "age": 27, "bankBalance": -13 } }
]
```
