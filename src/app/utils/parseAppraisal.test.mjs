// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseAppraisal } from "./parseAppraisal.mjs";

const qty = (text) => Object.fromEntries(parseAppraisal(text).map((i) => [i.name, i.quantity]));

test("thousands separators from every client language", () => {
  assert.deepEqual(qty("Tritanium 32,000\nPyerite 6.000\nMexallon 2 500\nIsogen 1 200\nNocxium 3 000"), {
    Tritanium: 32000, Pyerite: 6000, Mexallon: 2500, Isogen: 1200, Nocxium: 3000,
  });
});

test("EVE inventory copy (tab separated, extra columns)", () => {
  assert.deepEqual(qty("Tritanium\t32 000\tMineral\t\t\t320 m3\nLarge Skill Injector\t\tSkill Injector"), {
    Tritanium: 32000, "Large Skill Injector": 1,
  });
});

test("numbers inside item names are not quantities", () => {
  assert.deepEqual(qty("Republic Fleet 200mm AutoCannon 5\n125mm Gatling AutoCannon II 2\nIsogen"), {
    "Republic Fleet 200mm AutoCannon": 5, "125mm Gatling AutoCannon II": 2, Isogen: 1,
  });
});

test("duplicates are merged, first spelling kept", () => {
  assert.deepEqual(parseAppraisal("Tritanium 1000\n\n  tritanium 500  \nTritanium\t1,000"), [
    { name: "Tritanium", quantity: 2500 },
  ]);
});
