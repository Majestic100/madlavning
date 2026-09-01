import { test } from "node:test";
import assert from "node:assert/strict";
import { formatAmount, skalerOgFormater } from "../src/lib/maengder.mjs";

test("hele tal vises uden decimaler", () => {
  assert.equal(formatAmount(2, "stk"), "2");
  assert.equal(formatAmount(400, "g"), "400");
  assert.equal(formatAmount(1, "tsk"), "1");
});

test("1,5 stk vises som 1½ (spec §2)", () => {
  assert.equal(formatAmount(1.5, "stk"), "1½");
});

test("brøker gengives som tegn", () => {
  assert.equal(formatAmount(0.5, "tsk"), "½");
  assert.equal(formatAmount(0.25, "dl"), "¼");
  assert.equal(formatAmount(0.75, "spsk"), "¾");
  assert.equal(formatAmount(2.5, "dl"), "2½");
  assert.equal(formatAmount(1 / 3, "tsk"), "⅓");
  assert.equal(formatAmount(2 / 3, "dl"), "⅔");
});

test("gram og ml rundes til hele tal — aldrig ½ g", () => {
  assert.equal(formatAmount(112.5, "g"), "113");
  assert.equal(formatAmount(66.666, "ml"), "67");
  assert.equal(formatAmount(0.4, "g"), "1"); // aldrig 0 g af en ingrediens
});

test("kg og l bruger dansk komma", () => {
  assert.equal(formatAmount(1.5, "kg"), "1,5");
  assert.equal(formatAmount(0.75, "l"), "0,75");
  assert.equal(formatAmount(2, "kg"), "2");
});

test("skæve værdier lyver ikke som brøk", () => {
  assert.equal(formatAmount(0.4, "dl"), "0,4");
  assert.equal(formatAmount(2.9, "stk"), "3");
});

test("skalering: 3 æg til 1½ portion = 4½", () => {
  assert.equal(skalerOgFormater(3, "stk", 1.5), "4½");
});

test("skalering: 250 g halveret = 125 g", () => {
  assert.equal(skalerOgFormater(250, "g", 0.5), "125");
});

test("null-mængder (efter smag) giver tom streng", () => {
  assert.equal(formatAmount(null, null), "");
  assert.equal(skalerOgFormater(null, "g", 2), "");
});
