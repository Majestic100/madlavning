import { test } from "node:test";
import assert from "node:assert/strict";
import { formatMinutter, isoVarighed, totalTid, aktivTid, tidsInterval } from "../src/lib/tid.mjs";

test("minutter under en time", () => {
  assert.equal(formatMinutter(50), "50 min");
  assert.equal(formatMinutter(5), "5 min");
});

test("hele timer — ental og flertal", () => {
  assert.equal(formatMinutter(60), "1 time");
  assert.equal(formatMinutter(120), "2 timer");
  assert.equal(formatMinutter(720), "12 timer");
});

test("timer + minutter — Gourministeriet-fejlen må aldrig opstå", () => {
  assert.equal(formatMinutter(90), "1 time 30 min");
  assert.equal(formatMinutter(150), "2 timer 30 min");
  assert.doesNotMatch(formatMinutter(90), /time time|min min|minutter minutter/);
});

test("ISO 8601-varighed til JSON-LD", () => {
  assert.equal(isoVarighed(20), "PT20M");
  assert.equal(isoVarighed(90), "PT1H30M");
  assert.equal(isoVarighed(120), "PT2H");
});

test("totalTime udregnes af delene", () => {
  assert.equal(totalTid({ prepTime: 20, cookTime: 30, waitTime: 0 }), 50);
  assert.equal(totalTid({ prepTime: 30, cookTime: 15, waitTime: 720 }), 765);
});

test("aktiv tid tæller ikke hævetid med", () => {
  assert.equal(aktivTid({ prepTime: 30, cookTime: 15 }), 45);
});

test("tidsintervaller matcher Stinna-navigationen", () => {
  assert.equal(tidsInterval(10).id, "0-15");
  assert.equal(tidsInterval(15).id, "0-15");
  assert.equal(tidsInterval(16).id, "15-30");
  assert.equal(tidsInterval(45).id, "30-45");
  assert.equal(tidsInterval(200).id, "60+");
});
