const units: [number, string][] = [
  [60, "second"],
  [60, "minute"],
  [24, "hour"],
  [30, "day"],
  [12, "month"],
  [Infinity, "year"],
];

function pluralize(value: number, unit: string): string {
  return `${value} ${unit}${value > 1 ? "s" : ""}`;
}

export function toHumanReadable(input: number | Date): string {
  const now = Date.now();
  const date = input instanceof Date ? input.getTime() : input;
  let delta = Math.floor((now - date) / 1000); // Convert milliseconds to seconds

  if (delta < 0) {
    return "in the future"; // Optional: Handle future dates
  }

  for (const [seconds, name] of units) {
    if (delta < seconds) {
      return pluralize(delta, name) + " ago";
    }
    delta = Math.floor(delta / seconds);
  }

  return "a long time ago";
}

export function toTimestamp(humanReadable: string): number {
  const now = Date.now();
  const regex = /(\d+)\s(\w+)\sago/; // Match strings like "3 minutes ago"
  const match = humanReadable.match(regex);

  if (!match) {
    throw new Error("Invalid human-readable format");
  }

  const [, value, unit] = match;
  const delta = parseInt(value, 10);

  const unitMap: Record<string, number> = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    month: 2592000, // Approximate 30 days
    year: 31536000, // Approximate 12 months
  };

  const multiplier = unitMap[unit.replace(/s$/, "")];
  if (!multiplier) {
    throw new Error("Invalid time unit");
  }

  return now - delta * multiplier * 1000;
}
