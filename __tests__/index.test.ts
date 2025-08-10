import { vibeSort } from "../src/index";

describe("vibesort", () => {
  test("should sort a list of numbers in ascending order", async () => {
    const arr = [8, 3, 10, 5, 1, 9, 7, 2, 4, 11];
    const sorted = await vibeSort(arr);
    // Yes, I know. I'm using the built in sort. Very scary
    expect(sorted).toEqual(arr.sort((a, b) => a - b));
  });

  test("should sort a list of numbers in descending order", async () => {
    const arr = [8, 3, 10, 5, 1, 9, 7, 2, 4, 11];
    const sorted = await vibeSort(arr, { sortDirection: "descending" });
    expect(sorted).toEqual(arr.sort((a, b) => b - a));
  });

  test("should sort a list of floats in descending order", async () => {
    const arr = [14.1, 5.2, 2.4, 41.1, 10.6];
    const sorted = await vibeSort(arr, { sortDirection: "descending" });
    expect(sorted).toEqual(arr.sort((a, b) => b - a));
  });

  test("should throw an error of propertyToSort is invalid", async () => {
    const arr = [
      { name: "Bob", age: 25 },
      { name: "David", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ];
    await expect(
      vibeSort(arr, { propertyToSort: "bankBalance" })
    ).rejects.toThrow();
  });

  test("should sort a list of people in ascending order using their name", async () => {
    const arr = [
      { name: "Bob", age: 25 },
      { name: "David", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ];
    const sorted = await vibeSort(arr, {
      sortDirection: "ascending",
      propertyToSort: "name",
    });
    expect(sorted).toEqual(arr.sort((a, b) => a.name.localeCompare(b.name)));
  });

  test("should sort a list of people in descending order using their name", async () => {
    const arr = [
      { name: "Bob", age: 25 },
      { name: "David", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 35 },
    ];
    const sorted = await vibeSort(arr, {
      sortDirection: "descending",
      propertyToSort: "name",
    });
    expect(sorted).toEqual(arr.sort((a, b) => b.name.localeCompare(a.name)));
  });

  test("should sort a list of people in descending order using their bankBalance", async () => {
    const arr = [
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
    ];
    const sorted = await vibeSort(arr, {
      sortDirection: "descending",
      propertyToSort: "bankBalance",
    });
    expect(sorted).toEqual(
      arr.sort((a, b) => b.pii.bankBalance - a.pii.bankBalance)
    );
  });

  test("should pass vibe check", () => {
    expect(true).toBe(true);
  });
});
