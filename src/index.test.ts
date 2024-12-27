import { toHumanReadable, toTimestamp } from "./index";
import { expect, test } from 'vitest'

test("toHumanReadable should return correct output", () => {
  const now = Date.now();
  expect(toHumanReadable(now - 3000)).toBe("3 seconds ago");
  expect(toHumanReadable(now - 60000)).toBe("1 minute ago");
  expect(toHumanReadable(now - 3600000)).toBe("1 hour ago");
});

test("toTimestamp should return correct output", () => {
  const now = Date.now();
  expect(Math.abs(toTimestamp("3 seconds ago") - (now - 3000))).toBeLessThan(100);
  expect(Math.abs(toTimestamp("1 minute ago") - (now - 60000))).toBeLessThan(100);
});