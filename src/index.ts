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

export type HumanizerOptions = {
  threshold?: number; // Minimum duration in milliseconds to round off
  locale?: string; // Language for the output (default: 'en')
  format?: "long" | "short"; // Output style (default: 'long')
};

const locales: Record<
  string,
  Record<"past" | "future", (value: number, unit: string) => string>
> = {
  en: {
    past: (value, unit) => `${value} ${unit}${value > 1 ? "s" : ""} ago`,
    future: (value, unit) => `in ${value} ${unit}${value > 1 ? "s" : ""}`,
  },
  es: {
    past: (value, unit) => `hace ${value} ${unit}${value > 1 ? "s" : ""}`,
    future: (value, unit) => `en ${value} ${unit}${value > 1 ? "s" : ""}`,
  },
  fr: {
    past: (value, unit) => `il y a ${value} ${unit}${value > 1 ? "s" : ""}`,
    future: (value, unit) => `dans ${value} ${unit}${value > 1 ? "s" : ""}`,
  },
  // Add more locales here
};

const defaultUnits = [
  { unit: "year", ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: "month", ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: "week", ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: "day", ms: 24 * 60 * 60 * 1000 },
  { unit: "hour", ms: 60 * 60 * 1000 },
  { unit: "minute", ms: 60 * 1000 },
  { unit: "second", ms: 1000 },
];

export function humanizeDuration(
  duration: number,
  options: HumanizerOptions = {},
): string {
  const { threshold = 1, locale = "en", format = "long" } = options;

  const absDuration = Math.abs(duration);
  const isPast = duration < 0;

  for (const { unit, ms } of defaultUnits) {
    const value = Math.floor(absDuration / ms);
    if (value >= threshold) {
      const localized = locales[locale] ?? locales["en"];
      return isPast
        ? localized.past(value, unit)
        : localized.future(value, unit);
    }
  }

  // Default to 'now' for small durations
  return isPast ? "just now" : "soon";
}
